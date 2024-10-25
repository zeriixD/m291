<template>
    <header>
        <div class="logo">
            <img src="/src/assets/logo.svg" alt="logo-sbw">
        </div>
        <nav>
            <ul>
                <li v-on:click="currentView === 'Proj'">Projekte</li>
                <li v-on:click="currentView === 'LP'">Auslastung</li>
            </ul>
        </nav>
    </header>

    <body>
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
                        <h2>{{ selectedProject.Name }}</h2>
                        <h1>{{ selectedProject.totalHours }}</h1>
                    </div>
                    <p>Platzhaltertext für Kurzbeschreibung dieses Projekts</p>

                    <h2>Coach</h2>
                    <div id="coach-info">
                        <img src="/src/assets/avatar/avatar3.svg" alt="pfp-coach">
                        <span>{{ selectedProject.Coach }}</span>
                    </div>

                    <h2>Mitglieder</h2>
                    <div id="members-table">
                        <div id="member" v-for="collaborator in selectedProject.collaborators"
                            :key="collaborator.lpID">
                            <img src="/src/assets/avatar/avatar1.svg" alt="pfp-lp">
                            <span>{{ collaborator.name }}</span>
                            <span>{{ collaborator.hoursWorked }}</span>
                            <button id="verify"
                                v-on:click="verifyHours(selectedProject.ID, collaborator.lpID)">Bestätigen</button>
                            <button id="reject" v-on:click="rejectHours()">Ablehnen</button>
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
                    <span>Stunden</span>
                    <span>Projektanzahl</span>
                </div>

                <div id="lernpartner" v-for="lp in users" :key="lp.id" v-on:click="toggleUserDetails(lp)">
                    <img src="/src/assets/avatar/avatar1.svg" alt="pfp-lp">
                    <span>{{ lp.fullname }}</span>
                    <span>{{ lp.totalHours }}</span>
                    <span>{{ lp.projects.length }}</span>
                    <div id="lp-expanded" v-if="expandedUsers[lp.id]">
                        <ul>
                            <li v-for="project in lp.projects" :key="project.ID">
                                {{ project.Name }}: {{ project.lpHours }}h ({{ project.lpVerifiedHours }} davon
                                bestätigt)
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </body>
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