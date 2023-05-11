<script setup lang="ts">
import CustomTable from '@/components/shared/CustomTable.vue'
import MedicalOrderModal from '@/components/medical-orders/MedicalOrderModal.vue'
import { useFirestore } from '@/composables/useFirestore'

import { ref } from 'vue'
import type BaseColumn from '@/interfaces/BaseColumn'
import type MedicalOrder from '@/interfaces/MedicalOrder'

const { getCollection, addDocument } = useFirestore()

const isModalOpen = ref(false)

const range = ref({
  start: null,
  end: null
})

const colums = ref<BaseColumn[]>([
  {
    field: 'name',
    label: 'Name'
  },
  {
    field: 'lastname',
    label: 'LastName'
  },
  {
    field: 'idNumber',
    label: 'Identification'
  },
  {
    field: 'eps',
    label: 'EPS'
  },
  {
    field: 'comments',
    label: 'comment'
  },
  {
    field: 'doctorSignature',
    label: 'doctorSignature'
  },
  {
    field: 'medicines',
    label: 'Medicamentes'
  },
  
])

const rows = ref<MedicalOrder[]>([])

const getRecords = async () => {
  const response: MedicalOrder[] = await getCollection('Medical-Orders')
  rows.value = response;
}

const handleSubmit = async (document: string) => {
  const response = await addDocument('Medical-Orders', JSON.parse(document) as MedicalOrder);
  getRecords();
}
getRecords()
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
      <CustomTable :cols="colums" :rows="rows" />
    </div>

    <MedicalOrderModal :is-open="isModalOpen" @hide="isModalOpen = false" @save="handleSubmit" />
  </div>
</template>

<style scoped></style>
