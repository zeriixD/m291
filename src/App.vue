<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>




<!-- <script setup>
import { onMounted, createApp, ref, reactive, createRouter } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<script>
import router from './router'

const signUpView = {
  template: `
  <div v-if="!signedUp">
    <div id="name-input">
      <h1>
        M291 <br>
        Stunden und Absenzen
      </h1>
      <p class="text-white">von KLc und SZu</p>
    
      <input v-model="username" placeholder="Wie heisst du?" type="text" class="text-button"> <br>
      <button class="text-button">Sign in</button>
    </div>
    <div id="role-input">
      <h1>Hallo {{ username }}!</h1>
      <p class="text-white">Wähle deine Rolle</p>
      <button class="text-button" v-on:click="assignRole('LP')">Lernpartner</button>
      <button class="text-button" v-on:click="assignRole('Coach')">Coach</button>
    </div>
    </div>
  `
}

const coachProjectView = {
  template: `
  
  `
}


const routes = [
  { path: '/lp', component: signUpView }
]

const router = VueRouter.createRouter({
  history: VueRouter.createWebHashHistory(),
  routes,
})

const app = createApp({
  setup() {
    const signedUp = ref(false);
    const username = ref("");
    const role = ref("");
    const hoursInput = reactive({}); // Track hours input for LP
    const coachView = ref("projects"); // Track Coach view (projects or LPs)
    const selectedProject = ref(null);
    const selectedLP = ref(null);

    const lps = reactive([]); // Dynamically loaded LPs
    const projects = reactive([]); // Dynamically loaded projects
    const coaches = reactive([])

    // Fetch LPs and Projects from APIs
    const fetchLps = async () => {
      const response = await fetch('https://api-sbw-plc.sbw.media/Student');
      const data = await response.json();
      lps.push(...data.resources); // Assuming the API has the "resources" array
    };

    const fetchProjects = async () => {
      const response = await fetch('https://api-sbw-plc.sbw.media/Project');
      const data = await response.json();
      projects.push(...data.resources); // Assuming the API has the "resources" array
    };

    const fetchCoaches = async () => {
      const response = await fetch('https://api-sbw-plc.sbw.media/Teacher');
      const data = await response.json();
      coaches.push(...data.resources); // Assuming the API has the "resources" array
    };

    // Fetch data on component mount
    onMounted(() => {
      fetchLps();
      fetchProjects();
      fetchCoaches()
    });

    // LP Functions
    const signUp = (userRole) => {
      signedUp.value = true;
      role.value = userRole;
    };

    const joinProject = (projectID) => {
      const project = projects.find((p) => p.ID === projectID);
      project.lpHours.push({ lpID: 255, hoursWorked: 0, verifiedHours: 0 }); // Assume LP ID 255 for simplicity
    };

    const lpIsCollaborating = (project) => {
      return project.lpHours.some((lp) => lp.lpID === 255); // Assume LP ID 255
    };

    const getLPProjectHours = (projectID) => {
      const project = projects.find((p) => p.ID === projectID);
      const lpHours = project.lpHours.find((lp) => lp.lpID === 255); // Assume LP ID 255
      return lpHours || { hoursWorked: 0, verifiedHours: 0 };
    };

    const submitHours = (projectID) => {
      const project = projects.find((p) => p.ID === projectID);
      const lpHours = project.lpHours.find((lp) => lp.lpID === 255); // Assume LP ID 255
      lpHours.hoursWorked += parseInt(hoursInput[projectID], 10);
      project.totalHours += parseInt(hoursInput[projectID], 10);
      hoursInput[projectID] = ''; // Clear input after submitting
    };

    // Coach Functions
    const viewProjectDetails = (projectID) => {
      selectedProject.value = projects.find((p) => p.ID === projectID);
      coachView.value = 'projectDetails';
    };

    const verifyHours = (lpID, projectID) => {
      const project = projects.find((p) => p.ID === projectID);
      const lpHours = project.lpHours.find((lp) => lp.lpID === lpID);
      project.verifiedHours += lpHours.hoursWorked - lpHours.verifiedHours; // Add unverified hours
      lpHours.verifiedHours = lpHours.hoursWorked;
    };

    const getLPName = (lpID) => {
      const lp = lps.find((lp) => lp.id === lpID);
      return lp ? lp.fullname : "Unknown";
    };

    const viewLPDetails = (lpID) => {
      selectedLP.value = lps.find((lp) => lp.id === lpID);
      coachView.value = 'lpDetails';
    };

    return {
      signedUp,
      username,
      role,
      hoursInput,
      coachView,
      selectedProject,
      selectedLP,
      lps,
      projects,
      signUp,
      joinProject,
      lpIsCollaborating,
      getLPProjectHours,
      submitHours,
      viewProjectDetails,
      verifyHours,
      getLPName,
      viewLPDetails,
    };
  }
})

app.use(router)

app.mount('#app');

</script> -->

<!-- <template>
  <div class="wrapper">
    <div v-if="!signedUp">
      <div id="name-input">
        <h1>
          M291 <br>
          Stunden und Absenzen
        </h1>
        <p class="text-white">von KLc und SZu</p>

        <input v-model="username" placeholder="Wie heisst du?" type="text" class="text-button"> <br>
        <button class="text-button">Sign in</button>
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

</template> -->

<!-- <style>
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
  flex-direction: column;
  /* Damit der Inhalt vertikal gestapelt wird */
  justify-content: center;
  /* Zentriert vertikal */
  align-items: center;
  /* Zentriert horizontal */
  height: 100vh;
  /* Damit die Wrapper-Höhe den gesamten Viewport abdeckt */
  text-align: center;
  /* Text im Wrapper zentrieren */
  padding: 20px;
  /* Platz um den Inhalt herum */
}

input,
button {
  margin-top: 10px;
  padding: 10px;
  font-size: 1rem;
  border-radius: 5px;
}

#project-list {
  margin-top: 20px;
  /* Platz zwischen der Rolle und den Projekten */
}

.project-simple {
  margin-bottom: 15px;
}

h1,
h2 {
  font-family: 'Inter', sans-serif;
}

.text-white {
  font-family: 'Inter', sans-serif;
  font-weight: 300;
  /* Inter Light */
  color: #F4F2F8;
}

.text-button {
  font-weight: bold;
}
</style> -->
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;900&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
  background-color: #7E57C2;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  color: white;
}

h1 {
  font-size: 3rem;
  font-weight: 900;
}

h2 {
  font-size: 1.5rem;
  font-weight: 500;
}

h3 {
  font-size: 2.5rem;
  font-weight: 900;
  color: #582CAF;
}

p {
  font-size: 1rem;
}

input {
  color: #cecece;
}

.details-button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #B07FF1;
  color: #fff;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  &.hover {
    background-color: #A06BE0;
  }
}

.avatar-group {
  margin-top: 15px;
  align-items: center;
}

.avatar-group span {
  font-size: 14px;
  color: #555;
  margin-left: 5px;
  position: relative;
  top: -8px;
}

.avatar-group img {
  width: 30px;
    height: 30px;
    border-radius: 50%;
    margin-right: 5px;
    align-content: center;
}

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
</style>
