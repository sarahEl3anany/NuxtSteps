<script setup lang="ts">
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

const initialValues = ref({
  fullname: '',
  email: '',
  phone: '',
  // selectedCountry: ""

})
// const countries = ref<any[]>([]);
// const res = await fetch(`https://restcountries.com/v3.1/all?fields=name,flags,idd`);
// const data = await res.json();
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

  })
))

const submitBasicInfo = ({ valid, values }) => {
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
      <div class="flex flex-row gap-2 items-center">
        <!-- <Select
        v-model="initialValues.country"
          name="country"
          :options="countries"
          optionLabel="name.common"
          placeholder="Country"
          filter
          filterBy="name.common,idd.root,idd.suffixes[0]"
          filterPlaceholder="Search country..."
          class="w-1/3"
        >
          <template #option="slotProps">
            <div class="flex items-center gap-2">
              <img :src="slotProps.option.flags.svg" class="w-5 h-4" />
              <span>{{ slotProps.option.name.common }} ( {{ slotProps.option.idd.root }}{{ slotProps.option.idd.suffixes[0] }})</span>
            </div>
          </template>
          <template #value="slotProps">
            <div v-if="slotProps.value" class="flex items-center gap-2">
              <img :src="slotProps.value.flags.svg" class="w-5 h-4" />
              <span>{{ slotProps.value.name.common }} ( {{ slotProps.value.idd.root }}{{ slotProps.value.idd.suffixes[0] }})</span>
            </div>
            <span v-else>Code</span>
          </template>
        </Select> -->

        <InputMask
          name="phone"
          placeholder="Phone"
          mask="(9999) 999-9999"
          class="flex-1"
        />
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>
  </div>
</template>

<style scoped></style>
