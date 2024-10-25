<template>
    <header>
        <div class="logo">
            <img src="/src/assets/logo.svg" alt="logo-sbw">
        </div>
        <nav>
            <ul>
                <li>
                    <a href="">Projekte</a>
                </li>
                <li>
                    <a href="">Zeiterfassung</a>
                </li>
            </ul>
        </nav>
    </header>

    <main>
        <div v-if="!selectedProject">
            <h1>Deine Projekte</h1>
            <p>Klicke auf das + um einem Projekt beizutreten. Du kannst aus dem Projektteam über das - auch wieder
                austreten.</p>
        </div>
        <div id="lp-grid" v-if="!selectedProject">
            <div id="lp-card" v-for="project in projects" :key="project.ID">
                <h1>{{ project.lpHours }}h</h1>
                <h2>{{ project.Name }}</h2>
                <button v-on:click="showProjectDetails(project)" class="details-button">Zeit erfassen</button>
                <div class="avatar-group">
                    <img src="/src/assets/avatar/avatar1.svg" alt="pfp1" />
                    <img src="/src/assets/avatar/avatar2.svg" alt="pfp2" />
                    <img src="/src/assets/avatar/avatar3.svg" alt="pfp3" />
                    <span>+1</span>
                </div>
                <p class="team-action-text" v-if="!joined" v-on:click="joined === true">+ zum Team hinzufügen</p>
                <p class="team-action-text" v-if="joined" v-on:click="joined === false">- aus dem Team austreten</p>
            </div>
        </div>

        <div id="lp-details" v-if="selectedProject">
            <h1>Zeiterfassung</h1>
            <p>Hier kannst du deine geleisteten Stunden eintragen</p>
            <div>
                <div class="header-section">
                    <div id="proj-desc">
                        <h2>{{ selectedProject.Name }}</h2>
                        <p>Wie lange hast du heute an dem Projekt gearbeitet? (Bitte in gerundeten Stunden angeben)</p>
                        <input v-model="hoursInput" type="number" placeholder="Stunden eintragen" />
                        <button v-on:click="submitHours(selectedProject.ID)" class="submit">Abschicken</button>
                    </div>
                    <div id="hours-container">
                        <h1>{{ selectedProject.totalHours }}h</h1>
                        <p>insgesamt geleistet</p>
                        <br>
                        <h1>{{ selectedProject.lpHours }}h</h1>
                        <p>deine Stunden</p>
                        <br>
                        <h1 id="verifiedhours-text">{{ selectedProject.lpVerifiedHours }}h</h1>
                        <p>davon Bestätigt</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
import { ref } from 'vue'

export default {
    data() {
        return {
            projects: [],
            selectedProject: null,
            hoursInput: '',
            joined: false,
        }
    },
    methods: {
        fetchProjects() {
            fetch('https://api-sbw-plc.sbw.media/Project')
                .then(response => response.json())
                .then(data => {
                    this.projects = data.resources.map(project => ({
                        ...project,
                        lpHours: 0,
                        lpVerifiedHours: 0,
                        totalHours: 0,
                    }))
                })
        },
        showProjectDetails(project) {
            this.selectedProject = project
        },
        submitHours(projectID) {
            const project = this.projects.find(p => p.ID === projectID)
            project.lpHours += parseInt(this.hoursInput, 10)
            project.totalHours += parseInt(this.hoursInput, 10)
            this.hoursInput = ''
        }
    },
    mounted() {
        this.fetchProjects()
    },
}
</script>

<style>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    padding: 10px;
    background-color: #ffffff;
    width: 100%;
    box-sizing: border-box;
    position: fixed;
    top: 0;
    left: 0;
}

a {
    text-decoration: none;
    color: #333;
}

main {
    margin-top: 250px;
    padding: 325px;
    text-align: center;
    height: 100vh;
}

nav ul {
    color: black;
    display: flex;
    gap: 90px;
    margin-right: 51rem;
    font-weight: bold;
    font-size: 1rem;
}

li {
    list-style: none;
}

li p {
    font-size: 1.1rem;
}

#lp-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
}

#lp-card {
    background-color: #ffffff;
    padding: 5px;
    border-radius: 15px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #333;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-morder-radius: 10px;
    -o-border-radius: 10px;
}

#lp-card h1 {
    margin-top: 0;
    color: #582CAF;
}

#lp-card h2 {
    margin-bottom: 5px;
}

#lp-details {
    background-color: #7E57C2;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
    padding-top: 50px; /* Abstand vom Header */
}

.header-section {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: flex-start;
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    text-align: center;
    max-width: 900px; /* Adjusted width */
}

.header-section h2 {
    font-size: 1.5rem; /* Reduced size for clarity */
    font-weight: 900;
    color: #582CAF;
    text-align: left;
}
#hours-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-left: auto;
    text-align: right;
}

#hours-container h1 {
    color: #582CAF;
    font-size: 2rem;
    margin: 0;
}

#verifiedhours-text {
    color: green;
    font-size: 2rem;
    margin: 0;
}

#hours-container p {
    margin-top: 0;
    font-size: 1rem;
    color: #333;
}

#proj-desc {
    max-width: 600px;
    text-align: left;
}

#proj-desc p {
    color: black; /* Sichtbare Farbe für den Text */
    font-size: 1.1rem; /* Angepasste Schriftgröße */
    margin-top: 10px; /* Abstand über dem Text */
}

</style>