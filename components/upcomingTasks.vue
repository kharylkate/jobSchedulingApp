<template>
    <div>
        <div class="job-schedules pt-2">
            <div v-if="arr" class="pb-3 pt-2">
                <h5>Upcoming Tasks</h5>
            </div>
            <ul class="timeline">
                <li v-for="(task, index) in arr" :key="index">
                    <div class="p-0 m-0" v-if="(task.username == user.username) && task.server == server.id">
                        <p class="timeline-date">{{ (task.date ? task.date : 'undefined date') }}</p>
                        <div class="timeline-content">
                            <h5>{{ task.name }}</h5>
                            <p>{{ task.command }}</p>
                        </div>
                    </div>
                </li>
            </ul>

            <br>
            <!-- {{ server.status.stdout.join("") }} -->
            <b-col class="jobs-status mb-5 p-4" style="padding-left: 10px; margin-left:20px;">
              
                
              
            <div>
            </div>
            <div class="job-status-command">
                <p class="text-white"> systemctl status cron </p>
                <b-container class="code-systemctl">
                    <highlightjs :code="server.status.stdout.join('\n')" />
                </b-container>
            </div>
            </b-col>
            
            
        </div>
    </div>
</template>

<script>
import '../node_modules/highlight.js/styles/atom-one-dark-reasonable.css'

export default {
    name: 'Upcoming-Tasks',
    props: {
        arr: {
            type: Array
        },
        server: {
            type: Object
        }
    },
    data() {
        return {
            user: JSON.parse(localStorage.user),
            tasks: [],
        }
    },
    computed: {
        scheduledTasks() {
            return this.arr.forEach(element => {
                console.log("element",element);
                if(element.username == this.user.username) {
                    return element;
                }
            })
        }
    },
    methods: {
        
    }
}
</script>