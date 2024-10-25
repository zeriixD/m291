<template>
    <header>
        <div class="logo">
            <img src="/src/assets/logo.svg" alt="logo-sbw">
        </div>
        <nav>
            <ul>
                <li><p v-on:click="currentView = 'Proj'">Projekte</p></li>
                <li><p v-on:click="currentView = 'LP'">Auslastung</p></li>
            </ul>
        </nav>
    </header>

    <main>
        <div v-if="currentView === 'Proj'">
            <h1>Aktuell laufende Projekte</h1>
            <p>Hier werden laufende Projekte angezeigt. Um mehr über ein Projekt zu erfahren, klicke auf "Details"!</p>

            <div v-if="!selectedProject" id="coach-grid">
                <div v-for="project in projects" :key="project.ID" id="coach-card">
                    <h1>{{ project.totalHours }}h</h1>
                    <h2>{{ project.Name }}</h2>
                    <button v-on:click="showProjectDetails(project)" class="details-button">Details</button>
                    <div class="avatar-group">
                        <img src="/src/assets/avatar/avatar1.svg" alt="pfp1" />
                        <img src="/src/assets/avatar/avatar2.svg" alt="pfp2" />
                        <img src="/src/assets/avatar/avatar3.svg" alt="pfp3" />
                        <span>+1</span>
                    </div>
                </div>
            </div>

            <div v-if="selectedProject" id="coach-details">
                <div id="project-box">
                    <div class="header-section">
                        <h2 id="project-title">{{ selectedProject.Name }}</h2>
                        <h1 id="total-hours">{{ selectedProject.totalHours }}h</h1>
                        <p id="proj-desc">Platzhaltertext für Kurzbeschreibung dieses Projekts</p>
    
                        <h2>Coach</h2>
                        <div id="coach-info">
                            <img class="avatar" src="/src/assets/avatar/avatar3.svg" alt="pfp-coach">
                            <span>{{ selectedProject.Coach }}</span>
                        </div>
    
                        <h2>Mitglieder</h2>
                        <div id="members-table">
                            <div id="member" v-for="collaborator in selectedProject.collaborators"
                                :key="collaborator.lpID">
                                <img class="avatar" src="/src/assets/avatar/avatar1.svg" alt="pfp-lp">
                                <span id="member-name">{{ collaborator.name }}</span>
                                <span id="member-hours">{{ collaborator.hoursWorked }}h</span>
                                <button id="verify"
                                    v-on:click="verifyHours(selectedProject.ID, collaborator.lpID)">Bestätigen</button>
                                <button id="reject" v-on:click="rejectHours()">Ablehnen</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="currentView === 'LP'">
            <h1>Auslastung und Stunden</h1>
            <p>Um die Auslastund und Stunden einer Person anzeigen zu lassen, klicke auf die gewünschte Person!</p>

            <div id="searchbar">
                <input type="text" placeholder="Dieses Suchfeld ist nicht implementiert">
            </div>

            <div id="lp-list">
                <div id="table-headers">
                    <span id="hours-header">Stunden</span>
                    <span id="project-header">Projektanzahl</span>
                </div>

                <div id="lernpartner" v-for="lp in users" :key="lp.id" >
                <!-- v-on:click="toggleUserDetails(lp)"> -->
                    <img src="/src/assets/avatar/avatar1.svg" alt="pfp-lp">
                    <span id="lp-name">{{ lp.fullname }}</span>
                    <span id="lp-hours">{{ lp.totalHours }}</span>
                    <span id="lp-projects">{{ lp.projects.length }}</span>
                    <div id="lp-expanded" v-if="expandedUsers[lp.id]">
                        <ul>
                            <li v-for="project in lp.projects" :key="project.ID">
                                <p>
                                    {{ project.Name }}: {{ project.lpHours }}h ({{ project.lpVerifiedHours }} davon
                                    bestätigt)
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
export default {
    data() {
        return {
            projects: [],
            users: [],
            selectedProject: null,
            expandedUsers: {},
            currentView: 'Proj'
        }
    },
    methods: {
        fetchProjects() {
            fetch('https://api-sbw-plc.sbw.media/Project')
            .then(response => response.json())
            .then(data => {
                this.projects = data.resources.map(project => ({
                    ...project,
                    totalHours: 0,
                    collaborators: [],
                }))
            })
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
        showProjectDetails(project) {
            this.selectedProject = project
        },
        addCollaboratorToProject(lpID, lpName, projectID) {
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
        },
        toggleUserDetails(lp) {
            this.expandedUsers = {
                ...this.expandedUsers,
                [lp.id]: !this.expandedUsers[lp.id]
            }
        },
        verifyHours(projectID, lpID) {
            const project = this.projects.find(p => p.ID === projectID)
            const collaborator = project.collaborators.find(lp => lp.lpID === lpID)

            if (collaborator) {
                collaborator.verifiedHours += collaborator.hoursWorked
                collaborator.hoursWorked = 0
            }

            if (lp) {
                const lpProject = lp.projects.find(p => p.ID === projectID)
                lpProject.lpVerifiedHours += collaborator.verifiedHours
            }
        },
        rejectHours() {
            // hier passiert nix
        }
    },
    mounted() {
        this.fetchProjects()
        this.fetchUsers()
    }
}
</script>

<style>
#coach-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
}

