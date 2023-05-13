<script lang="ts" setup>
import type Medicine from '@/interfaces/Medicine'
import CustomTable from '@/components/shared/CustomTable.vue'
import MedicineModal from '@/components/medicines/MedicineModal.vue'
import headerTableMedicines from '@/helpers/headerTableMedicines'
import MedicineModalEdit from '../components/medicines/MedicineModalEdit.vue'
import { useFirestore } from '../composables/useFirestore'
import { ref } from 'vue'

const { addDocument, getCollection, deleteDocument, getIdDocument, getData, updateData } =
  useFirestore()
const colums = headerTableMedicines()
const nameDelete = ref<string>('')
const idEdit = ref('')
const dataEdit = ref<Medicine[]>([])

let state = ref(false)
let isModalEdit = ref(false)
let isModalOpen = ref(false)
let errorDelate = ref(false)
const rows = ref<Medicine[]>([])

const getRecords = async () => {
  const response: Medicine[] = await getCollection('medicines')
  rows.value = response
}

// Con los objetos de medicines se usa el nombre de la medicina para eliminar
const eliminar = async () => {
  if (nameDelete.value) {
    const response = await deleteDocument('medicines', 'Medicine', nameDelete.value)
    getRecords()
    nameDelete.value = ''
  } else {
    errorDelate.value = true
    setTimeout(() => {
      errorDelate.value = false
    }, 2000)
  }
}

const editarOpen = async () => {
  idEdit.value = await getIdDocument('medicines', 'Medicine', nameDelete.value)
  const editInfo = await getData('medicines', 'Medicine', nameDelete.value)
  dataEdit.value.push(editInfo)
  isModalEdit.value = true
  state.value = true
}

const closeEdit = () => {
  isModalEdit.value = false
  state.value = false
}

// Con los objetos de medicines se usa el nombre de la medicina para actualizar
const handleUpdate = async (document: string, id: string) => {
  const response = await updateData('medicines', 'Medicine', id, JSON.parse(document) as Medicine )
  nameDelete.value = ''
  getRecords()
}

const handleSubmit = async (document: string) => {
  const response = await addDocument('medicines', JSON.parse(document) as Medicine)
  getRecords()
}

getRecords()
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-12 has-text-right">
      <div class="is-flex is-justify-content-flex-end is-align-items-center">
        <div class="control mr-4" v-if="errorDelate">
          <span class="has-text-danger">{{ 'Debes de colocar un nombre' }}</span>
        </div>
        <div class="control">
          <input
            class="input is-one-third"
            type="text"
            placeholder="Name delete"
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

    <MedicineModal
      :is-open="isModalOpen"
      @hide="() => (isModalOpen = false)"
      @save="handleSubmit"
    />
    <MedicineModalEdit :is-open="isModalEdit" :id="idEdit" :data="dataEdit" :state="state" @close="closeEdit" @update="handleUpdate"/>
  </div>
</template>

<style scope>
.input-dele {
  width: 100px;
}
</style>
