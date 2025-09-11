<script setup lang="ts">
// import { InputText } from 'primevue';
import { zodResolver } from '@primevue/forms/resolvers/zod';
import { z } from 'zod';

const initialValues = ref({
  fullname:'',
  email:''
})

const resolver = ref(zodResolver(
  z.object({
    fullname: z.string().min(1, {message:"Full name is required!"})
    .min(3, {message:"Enter more than 3 chars."})
    .max(256, {message:"Enter less than 256 chars."}),
    email: z.string().min(1, {message:"Full name is required!"})
    .email({message:"You must enter correct email."})

  })
))

const submitBasicInfo = ({ valid }) => {
  if(valid) {
    console.log(valid);
    
  }
}
</script>

<template>
  <div class="flex justify-center">
    <Form v-slot="$form" :resolver="resolver" 
    :initialValues="initialValues"
    @submit="submitBasicInfo"
    class="flex flex-col gap-4 w-full sm:w56">
      <div class="flex flex-col gap-1">
        <InputText name="fullname" type="text" placeholder="Full name" fluid />
        <Message v-if="$form.fullname?.invalid" severity="error" 
        size="small" variant="simple">{{ $form.fullname.error?.message }}</Message>
      </div>
      <div class="flex flex-col gap-4 w-full sm:w56">
          <InputText name="email" type="email" placeholder="Email" fluid />
          <Message v-if="$form.email?.invalid" severity="error"
          size="small" variant="simple">{{ $form.email.error?.message }}</Message>
      </div>
      <Button type="submit" severity="secondary" label="Submit" />
    </Form>

  </div>
</template>

<style scoped></style>
