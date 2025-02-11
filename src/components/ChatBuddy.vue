<script setup>
import { ref, onMounted } from 'vue'

const messages = ref([])
const newMessage = ref('')
const isTyping = ref(false)

const OPENROUTER_API_KEY = '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'

async function sendMessage() {
  if (!newMessage.value.trim()) return

  // Add user message to chat
  messages.value.push({
    role: 'user',
    content: newMessage.value
  })

  const userMessage = newMessage.value
  newMessage.value = ''
  isTyping.value = true

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://sahaay-ivory.vercel.app/',
        'X-Title': 'Sahaay - Recovery Support App'
      },
      body: JSON.stringify({
        model: 'google/gemini-2.0-flash-lite-preview-02-05:free',
        messages: [
          {
            role: 'system',
            content: `You are a supportive and empathetic AI buddy named Sahaya, helping people overcome their addictions. 
            You should be compassionate, non-judgmental, and encouraging. Focus on:
            1. Active listening and validation of feelings
            2. Providing coping strategies and practical advice
            3. Encouraging professional help when needed
            4. Celebrating progress and small wins
            5. Being supportive during setbacks
            Never give medical advice or replace professional treatment.`
          },
          ...messages.value
        ]
      })
    })

    const data = await response.json()
    
    // Add AI response to chat
    messages.value.push({
      role: 'assistant',
      content: data.choices[0].message.content
    })
  } catch (error) {
    messages.value.push({
      role: 'assistant',
      content: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment."
    })
    console.error('Error:', error)
  } finally {
    isTyping.value = false
  }
}

onMounted(() => {
  // Add welcome message
  messages.value.push({
    role: 'assistant',
    content: "Hi, I'm Sahayak! I'm here to support you on your recovery journey. How are you feeling today?"
  })
})
</script>

<template>
  <div class="chat-container">
    <h2>Chat with Sahayak</h2>
    <div class="chat-messages" ref="chatMessages">
      <div 
        v-for="(message, index) in messages" 
        :key="index"
        :class="['message', message.role]"
      >
        <div class="message-content">
          {{ message.content }}
        </div>
      </div>
      <div v-if="isTyping" class="message assistant">
        <div class="typing-indicator">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
    
    <div class="chat-input">
      <input 
        v-model="newMessage"
        @keyup.enter="sendMessage"
        placeholder="Type your message..."
        :disabled="isTyping"
      />
      <button 
        @click="sendMessage"
        :disabled="isTyping || !newMessage.trim()"
      >
        Send
      </button>
    </div>
  </div>
</template>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  height: calc(100vh - 120px);
  display: flex;
  flex-direction: column;
}

.chat-messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background: #1a1a1a;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.message {
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 12px;
  line-height: 1.4;
}

.message.user {
  align-self: flex-end;
  background: #4CAF50;
  color: white;
}

.message.assistant {
  align-self: flex-start;
  background: #333;
  color: white;
}

.chat-input {
  display: flex;
  gap: 10px;
}

input {
  flex-grow: 1;
  padding: 12px;
  border: none;
  border-radius: 6px;
  background: #1a1a1a;
  color: white;
}

input:focus {
  outline: 1px solid #4CAF50;
}

button {
  padding: 12px 24px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

button:disabled {
  background: #333;
  cursor: not-allowed;
}

.typing-indicator {
  display: flex;
  gap: 4px;
  padding: 8px 12px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  background: #666;
  border-radius: 50%;
  animation: typing 1s infinite ease-in-out;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style>
