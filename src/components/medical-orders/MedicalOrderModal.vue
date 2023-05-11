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
              <input class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Apellidos del paciente</label>
            <div class="control">
              <input class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Cedula</label>
            <div class="control">
              <input class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="column is-3">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">EPS</label>
            <div class="control has-icons-left">
              <div class="select is-fullwidth">
                <select>
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
                <select>
                  <option selected>Seleccione una opción</option>
                  <option>Medicamento 1</option>
                  <option>Medicamento 2</option>
                  <option>Medicamento 3</option>
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
              <button class="button is-primary is-outlined is-fullwidth">
                <span class="icon mr-1"> <i class="fa fa-plus"></i> </span>Agregar
              </button>
            </div>
          </div>
        </div>

        <!-- Tabla de medicamentos seleccionados -->
        <div class="column is-12">
          <vue-good-table
            :columns="[]"
            :rows="[]"
            :sort-options="{
              enabled: true
            }"
          >
            <template #emptystate>No se ha agregado ningún medicamento</template>
          </vue-good-table>
        </div>

        <div class="column is-12">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Comentarios</label>
            <div class="control">
              <textarea class="textarea" />
            </div>
          </div>
        </div>
        <div class="column is-12">
          <div class="field">
            <label class="has-text-grey has-text-weight-light">Firma del doctor</label>
            <div class="control">
              <input class="input" type="text" />
            </div>
          </div>
        </div>
        <div class="column is-12 mt-6">
          <button class="button is-primary is-fullwidth">Guardar</button>
        </div>
      </div>
    </div>
    <div class="close" @click="() => emit('hide')">
      <i class="fa fa-times"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'MedicalOrderModal',
  props: {
    isOpen: { type: Boolean, required: true }
  },
  emits: ['hide'],
  setup(props, { emit }) {
    const isModalOpen = computed(() => props.isOpen)

    return { isModalOpen, emit }
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
  margin-top: 10%;
  padding: 40px 0;
  border-radius: 10px;
}
.close {
  margin: 10.5% 0 0 -25px;
  cursor: pointer;
}

.is-bordered {
  border-bottom: 1px solid black;
}
</style>
