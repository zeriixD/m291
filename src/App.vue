<script setup>
import { onMounted, createApp, ref, reactive } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="wrapper">

    <div v-if="!signedUp">
      <div id="name-input">
        <h1>
          M291 <br>
          Stunden und Absenzen
        </h1>
        <p class="text-white">von KLc und SZu</p>

        <input v-model="username" placeholder="Wie heisst du?" type="text" class="text-button"> <br>
        <button class="text-button" >Sign in</button>
      </div>
      <div id="role-input">
        <h1>Hallo {{ username }}!</h1>
        <p class="text-white">Wähle deine Rolle</p>
        <button class="text-button" v-on:click="assignRole('LP')">Lernpartner</button>
        <button class="text-button" v-on:click="assignRole('Coach')">Coach</button>
      </div>
    </div>
  </div>

  <RouterView />

</template>

<style>
 /* Einbindung von Google Fonts */
  /* penisbob */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;900&display=swap');
  
  /* Grundlegendes Styling für die Seite */
  body {
    margin: 0;
    padding: 0;
    font-family: 'Inter', sans-serif;
    background-color: #7E57C2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  /* Container für die Anmeldung */
  .container {
    text-align: center;
  }
  
  /* Styling für h1 und h2 */
  h1 {
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    /* Inter Black */
    font-size: 3rem;
    color: white;
  }
  
  h2 {
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    /* Inter Medium */
    font-size: 1.5rem;
    color: white;
  }
  
  /* Text und Buttons */
  input,
  button {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    /* Inter Light */
    padding: 10px;
    margin: 10px;
    font-size: 1rem;
    border: none;
    border-radius: 10px;
    background-color: #A49DD2;
    /* Button und Input Hintergrundfarbe */
    color: #483B9E;
    /* Textfarbe auf den Buttons */
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c6b6e4;
  }
  
  /* Transition Effekte */
  button,
  input {
    transition: background-color 0.3s ease;
  }
  
  input {
    text-align: center;
  }
  
  /* Rolle Auswahl Buttons */
  .role-selection {
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-top: 20px;
  }
  
  /* Responsive für kleine Bildschirme */
  @media (max-width: 600px) {
    h1 {
      font-size: 2rem;
    }
  
    h2 {
      font-size: 1.2rem;
    }
  
    input,
    button {
      font-size: 0.9rem;
    }
  }
  
  /* Sign In */
  .wrapper {
    display: flex;
    flex-direction: column; /* Damit der Inhalt vertikal gestapelt wird */
    justify-content: center; /* Zentriert vertikal */
    align-items: center; /* Zentriert horizontal */
    height: 100vh; /* Damit die Wrapper-Höhe den gesamten Viewport abdeckt */
    text-align: center; /* Text im Wrapper zentrieren */
    padding: 20px; /* Platz um den Inhalt herum */
  }
  
  input, button {
    margin-top: 10px;
    padding: 10px;
    font-size: 1rem;
    border-radius: 5px;
  }
  
  #project-list {
    margin-top: 20px; /* Platz zwischen der Rolle und den Projekten */
  }
  
  .project-simple {
    margin-bottom: 15px;
  }
  
  h1, h2 {
    font-family: 'Inter', sans-serif;
  }

.text-white {
    font-family: 'Inter', sans-serif;
    font-weight: 300;
    /* Inter Light */
    color: #F4F2F8 ;
}

.text-button {
  font-weight: bold;
}



</style>

<script>

const app = createApp({
  setup() {
    const username = ref('')
    const userRole = ref('')
    const signedUp = ref(false)
    const hoursInput = ref('')
    const currentView = ref('projects')
    const selectedLP = ref(null)
    const selectedProject = ref('')

    const lps = ref([])
    const coaches = ref([])
    const projects = ref([])

    const totalHours = ref(0)
    const verifiedHours = ref(0)

    const fetchLps = async () => {
      const response = await fetch('https://api-sbw-plc.sbw.media/Student')
      const data = await response.json()
      lps.value = data.resources.map(lp => ({
        ...lp,
        totalHoursWorked: 0,
        verifiedHours: 0,
        worksOn: [],
      }))
    }
    const fetchCoaches = async () => {
      const response = await fetch('https://api-sbw-plc.sbw.media/Teacher')
      const data = await response.json()
      coaches.push(...data.resources)
    }
    const fetchProjects = async () => {
      const response = await fetch('https://api-sbw-plc.sbw.media/Project')
      const data = await response.json()
      projects.value = data.resources.map(project => ({
        ...project,
        totalHours: 0,
        verifiedHours: 0,
        joined: false,
        lpHours: lps.value.map(lp => ({
          lpID: lp.id,
          hoursWorked: 0,
          verifiedHours: 0
        }))
      }))
    }

    onMounted(() => {
      fetchLps()
      fetchCoaches()
      fetchProjects()
    })

    const assignRole = (role) => {
      signedUp.value = true
      userRole.value = role
    }

    const joinProject = () => {
      if (userRole === 'LP') {
        projects.forEach(project => {
          if (selectedProject === project.Name) {
            project.joined = true
            lps.worksOn.push(project.Name)
          }
        });
      }
    }

    const leaveProject = () => {
      if (userRole === 'LP') {
        projects.forEach(project => {
          if (selectedProject === project.Name) {
            project.joined = false
            lps.worksOn.splice(project.Name)
          }
        })
      }
    }



  }
}).mount('#app')




















</script>
