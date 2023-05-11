<script lang="ts">
import { defineComponent, computed, ref} from 'vue'
import validationMedicineForm from '../../helpers/validationMedicineForm'

export default defineComponent({
  name: 'MedicineModal',
  props: {
    isOpen: { type: Boolean, required: true }
  },
  emits: ['hide', 'save'],
  setup(props, { emit }) {

    let isLoading = ref(false)
    let error = ref(false);

    const formData = ref({
      name: '',
      description: '',
      qty: 0,
      provider: '',
      doctorSignature: '',
      createdAt: ''
    })

    const isModalOpen = computed(() => props.isOpen)

    const handleSubmit = () => {
      const result = validationMedicineForm(formData.value);
      if (result) {
        formData.value.createdAt = new Date().toISOString();
        emit('save', JSON.stringify(formData.value))
        emit('hide')
        formData.value.name = '';
        formData.value.description = '';
        formData.value.qty = 0;
        formData.value.doctorSignature = '';
        formData.value.provider = '';
      } else {
        error.value = true;
        setTimeout(() => {
          error.value = false;
        }, 2000);
      }
    }

    return { emit, isLoading, isModalOpen, handleSubmit, formData, error }
  }
})
</script>

<template>
  <div v-show="isModalOpen" class="custom-modal-overlay">
    <div class="custom-modal">
      <div class="columns is-multiline px-5">
        <div class="column is-12">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Nombre</label>
            <div class="control">
              <input v-model="formData.name" class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="column is-12">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Descripción</label>
            <div class="control">
              <textarea v-model="formData.description" class="textarea" />
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Cantidad</label>
            <div class="control">
              <input v-model="formData.qty" class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="column is-6">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Proveedor</label>
            <div class="control">
              <input v-model="formData.provider" class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="column is-12">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Firma del encargado</label>
            <div class="control">
              <input v-model="formData.doctorSignature" class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="column is-12 mt-3">
          <button
            class="button is-info is-fullwidth"
            :class="{ 'is-loading': isLoading }"
            @click="handleSubmit"
          >
            Guardar
          </button>
          <div class="notification is-danger mt-4" v-if="error">
            {{ "Todos los campos deben de estar llenos" }}
          </div>
        </div>
      </div>
    </div>
    <div class="close" @click="() => emit('hide')">
      <i class="fa fa-times"></i>
    </div>
  </div>
</template>

<style scoped>
.custom-modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #000000da;
  z-index: 9999;
}

.custom-modal {
  background-color: white;
  height: 650px;
  width: 700px;
  margin-top: 10%;
  padding: 40px 0;
  border-radius: 10px;
}
.close {
  margin: 10.5% 0 0 -25px;
  cursor: pointer;
}
</style>
