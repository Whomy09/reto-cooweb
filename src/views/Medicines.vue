<script lang="ts" setup>
import { useFirestore } from '../composables/useFirestore'
import CustomTable from '@/components/shared/CustomTable.vue'
import MedicineModal from '@/components/medicines/MedicineModal.vue'
import type BaseColumn from '@/interfaces/BaseColumn'
import type Medicine from '@/interfaces/Medicine'
import { ref } from 'vue'

const { addDocument, getCollection, deleteDocument } = useFirestore()

const colums = ref<BaseColumn[]>([
  {
    field: 'name',
    label: 'Nombre'
  },
  {
    field: 'qty',
    label: 'Cantidad'
  },
  {
    field: 'provider',
    label: 'Provedor'
  },
  {
    field: 'doctorSignature',
    label: 'Firma'
  },
  {
    field: 'description',
    label: 'Descripcion'
  }
])

let isModalOpen = ref(false)
const nameDelete = ref<string>('')
let errorDelate = ref(false)

const rows = ref<Medicine[]>([])

const getRecords = async () => {
  const response: Medicine[] = await getCollection('medicines')
  rows.value = response
}

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
          <span class="has-text-danger">{{ "Debes de colocar un nombre" }}</span>
        </div>
        <div class="control">
          <input
            class="input is-one-third"
            type="text"
            placeholder="Name delete"
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

    <MedicineModal
      :is-open="isModalOpen"
      @hide="() => (isModalOpen = false)"
      @save="handleSubmit"
    />
  </div>
</template>

<style scope>
.input-dele {
  width: 100px;
}
</style>
