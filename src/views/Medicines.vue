<script lang="ts" setup>
import Navegation from '@/components/layout/Navegation.vue';
</script>

<template>
  <div class="columns is-multiline">
    <Navegation/>
    <!-- Buttons -->
    <div class="column is-12 has-text-right">
      <button class="button is-primary">
        <span class="icon mr-1"> <i class="fa fa-plus"></i> </span> Agregar
      </button>
    </div>

    <!-- Table (This will be a component) -->
    <div class="column is-12">
      <vue-good-table
        :columns="[]"
        :rows="[]"
        :sort-options="{
          enabled: true
        }"
        :search-options="{
          enabled: true
        }"
        :pagination-options="{
          enabled: true,
          mode: 'records',
          perPage: 5,
          position: 'top',
          perPageDropdown: [10, 20, 50],
          dropdownAllowAll: false,
          setCurrentPage: 1,
          nextLabel: 'Siguiente',
          prevLabel: 'Anterior',
          rowsPerPageLabel: 'Filas por página',
          ofLabel: 'de',
          allLabel: 'Todas'
        }"
      >
        <template #emptystate>No hay datos disponibles para mostrar</template>
      </vue-good-table>
    </div>

    <!-- Modal -->
    <div v-show="false" class="custom-modal-overlay">
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
      <div class="close">
        <i class="fa fa-times"></i>
      </div>
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
