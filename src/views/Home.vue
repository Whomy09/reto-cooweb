<script setup lang="ts">
import { useFirestore } from '@/composables/useFirestore'
import { ref } from 'vue'
import CustomTable from '@/components/shared/CustomTable.vue'
import MedicalOrderModal from '@/components/medical-orders/MedicalOrderModal.vue'
import type MedicalOrderSimple from '../interfaces/MedicalOrderSimple'
import headerTableOrders from '@/helpers/headerTableOrders'
import type MedicalOrder from '@/interfaces/MedicalOrder'
import type Medicine from '../interfaces/Medicine'
import MedicalOrderModalEdit from '@/components/medical-orders/MedicalOrderModalEdit.vue'

const { getCollection, addDocument, deleteDocument, getData, getIdDocument, updateData } = useFirestore()
const colums = headerTableOrders()
const nameDelete = ref<string>('')
const rows = ref<MedicalOrderSimple[]>([])
const medicines = ref<Medicine[]>([])
const range = ref({
  start: null,
  end: null
})
const isModalOpen = ref(false)
let errorDelate = ref(false)
const idEdit = ref('')
const dataEdit = ref<MedicalOrder[]>([])
let state = ref(false)
let isModalEdit = ref(false)

const getRecords = async () => {
  const response: MedicalOrder[] = await getCollection('Medical-Orders')
  let newInfo = ref<MedicalOrderSimple[]>([])
  response.forEach((e) => {
    newInfo.value.push({
      name: e.name,
      lastName: e.lastName,
      idNumber: e.idNumber,
      eps: e.eps,
      medicines: e.medicines.join('-').toUpperCase(),
      doctorSignature: e.doctorSignature,
      comentarios: e.comentarios
    })
  })
  rows.value = newInfo.value
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

const handleUpdate = async (document: string, id: string) => {
  const response = await updateData('Medical-Orders', 'MedicalOrders', id, JSON.parse(document) as Medicine )
  nameDelete.value = ''
  state.value = false
  dataEdit.value = []
  getRecords()
}

const handleSubmit = async (document: string) => {
  const response = await addDocument('Medical-Orders', JSON.parse(document) as MedicalOrder)
  getRecords()
}

const editarOpen = async () => {
  idEdit.value = await getIdDocument('Medical-Orders', 'MedicalOrders', nameDelete.value)
  const editInfo = await getData('Medical-Orders', 'MedicalOrders', nameDelete.value)
  dataEdit.value.push(editInfo)
  isModalEdit.value = true
  state.value = true
}

const closeEdit = () => {
  isModalEdit.value = false
  state.value = false
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
        <button class="button is-warning mr-4 ml-4" @click="editarOpen">
          <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Editar
        </button>
        <button class="button is-danger mr-4" @click="eliminar">
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

    <MedicalOrderModal
      :medicines="medicines"
      :is-open="isModalOpen"
      @hide="isModalOpen = false"
      @save="handleSubmit"
    />
    <MedicalOrderModalEdit :medicines="medicines" :is-open="isModalEdit" :id="idEdit" :data="dataEdit" :state="state" @update="handleUpdate" @close="closeEdit" @state-of="state = false"/>
  </div>
</template>

<style scoped></style>
