<script setup>
import { onMounted, createApp, ref, reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>

      <div v-if="!signedUp">
        <div id="name-input">
          <h1>
            M291 <br>
            Stunden und Absenzen
          </h1>
          <p>von KLc und SZu</p>

          <input v-model="username" placeholder="Wie heisst du?" type="text"> <br>
          <button @click="selectRole()">Sign in</button>
        </div>
        <div id="role-input">
          <h1>Hallo {{ username }}</h1>
          <p>Wähle deine Rolle</p>
          <button @click="signUp && userRole === 'LP' && currentView === 'lpSimpleProjects'">Lernpartner</button>
          <button @click="signUp && userRole === 'Coach' && currentView === 'coachSimpleProjects'">Coach</button>
        </div>
      </div>

      <div id="project-list">
        <div v-if="signedUp && userRole === 'LP' && currentView === 'lpSimpleProjects'">
          <h1>Projekte</h1>
          <br><br>
          <div v-for="project in projects" :key="project.ID" class="project-simple">
            <h2>{{ project.name }}</h2>
            <p class="clickable-text" v-if="!collaborating(project)" @click="joinProject(project)"></p>
            <p class="clickable-text" v-if="collaborating(project)" @click="leaveProject(project)"></p>
          </div>
        </div>
      </div>

    </div>
  </header>

  <RouterView />
</template>

<style></style>

<script>

const app = createApp({
  setup() {
    const username = ref('')
    const userRole = ref('')
    const signedUp = ref(false)
    const currentView = ref('projects')
    const selectedUser = ref(null)
    const selectedProject = ref(null)
    const hours = ref(0)

    const lps = ref([])
    const coaches = ref([])
    const projects = ref([])
    const lpHours = ref([])

    onMounted(() => {
      fetch('https://api-sbw-plc.sbw.media/Teacher')
        .then(response => response.json())
        .then(data => {
          coaches.value = data.resources
        })

      fetch('https://api-sbw-plc.sbw.media/Student')
        .then(response => response.json())
        .then(data => {
          lps.value = data.resources
        })

      fetch('https://api-sbw-plc.sbw.media/Project')
        .then(response => response.json())
        .then(data => {
          projects.value = data.resources.map(project => ({
            ...project,
            collaborators: []
          }))
        })
    })

    function selectRole() {

    }

    const signUp = () => {
      if (username.value && userRole.value) {
        signedUp.value = true
      }
    }

    const projectFilter = () => {
      if (userRole.value === 'LP') {
        return
      }
    }
  }
}).mount('#app')






















</script>
