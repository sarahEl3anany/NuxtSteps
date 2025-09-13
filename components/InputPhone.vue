<template>
  <div class="p-inputgroup">
    <Select
      v-model="selectedCountry"
      :options="model"
      optionLabel="name"
      filter
      style="min-width: 10rem"
      class="border-right-none"
      @change="onChange"
    >
      <template #value="slotProps">
        <div v-if="slotProps.value" class="country-item">
          <img
            :src="slotProps.value.flag"
            class="w-5 h-4 mr-2"
            alt="flag"
          />
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
    <InputText
      v-model="inputValue.placeholder"
      style="width: 15rem"
      
      type="text"
    />
  </div>
</template>

<script>
export default {
  props: {
    model: null,
  },
  data() {
    return {
      selectedCountry: this.model[0],
      inputValue: [{name:"",phone:"",placeholder:"",flag:""}],
    };
  },
  methods: {
    onChange() {
      this.inputValue = this.selectedCountry;
    },
  },
};
</script>
<style scoped>
.country-item {
  display: flex;
  align-items: center;
}
</style>