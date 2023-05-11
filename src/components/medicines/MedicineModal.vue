<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'MedicineModal',
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

<template>
  <div v-show="isModalOpen" class="custom-modal-overlay">
      <div class="custom-modal">
        <div class="columns is-multiline px-5">
          <div class="column is-12">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Nombre</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>
          </div>
          <div class="column is-12">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Descripción</label>
              <div class="control">
                <textarea class="textarea" />
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Cantidad</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>
          </div>
          <div class="column is-6">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Proveedor</label>
              <div class="control">
                <input class="input" type="text" />
              </div>
            </div>
          </div>
          <div class="column is-12">
            <div class="field">
              <label class="has-text-grey has-text-weight-light">Firma del encargado</label>
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
  height: 600px;
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
