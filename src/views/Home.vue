<script setup lang="ts">
import { useFirestore } from '@/composables/useFirestore'
import { ref } from 'vue'
import CustomTable from '@/components/shared/CustomTable.vue'
import MedicalOrderModal from '@/components/medical-orders/MedicalOrderModal.vue'
import headerTableOrders from '@/helpers/headerTableOrders'
import type MedicalOrder from '@/interfaces/MedicalOrder'
import type Medicine from '../interfaces/Medicine'

const { getCollection, addDocument, deleteDocument } = useFirestore()
const colums = headerTableOrders();
const nameDelete = ref<string>('')
const rows = ref<MedicalOrder[]>([])
const medicines = ref<Medicine[]>([])
const range = ref({
  start: null,
  end: null
})
const isModalOpen = ref(false)
let errorDelate = ref(false)


const getRecords = async () => {
  const response: MedicalOrder[] = await getCollection('Medical-Orders')
  rows.value = response
}

const getRecordsMedines = async () => {
  const response: Medicine[] = await getCollection('medicines')
  medicines.value = response
}

const eliminar = async () => {
  if (nameDelete.value) {
    const response = await deleteDocument('Medical-Orders', 'MedicalOrders', nameDelete.value)
    getRecords()
    nameDelete.value = ''
  } else {
    errorDelate.value = true
    setTimeout(() => {
      errorDelate.value = false
    }, 2000)
  }
}

const handleSubmit = async (document: string) => {
  const response = await addDocument('Medical-Orders', JSON.parse(document) as MedicalOrder)
  getRecords()
}

getRecords()
getRecordsMedines()
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
      <div class="is-flex is-justify-content-flex-end is-align-items-center">
        <div class="control mr-4" v-if="errorDelate">
          <span class="has-text-danger">{{ 'Debes de colocar un nombre' }}</span>
        </div>
        <div class="control">
          <input
            class="input is-one-third"
            type="text"
            placeholder="Identification delete"
            v-model="nameDelete"
          />
        </div>
        <button class="button is-danger mr-4 ml-4" @click="eliminar">
          <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Eliminar
        </button>
        <button class="button is-primary" @click="isModalOpen = true">
          <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Agregar
        </button>
      </div>
    </div>

    <div class="column is-12">
      <CustomTable :cols="colums" :rows="rows" />
    </div>

    <MedicalOrderModal :medicines="medicines" :is-open="isModalOpen" @hide="isModalOpen = false" @save="handleSubmit" />
  </div>
</template>

<style scoped></style>