#coach-card {
    background-color: white;
    padding: 5px;
    border-radius: 15px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    color: #333;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    -ms-border-radius: 10px;
    -o-border-radius: 10px;
}

#coach-card h2 {
    margin-top: 0;
    color: #582CAF;
    font-weight: 400;
}

#coach-card h1 {
    margin-bottom: 5px;
}

#project-title {
    font-size: 2rem;
    color: #582CAF;
    text-align: right;
    margin: 0;
    padding: 0;
}

#project-box {
    background-color: #7E57C2;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-height: 100vh;
}

.header-section {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    align-items: center;
    align-items: flex-start;
    width: 100%;
    background-color: #fff;
    border-radius: 15px;
    padding: 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    text-align: center;
    width: 700px;
    color: #333;
}

.header-section h2 {
    font-size: 3rem;
    margin-top: 0;
    margin-bottom: 0;
    text-align: left;
    font-weight: 900;
    color: #582CAF;
}

#coach-info {
    display: flex;
    align-items: center;
    margin-top: 1rem;
    font-size: 1.2rem;
    color: #333;
}

#members-table {
    margin-top: 3rem;
}

#member {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
}

#coach-info img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

#member-name {
    flex: 1;
    margin-left: 1rem;
    color: #333;
}

#member-hours {
    color: #666;
    margin-top: 0.3rem;
    margin-right: 1.5rem;
}

.coach-info img {
    width: 50px;
    height: 50px;
}

#searchbar {
    margin: 1rem 0;
    display: flex;
    justify-content: center;
}

#searchbar input {
    padding: 0.5rem;
    border-radius: 10px;
    border: 1px solid #53358B;
    width: 500px;
}

#table-headers {
    display: flex;
    justify-content: space-between;
    background-color: transparent;
    padding: 1rem;
    color: white;
    font-weight: bold;
    font-size: 1rem;
}

#hours-header {
    margin-left: 48rem;
    margin-right: 1rem;
}

#project-header {
    margin-right: -1rem;
}

#lernpartner {
    display: flex;
    align-items: center;
    background-color: white;
    padding: 1rem;
    border-radius: 15px;
    margin-bottom: 0.5rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    justify-content: space-between;
}

#lernpartner img {
    width: 50px;
    border-radius: 50%;
    margin-right: 1rem;
}

#lp-name {
    flex: 1;
    font-weight: 500;
    font-size: 1.2rem;
    color: #333;
    text-align: left;
    margin-left: 1rem;
}

#lp-hours {
    font-size: 1rem;
    color: #666;
    margin-right: 6rem;
}

#lp-projects {
    font-size: 1rem;
    color: #666;
    margin-right: 2rem;
}
</style>