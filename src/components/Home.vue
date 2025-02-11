<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const selectedProblem = ref('')
const router = useRouter()

const beginJourney = () => {
  if (selectedProblem.value) {
    router.push({ 
      name: 'DailyProgress', 
      query: { addiction: selectedProblem.value }
    })
  } else {
    alert('Please select an addiction type before beginning your journey.')
  }
}
</script>

<template>
<div class="container">
  <h1>Sahaay</h1>
  <h3>Smarter Recovery, Stronger You</h3>
  <select 
    name="problem" 
    id="problem" 
    v-model="selectedProblem"
  >
    <option selected disabled value="">Select Addiction</option>
    <option value="smoking">Smoking</option>
    <option value="alcohol">Alcohol</option>
    <option value="drug">Drug</option>
    <option value="technology">Technology</option>
    <option value="other">Other</option>
  </select>
  <button @click="beginJourney">Begin Your Journey</button>
</div>
</template>

<style scoped>
  .container{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    margin-top: 100px;
    height: 100vh;
    gap: 20px;
  }
  h1,h2,h3,h4{
    margin: 0;
  }
  select{
    padding: 10px;
    width: 200px;
  }
</style>
