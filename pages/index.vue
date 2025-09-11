<script setup lang="ts">
import BasicInfo from '~/components/BasicInfo.vue';
import AddressInfo from '~/components/AddressInfo.vue';
import DisplayInfo from '~/components/DisplayInfo.vue';
</script>

<template>
  <div class="card flex justify-center">
    <Stepper value="1" class="basis-[50rem]">
      <StepList>
        <Step value="1">Basic Information</Step>
        <Step value="2">Address Information</Step>
        <Step value="3">Display Information</Step>
      </StepList>
      <StepPanels>
        <StepPanel v-slot="{ activateCallback }" value="1">
          <div class="flex flex-col h-48">
            <div
              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
              <BasicInfo />
            </div>
          </div>
          <div class="flex pt-6 justify-end">
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('2')" />
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="2">
          <div class="flex flex-col h-48">
            <div
              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
              <AddressInfo />            
            </div>
          </div>
          <div class="flex pt-6 justify-between">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('1')" />
            <Button label="Next" icon="pi pi-arrow-right" iconPos="right" @click="activateCallback('3')" />
          </div>
        </StepPanel>
        <StepPanel v-slot="{ activateCallback }" value="3">
          <div class="flex flex-col h-48">
            <div
              class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium">
              <DisplayInfo />
            </div>
          </div>
          <div class="pt-6">
            <Button label="Back" severity="secondary" icon="pi pi-arrow-left" @click="activateCallback('2')" />
          </div>
        </StepPanel>
      </StepPanels>
    </Stepper>
  </div>
</template>

<style scoped></style>
