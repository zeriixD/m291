<script setup>
</script>

<template>
  <div v-if="!signedUp" id="signup">
    <div id="name-input">
      <h1>M291 <br> Stunden und Absenzen</h1>
      <p class="text-white">von KLc und SZu</p>
      <input type="text" v-model="username" placeholder="Wie heisst du?"><br>
    </div>

    <div v-if="username" id="role-input">
      <h1>Hallo {{ username }}!</h1>
      <p>Wähle deine Rolle</p>
      <button v-on:click="assignRole('LP')">Lernpartner</button>
      <button v-on:click="assignRole('Coach')">Coach</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      signedUp: false,
      usernameExists: false,
    }
  },
  methods: {
    signIn() {
      this.signedUp = true
    },
    assignRole(role) {
      if (role === 'LP') {
        this.$router.push('/lp')
      } else if (role === 'Coach') {
        this.$router.push('/coach')
      }
    },
    fetchUsers() {
      fetch('https://api-sbw-plc.sbw.media/Student')
        .then(response => response.json())
        .then(data => {
          this.users = data.resources.map(lp => ({
            ...lp,
            totalHours: 0,
            projects: [],
          }))
        })
    },
    checkUsername(lpID, lpName, projectID) {
      const project = this.projects.find(p => p.ID === projectID)
      const existingCollaborator = project.collaborators.find(collab => collab.lpID === lpID)

      if (!existingCollaborator) {
        project.collaborators.push({
          lpID: lpID,
          name: lpName,
          hoursWorked: 0,
          verifiedHours: 0
        })
      }
    }
  }
  }
</script>

<style>
input,
button {
  font-weight: 250;
  padding: 10px;
  margin: 10px;
  font-size: 1rem;
  border: none;
  border-radius: 15px;
  background-color: #A49DD2;
  color: #483B9E;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #C6B6E4;
}

#signup {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  text-align: center;
  padding: 20px;
}
</style>