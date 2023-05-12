<template>
  <div v-show="isModalOpen" class="custom-modal-overlay">
    <div class="custom-modal">
      <div class="columns is-multiline px-5">
        <div class="column is-12 mt-5">
          <h3 class="title is-size-5 is-bordered">Información del paciente</h3>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Nombres del paciente</label>
            <div class="control">
              <input class="input" type="text" v-model="order.name" />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Apellidos del paciente</label>
            <div class="control">
              <input class="input" type="text" v-model="order.lastName" />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Cedula</label>
            <div class="control">
              <input class="input" type="text" v-model="order.idNumber" />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">EPS</label>
            <div class="control has-icons-left">
              <div class="select is-fullwidth">
                <select v-model="order.eps">
                  <option selected>Seleccione una opción</option>
                  <option>SURA</option>
                  <option>PONAL</option>
                  <option>SALUD TOTAL</option>
                </select>
              </div>
              <div class="icon is-small is-left">
                <i class="fa fa-building"></i>
              </div>
            </div>
          </div>
        </div>

        <!-- Selector de medicamentos -->
        <div class="column is-12 mt-5">
          <h3 class="title is-size-5 is-bordered">Receta medica</h3>
        </div>
        <div class="column is-6">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Medicamento</label>
            <div class="control has-icons-left">
              <div class="select is-fullwidth">
                <select v-model="medicamento">
                  <option :value="elm.name" v-for="(elm, index) in medicinas" :key="index" selected>
                    {{ elm.name }}
                  </option>
                </select>
              </div>
              <div class="icon is-small is-left">
                <i class="fa fa-building"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="column is-2">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Cantidad</label>
            <div class="control">
              <input class="input" type="number" />
            </div>
          </div>
        </div>
        <div class="column is-4">
          <div class="field">
            <label style="opacity: 0">Empty</label>
            <div class="control">
              <button class="button is-primary is-outlined is-fullwidth" @click="addMedicamento">
                <span class="icon mr-1"> <i class="fa fa-plus"></i> </span>Agregar
              </button>
            </div>
          </div>
        </div>

        
        <div class="card column">
          <div class="card-content">
            <div class="content">
              <ul>
                <li v-for="(elm, index) in order.medicines" :key="index">
                  {{ elm }}
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="column is-12">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Comentarios</label>
            <div class="control">
              <textarea class="textarea" v-model="order.comentarios" />
            </div>
          </div>
        </div>
        <div class="column is-12">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Firma del doctor</label>
            <div class="control">
              <input class="input" type="text" v-model="order.doctorSignature" />
            </div>
          </div>
        </div>
        <div class="column is-12 mt-6">
          <button class="button is-primary is-fullwidth" @click="handleSubmit">Guardar</button>
        </div>
        <div class="notification is-danger mt-4 error" v-if="error">
          {{ 'Todos los campos deben de estar llenos' }}
        </div>
      </div>
    </div>
    <div class="close" @click="closeModal">
      <i class="fa fa-times"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, onUpdated } from 'vue'
import CustomTable from '../shared/CustomTable.vue'
import validationOrdersForm from '../../helpers/validationOrdersForm'
import type MedicalOrder from '@/interfaces/MedicalOrder'
import type Medicine from '../../interfaces/Medicine'

export default defineComponent({
  name: 'MedicalOrderModal',
  components: { CustomTable },
  props: {
    isOpen: { type: Boolean, required: true },
    medicines: { type: Array<Medicine>, required: true }
  },
  emits: ['hide', 'save'],
  setup(props, { emit }) {
    const isModalOpen = computed(() => props.isOpen)
    const medicinas = ref<Medicine[]>([])
    let medicamento = ref('')
    let error = ref(false)

    const llenarSelect = () => {
      medicinas.value = props.medicines
    }

    const order = ref<MedicalOrder>({
      name: '',
      lastName: '',
      idNumber: '',
      eps: '',
      medicines: [],
      doctorSignature: '',
      comentarios: ''
    })

    // Add medicamento
    const addMedicamento = () => {
      if (medicamento.value !== 'opcion') order.value.medicines.push(medicamento.value)
      console.log(order.value.medicines)
    }

    const closeModal = () => {
      emit('hide')
      order.value = {
          name: '',
          lastName: '',
          idNumber: '',
          eps: '',
          medicines: [],
          doctorSignature: '',
          comentarios: ''
        }
    }
    
    const handleSubmit = async () => {
      const isValid = validationOrdersForm(order.value)
      if (isValid) {
        order.value.createdAt = new Date().toISOString()
        emit('save', JSON.stringify(order.value))
        emit('hide')
        order.value = {
          name: '',
          lastName: '',
          idNumber: '',
          eps: '',
          medicines: [],
          doctorSignature: '',
          comentarios: ''
        }
      } else {
        error.value = true
        setTimeout(() => {
          error.value = false
        }, 2000)
      }
    }

    onUpdated(() => {
      llenarSelect()
    })

    return { isModalOpen, emit, order, medicamento, addMedicamento, handleSubmit, error, medicinas, closeModal }
  }
})
</script>

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
  height: 830px;
  width: 1200px;
  margin-top: 2%;
  overflow-y: auto;
  padding: 40px 0;
  border-radius: 10px;
}
.close {
  margin: 3% 0 0 -60px;
  cursor: pointer;
}

.is-bordered {
  border-bottom: 1px solid black;
}

.error {
  text-align: center;
  width: 100%;
  font-size: 18px;
}
</style>
