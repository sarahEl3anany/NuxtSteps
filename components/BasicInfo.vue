<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';
import InputPhone from '~/components/InputPhone.vue';

const initialValues = ref({
  fullname: '',
  email: '',
  phone: '',
  selectedCountry: {
    name: '',
    phone: '',
    placeholder: '',
    flag: ''
  },
})
// selectedCountry?: any; 
const countries = ref<any[]>([]);
async function getCountries(): Promise<any> {
  let countries = []
  const res = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,idd`);
  const data = await res.json();
  for (let i of data) {
    let temp = { name: "", phone: "", placeholder: "", flag: "" }
    temp.name = i.name.common
    temp.phone = i.idd.root + i.idd.suffixes[0]
    temp.placeholder = temp.phone
    temp.flag = i.flags.svg
    countries.push(temp)
  }
  return countries
}
onMounted(async () => {
  countries.value = await getCountries()
})
// countries.value = data.sort((a: any, b: any) => a.name.common.localeCompare(b.name.common));
const resolver = ref(zodResolver(
  z.object({
    fullname: z.string().min(1, { message: "Full name is required!" })
      .min(3, { message: "Enter more than 3 chars." })
      .max(256, { message: "Enter less than 256 chars." }),
    email: z.string().min(1, { message: "Email is required!" })
      .email({ message: "You must enter correct email." }),
    phone: z.string().min(1, { message: "Phone is required!" })
      .min(9, { message: "Phone length must be more than 9 chars." })
      .max(15, { message: "Phone length must be less than 15" }),
    selectedCountry: z.object({
      name: z.string(),
      phone: z.string(),
      placeholder: z.string(),
      flag: z.string()
    }, { message: "Country is required" })

  })
))

const submitBasicInfo = ({ valid, values }) => {
  debugger
  if (valid) {
    console.log(valid);
  }
}
</script>

<template>
  <div class="flex justify-center">
    <Form v-slot="$form" :resolver="resolver" :initialValues="initialValues" @submit="submitBasicInfo"
      class="flex flex-col gap-4 w-full">
      <div class="flex flex-col gap-1">
        <InputText name="fullname" type="text" placeholder="Full name" fluid />
        <Message v-if="$form.fullname?.invalid" severity="error" size="small" variant="simple">{{
          $form.fullname.error?.message }}</Message>
      </div>
      <div class="flex flex-col gap-4 w-full">
        <InputText name="email" type="email" placeholder="Email" fluid />
        <Message v-if="$form.email?.invalid" severity="error" size="small" variant="simple">{{
          $form.email.error?.message }}</Message>
      </div>
      <div class="flex flex-col gap-4 w-full">
        <div class="p-inputgroup">
          <Select name="selectedCountry" :options="countries" optionLabel="name" filter placeholder="Select country"
            class="border-right-none">
            <template #value="slotProps">
              <div v-if="slotProps.value" class="flex items-center">
                <img :src="slotProps.value.flag" class="w-5 h-4 mr-2" />
                <span>{{ slotProps.value.name }}</span>
                <span class="ml-2 text-500">({{ slotProps.value.phone }})</span>
              </div>
              <span v-else class="text-400">Select a country</span>
            </template>
            <template #option="slotProps">
              <div class="country-item flex items-center">
                <img
                  :src="slotProps.option.flag"
                  class="w-5 h-4 mr-2"
                  alt="flag"
                />
                <span>{{ slotProps.option.name }}</span>
                <span class="ml-2 text-500">({{ slotProps.option.phone }})</span>
              </div>
            </template>
          </Select>

          <InputText name="phone" style="width: 10rem" type="text" />
        </div>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<style scoped></style>
