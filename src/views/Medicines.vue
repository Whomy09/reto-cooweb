<script lang="ts" setup>

import CustomTable from '@/components/shared/CustomTable.vue';
import MedicineModal from '@/components/medicines/MedicineModal.vue';
import { ref } from 'vue';

let isModalOpen = ref(false)

</script>

<template>
  <div class="columns is-multiline">
    
    <div class="column is-12 has-text-right">
      <button class="button is-primary" @click="isModalOpen = true">
        <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Agregar
      </button>
    </div>
    
    <div class="column is-12">
      <CustomTable :cols="[]" :rows="[]" />
    </div>

    <MedicineModal :is-open="isModalOpen" @hide="() => isModalOpen = false"/>    
  </div>
</template>

