<template>
<div>
    <h1>Aktuelle Projekte</h1>
    <p>Hier werden laufende PRojekte angezeigt. Um mehr über ein Projekt zu erfahren, klicke auf "Details"!</p>

    <div id="project-grid">
        <div v-if="!detailsExpanded" id="project-card" v-for="project in projects" :key="project.ID">
            <h1>{{ project.totalHours }}h</h1>
            <h2>{{ project.Name }}</h2>
            <button id="details-button" v-on:click="viewProjectDetails(project.ID)">Details</button>
            <div id="avatar-group">
                <img src="/src/assets/avatar/avatar1.svg" alt="pfp1" />
                <img src="/src/assets/avatar/avatar2.svg" alt="pfp2" />
                <img src="/src/assets/avatar/avatar3.svg" alt="pfp3" />
                <span>+1</span>
            </div>
        </div>

        <div v-if="detailsExpanded" id="project-box">
            <div>
                <h2>{{ projectTitle }}</h2>
                <h1>{{  }}</h1>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            projects: [],
            detailsExpanded: false,
            projectTitle: '',
        }
    },
    methods: {
        fetchProjects() {
            fetch('https://api-sbw-plc.sbw.media/Student')
            .then(res => res.json())
            .then(data => {
                this.projects = data.resources.map(project => ({
                    ...project,
                    totalHours: 0,
                    lpHours: []
                }))
            })
        },
        viewProjectDetails(projectID) {
            this.$router.push(`/coach/projects/${projectID}`)
        }
    }
}
</script>