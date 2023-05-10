<template>
  <div>
    <nav class="navbar mb-6" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item" to="/">
          <h3 class="title is-3">MyApp</h3>
        </router-link>
        <a
          role="button"
          class="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start has-text-white">.</div>
        <div>
          <div class="navbar-end">
            <div class="navbar-item">
              <div class="navbar-item has-dropdown is-hoverable" v-if="user">
                <a class="navbar-link"> Usuario </a>
                <div class="navbar-dropdown">
                  <router-link to="/" class="navbar-item"> Orders </router-link>
                  <router-link to="/medicamentos" class="navbar-item"> Medicines </router-link>
                  <a class="navbar-item" @click.prevent="logout"> Cerrar sesion </a>
                </div>
              </div>
              <div class="buttons" v-else>
                <router-link class="button is-primary" to="/register">
                  <strong>Registrarme</strong>
                </router-link>
                <router-link class="button is-light" to="/login"> Iniciar sesión </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script lang="ts">
import firebase from 'firebase';
export default {
  data() {
    return {
      user: null
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut().then(() => {
        this.$router.push({name: 'login'})
      })
    }
  },
  created() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    })
  }
}
</script>

<!-- <script lang="ts" setup>
import firebase from 'firebase'
import { useRouter } from 'vue-router'
import { onBeforeMount } from 'vue'

const router = useRouter()
let userr: any = null

const logout = () => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      router.push({ name: 'login' })
    })
}

onBeforeMount(() => {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      userr = user
    } else {
      userr = null
    }
  })
})
</script> -->
<style scoped></style>
