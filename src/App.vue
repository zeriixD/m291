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
