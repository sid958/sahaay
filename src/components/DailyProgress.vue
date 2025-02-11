<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Chart, registerables } from 'chart.js'
Chart.register(...registerables)

const route = useRoute()
const addictionType = computed(() => route.query.addiction || '')

// Progress tracking
const currentProgress = ref({
  triggers: '',
  cravings: 0,
  stressLevel: 0,
  supportReceived: '',
  notes: ''
})

const progressHistory = ref([])

const saveProgress = () => {
  const today = new Date().toISOString().split('T')[0]
  const progressEntry = {
    date: today,
    ...currentProgress.value
  }
  
  progressHistory.value.push(progressEntry)
  
  // Save to local storage
  localStorage.setItem(`progressHistory_${addictionType.value}`, JSON.stringify(progressHistory.value))
  
  // Reset current progress
  currentProgress.value = {
    triggers: '',
    cravings: 0,
    stressLevel: 0,
    supportReceived: '',
    notes: ''
  }
}

const renderProgressChart = () => {
  const ctx = document.getElementById('progressChart')
  
  if (progressHistory.value.length > 0) {
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: progressHistory.value.map(entry => entry.date),
        datasets: [
          {
            label: 'Cravings Intensity',
            data: progressHistory.value.map(entry => entry.cravings),
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Stress Level',
            data: progressHistory.value.map(entry => entry.stressLevel),
            borderColor: 'rgb(255, 99, 132)',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: `Progress Tracking for ${addictionType.value} Addiction`
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            max: 10
          }
        }
      }
    })
  }
}

onMounted(() => {
  // Load progress history from local storage
  const savedHistory = localStorage.getItem(`progressHistory_${addictionType.value}`)
  if (savedHistory) {
    progressHistory.value = JSON.parse(savedHistory)
  }
  
  // Render chart after a short delay to ensure DOM is ready
  setTimeout(renderProgressChart, 100)
})
</script>

<template>
  <div class="daily-progress-container">
    <h2>Daily Progress Tracker</h2>
    <p>Tracking Progress for {{ addictionType }} Addiction</p>
    
    <form @submit.prevent="saveProgress" class="progress-form">
      <div class="form-group">
        <label>Triggers Today:</label>
        <textarea v-model="currentProgress.triggers" placeholder="What triggered your cravings today?"></textarea>
      </div>
      
      <div class="form-group">
        <label>Cravings Intensity (0-10):</label>
        <input 
          type="range" 
          v-model.number="currentProgress.cravings" 
          min="0" 
          max="10" 
        />
        <span>{{ currentProgress.cravings }}/10</span>
      </div>
      
      <div class="form-group">
        <label>Stress Level (0-10):</label>
        <input 
          type="range" 
          v-model.number="currentProgress.stressLevel" 
          min="0" 
          max="10" 
        />
        <span>{{ currentProgress.stressLevel }}/10</span>
      </div>
      
      <div class="form-group">
        <label>Support Received:</label>
        <textarea v-model="currentProgress.supportReceived" placeholder="Who or what supported you today?"></textarea>
      </div>
      
      <div class="form-group">
        <label>Additional Notes:</label>
        <textarea v-model="currentProgress.notes" placeholder="Any additional thoughts or reflections"></textarea>
      </div>
      
      <button type="submit">Save Today's Progress</button>
    </form>
    
    <div class="progress-chart">
      <canvas id="progressChart"></canvas>
    </div>
  </div>
</template>

<style scoped>
.daily-progress-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.progress-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-bottom: 30px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

textarea, input[type="range"] {
  width: 100%;
  padding: 10px;
}

button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  cursor: pointer;
}

.progress-chart {
  width: 100%;
  max-height: 400px;
}
</style>
