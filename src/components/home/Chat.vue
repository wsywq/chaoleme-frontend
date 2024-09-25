<template>
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>ChatGPT</span>
    </div>
    <div class="chat-container">
      <div class="messages" ref="messages">
        <div class="placeholder">
          <div class="pulsing-ring"></div>
          <p>等待消息...</p>
        </div>
        <div v-for="(message, index) in chatHistory" :key="index" :class="message.role">
          <div v-if="message.role === 'user'" class="user-message">
            {{ message.content }}
          </div>
          <div v-if="message.role === 'assistant'" class="assistant-message">
            <span v-html="message.content"></span>
          </div>
          <div v-if="message.role === 'loading'" class="assistant-message">
            <div class="typing-indicator">
              <span></span><span></span><span></span>
            </div>
          </div>
        </div>
      </div>
      <div class="input-container">
        <el-input
            v-model="userMessage"
            placeholder="请输入您的问题"
            class="input-new-message"
            @keyup.enter="sendMessage"
        ></el-input>
        <el-button type="primary" @click="sendMessage">发送</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import {ref, reactive, nextTick} from 'vue';
import axios from 'axios';
import {ElCard, ElInput, ElButton} from 'element-plus';

const userMessage = ref('');
const chatHistory = reactive([]);
const apiUrl = 'https://api.alcex.cn/API/gpt-4/';

const scrollToBottom = () => {
  nextTick(() => {
    const messagesContainer = ref(() => document.querySelector('.messages'));
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
};

const sendMessage = async () => {
  if (userMessage.value.trim() === '') return;

  const userMessageContent = userMessage.value.trim();
  chatHistory.push({role: 'user', content: userMessageContent});
  userMessage.value = '';

  const loadingMessage = {role: 'loading', content: ''};
  chatHistory.push(loadingMessage);

  scrollToBottom();

  const payload = {
    messages: [
      {role: 'user', content: userMessageContent}
    ]
  };

  try {
    const response = await axios.get(apiUrl, {params: {messages: JSON.stringify(payload.messages)}});
    if (response.data && response.data.choices && response.data.choices.length > 0) {
      const assistantMessageContent = response.data.choices[0].message.content;
      typingEffect(assistantMessageContent);
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    chatHistory.value = chatHistory.value.filter(message => message.role !== 'loading');
  }
};

const typingEffect = (text) => {
  let index = 0;
  const message = chatHistory.find(msg => msg.role === 'loading');
  message.role = 'assistant';

  const interval = setInterval(() => {
    if (index < text.length) {
      message.content += text[index];
      index++;
      scrollToBottom();
    } else {
      clearInterval(interval);
    }
  }, 50);
};

</script>

<style scoped>
.box-card {
  width: 100%;
  display: flex;
  flex-direction: column;
}

.chat-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 400px;
}

.messages {
  flex: 1;
  overflow-y: auto;
  padding: 10px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  margin-bottom: 10px;
}

.input-container {
  display: flex;
  align-items: center;
}

.input-new-message {
  flex: 1;
  margin-right: 10px;
}

.user-message,
.assistant-message {
  margin-bottom: 10px;
  padding: 8px 12px;
  border-radius: 5px;
}

.user-message {
  background-color: #cce4ff;
  display: inline-block;
}

.assistant-message {
  background-color: #e0e0e0;
  display: inline-block;
}

.typing-indicator {
  display: inline-block;
}

.typing-indicator span {
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 0 2px;
  background-color: #999;
  border-radius: 50%;
  animation: typing 1s infinite;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

.placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #999;
}

.placeholder p {
  margin-top: 10px;
}

.pulsing-ring {
  display: inline-block;
  width: 40px;
  height: 40px;
  border: 3px solid #999;
  border-radius: 50%;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    transform: scale(0.95);
    opacity: 1;
  }
  70% {
    transform: scale(1);
    opacity: 0.7;
  }
  100% {
    transform: scale(0.95);
    opacity: 1;
  }
}

/* 针对移动端的样式 */
@media only screen and (max-width: 768px) {
  .chat-container {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 300px;
  }
}

</style>
