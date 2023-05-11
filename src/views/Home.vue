<script setup lang="ts">

import CustomTable from '@/components/shared/CustomTable.vue'
import MedicalOrderModal from '@/components/medical-orders/MedicalOrderModal.vue';

import { ref } from 'vue'

const isModalOpen = ref(false)

const range = ref({
  start: null,
  end: null
});

</script>

<template>
  <div class="columns is-multiline">
    <!-- Buttons -->
    <div class="column is-5">
      <VDatePicker v-model="range" is-range :masks="{ input: 'DD/MM/YYYY' }">
        <template #default="{ inputValue, inputEvents }">
          <div class="field has-addons">
            <div class="control">
              <input class="input" :value="inputValue.start" v-on="inputEvents.start" />
            </div>
            <div class="control">
              <button class="button is-primary">
                <span class="icon"> <i class="fa fa-arrow-right"></i> </span>
              </button>
            </div>
            <div class="control">
              <input class="input" :value="inputValue.end" v-on="inputEvents.end" />
            </div>
            <div class="control">
              <button class="button is-primary">
                <span class="icon mr-2"> <i class="fa fa-search"></i> </span> Consultar
              </button>
            </div>
          </div>
        </template>
      </VDatePicker>
    </div>
    <div class="column is-7 has-text-right">
      <button class="button is-primary" @click="isModalOpen = true">
        <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Agregar
      </button>
    </div>

    <div class="column is-12">
      <CustomTable :cols="[]" :rows="[]" />
    </div>

    <MedicalOrderModal :is-open="isModalOpen" @hide="isModalOpen = false"/>
  </div>
</template>

<style scoped>

</style>
