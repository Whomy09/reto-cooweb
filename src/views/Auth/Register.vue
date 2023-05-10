<template>
  <div class="container">
    <div class="columns">
      <div class="column is-6 is-offset-3">
        <h3 class="title is-3">Crear una cuenta</h3>
        <hr />
        <form action="#" @submit.prevent="register">
          <div class="field">
            <label class="label">Correo:</label>
            <div class="control">
              <input
                class="input"
                type="email"
                placeholder="e.g. alexsmith@gmail.com"
                v-model="correo"
              />
            </div>
          </div>

          <div class="field">
            <label class="label">Contraseña:</label>
            <div class="control">
              <input
                class="input"
                type="password"
                placeholder="**************"
                v-model="contrasena"
              />
            </div>
          </div>
          <button type="submit" class="button is-primary">Registrarme</button>
          <div class="notification is-danger" v-if="error">
            {{ error }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { DB } from '@/firebase/firebase'
import firebase from 'firebase'
import { ref } from 'vue'
import type { Ref } from 'vue'

let correo: Ref<string> = ref('')
let contrasena: Ref<string> = ref('')
let error: Ref<string> = ref('')

const register = () => {
  error.value = ''
  if (correo.value && contrasena.value) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(correo.value, contrasena.value)
      .then((user) => {
        correo.value = ''
        contrasena.value = ''
        console.log(user)
      })
      .catch((err) => {
        error.value = err.message
      })
  } else {
    error.value = 'Todos los campos son requeridos'
    setTimeout(() => {
      error.value = ''
    }, 2000)
  }
}
</script>

<style scoped>
.container label,
h3 {
  color: white;
}
.container {
  margin-top: 2rem;
}
.container button {
  margin-top: 0.5rem;
}
.notification {
  margin-top: 1rem;
}
</style>
