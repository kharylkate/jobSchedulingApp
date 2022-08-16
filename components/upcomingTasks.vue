<template>
    <div>
        <div class="job-schedules pt-2">
            <div class="pb-3 pt-2">
                <h5>Upcoming Tasks</h5>
            </div>
            <ul class="timeline">
                <li v-for="(task, index) in sortedArr" :key="index">
                    
                <p class="timeline-date">{{ (task.date ? task.date : 'undefined date') }}</p>
                    <div class="timeline-content">
                        <h5>{{ task.name }}</h5>
                        <p>{{ task.command }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Upcoming-Tasks'
}
</script>