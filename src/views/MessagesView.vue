<template>
    <div class="container">
        <div class="sidebar">
           <!-- Search Bar -->
           <div class="search-bar input-group mb-3">
        <input type="text" v-model="searchTerm" placeholder="Search messages" class="search-input" />
        <i class="bi bi-search search-icon"></i>
      </div>      
           <!-- User List -->
           <div class="user-list" v-if="messages" >
            <MessagesLayout v-for="message in filteredMessages" :key="message.recipientID"
            @click="handleMessageClick(message)">
              <template #UserProfile>
                <!-- <p v-if="message.recipientID">ID: {{ message.recipientID }}</p>
                <p>Sender ID {{ message.senderID }}</p> -->
                <img :src="message.profile_picture_url" alt="User Profile Picture">
              </template >
              <template #UserName>
                {{ message.content }}
              </template>
            </MessagesLayout>
           </div>
           <div v-else>
            <SpinnerComp/>
           </div>
         </div>
       
  <div class="row">
    <div class="col-md-12">
        <div class="content-area"  >
          <div class="profile-icon">
            <img v-if="selectedMessage" :src="selectedMessage.profile_picture_url" alt="User Profile Picture">
          </div>
          <div class='message-bubble' style="position: relative; height: 100%;">
            <MessageBubble v-if="selectedMessage" :message="selectedMessage" />
          </div>
        </div>


        <div class="message-input-area" v-if="selectedMessage">
          <div class="row">
            <div class="col-md-9">
              <textarea v-model="newMessage" placeholder="Type a message..." class="message-input" ></textarea>
              </div>
              <div class="col-md-3">
                <button @click="sendMessage">
                  <div class="svg-wrapper-1">
                    <div class="svg-wrapper">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24"
                        height="24"
                      >
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                          fill="currentColor"
                          d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <span>Send</span>
                </button>
              </div>
          </div>
    </div>
    </div> 
  </div>
</div>
</template>

<script setup>
import SpinnerComp  from '@/components/Spinner.vue'
import MessagesLayout  from '@/components/MessagesLayout.vue'
import MessageBubble from '@/components/MessageBubble.vue'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
const store = useStore()
const messages = computed(
    () => store.state.messages,
)

let selectedMessage = ref(null)
const newMessage = ref('')

// Search functionality
const searchTerm = ref('')

const filteredMessages = computed(() => {
  return messages.value.filter(messages =>
    messages.content.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
})


onMounted(() => {
    store.dispatch('fetchMessages', 'fetchMessagesForUser')
}) 

const handleMessageClick = (message) => {
  selectedMessage.value = message
}

const sendMessage = () =>{
  if(newMessage.value.trim() && selectedMessage.value){
    const payload = {
      recipientID: selectedMessage.value.recipientID,
      senderID:  store.state.userID,
      content:  newMessage.value

    }
    store.dispatch('sendMessage', payload)
    newMessage.value = ''
  }

}

</script>

<style scoped>
.container {
  display: flex;
}

.column {
  flex: 50%;
  padding: 10px;
}

.sidebar {
      width: 30%;
      padding: 20px;
      display: flex;
      flex-direction: column;
    }

/* .search-bar {
      background-color: #d0d0d0;
      padding: 10px;
      border-radius: 20px;
      text-align: center;
      margin-bottom: 20px;
      font-size: 18px;
      color: #4c4c4c;
    } */

.user-list {
      flex-grow: 1;
      overflow-y: auto;
      cursor: pointer;
    }

.user-item img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      margin-right: 10px;
    }

.content-area {
      width: 70%;
      background-color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 20px;
    }

.profile-icon img {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid black;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
    }

/* From Uiverse.io by adamgiebl */ 
button {
  font-family: inherit;
  font-size: 20px;
  background: royalblue;
  color: white;
  padding: 0.7em 1em;
  padding-left: 0.9em;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
  cursor: pointer;
}

button span {
  display: block;
  margin-left: 0.3em;
  transition: all 0.3s ease-in-out;
}

button svg {
  display: block;
  transform-origin: center center;
  transition: transform 0.3s ease-in-out;
}

button:hover .svg-wrapper {
  animation: fly-1 0.6s ease-in-out infinite alternate;
}

button:hover svg {
  transform: translateX(1.2em) rotate(45deg) scale(1.1);
}

button:hover span {
  transform: translateX(5em);
}

button:active {
  transform: scale(0.95);
}

@keyframes fly-1 {
  from {
    transform: translateY(0.1em);
  }

  to {
    transform: translateY(-0.1em);
  }
}

/* Media queries */
@media (max-width: 767px) {
  .sidebar {
    width: 100%;
    padding: 20px;
  }
  .content-area {
    display: none;
  }
  .message-input-area {
    display: none;  
  }
}

</style>