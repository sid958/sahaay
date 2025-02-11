<script setup>
// Component logic will be added here
</script>

<template>
  <div class="coming-soon">
    <h2>Resources</h2>
    <div class="content">
      <div class="icon">📚</div>
      <h3>Coming Soon!</h3>
      <p>We're curating valuable resources to support your journey:</p>
      <ul>
        <li>Expert-verified articles and guides</li>
        <li>Meditation and mindfulness exercises</li>
        <li>Professional support directories</li>
        <li>Self-help tools and techniques</li>
      </ul>
      <div class="note">
        <p>If you need immediate assistance, please reach out to:</p>
        <a href="tel:1800599599" class="emergency-contact">1800-599-599</a>
        <p class="help-text">24/7 National Addiction Helpline</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.coming-soon {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.content {
  text-align: center;
  padding: 40px;
  border-radius: 8px;
  background: #1a1a1a;
  color: #fff;
  margin-top: 20px;
}

.icon {
  font-size: 64px;
  margin-bottom: 20px;
}

h3 {
  color: #4CAF50;
  margin-bottom: 20px;
}

ul {
  text-align: left;
  max-width: 400px;
  margin: 20px auto;
  line-height: 1.6;
}

li {
  margin-bottom: 10px;
}

.note {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #333;
}

.emergency-contact {
  display: block;
  color: #4CAF50;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  margin: 10px 0;
}

.help-text {
  color: #888;
  font-size: 14px;
}
</style>
