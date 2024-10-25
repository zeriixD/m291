<script setup>
</script>

<template>
  <div v-if="!signedUp" id="signup">
    <div id="name-input">
      <h1>M291 <br> Stunden und Absenzen</h1>
      <p class="text-white">von KLc und SZu</p>
      <input type="text" v-model="username" v-on:keypress.enter="signIn()" placeholder="Wie heisst du?"><br>
    </div>

    <div v-if="validUsername === true" id="role-input">
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
      lpNames: [],
      signedUp: false,
      error: '',
      validUsername: false
    }
  },
  methods: {
    assignRole(role) {
      if (role === 'LP') {
        this.$router.push('/lp')
      } else if (role === 'Coach') {
        this.$router.push('/coach')
      }
    },
    fetchUsernames() {
      fetch('https://api-sbw-plc.sbw.media/Student')
        .then(response => response.json())
        .then(data => {
          this.lpNames = data.resources.map(lp => lp.fullname)
        })
        .catch(error => console.error('Error fetching LP names:', error))
    },
    signIn() {
      if (this.lpNames.includes(this.username)) {
        this.validUsername = true
        this.error = ''
        localStorage.setItem('username', this.username)
      } else {
        this.error = 'Ungültiger Name. Gib bitte deinen Vollständigen Namen ein. L.'
        alert(this.error)
      }
    },
  },
  mounted() {
    this.fetchUsernames()
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