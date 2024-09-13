<template>
    <div class="search-bar input-group mb-3">
        <input type="text" v-model="searchTerm" placeholder="Search collab" class="search-input" />
        <i class="bi bi-search search-icon"></i>
      </div> 
    <!-- Notification for collab sent -->
    <!-- <div class="collab-request">
        <img alt="Profile picture of Andy Madeline" height="50" src="" width="50" />
        <div class="info">
            <p>
                <span>
                    Andy Madeline
                </span>
                sent you a collaboration request.
            </p>
        </div>
        <div class="actions">
            <button class="accept">
                Accept
            </button>
            <button class="decline">
                Decline
            </button>
        </div>
    </div> -->

    <div class="collaboration-list row" v-if="users">
        <div class="collab col-12 col-sm-6 col-md-4 col-lg-3 mb-4" v-for="user in users" :key="user.userID">
            <Card>
                <template #contentBody>
                    <div class="header text-center">
                        <img :src="user.profile_picture_url" alt="Profile picture" height="80" width="80" />
                    </div>
                    <div class="text-center">
                        <p class="mt-2">{{ user.username }}</p>
                        <span>{{ user.firstName }} {{ user.lastName }}</span>
                        <p class="mt-3">
                            <button v-if="!user.requestSent" @click="requestCollab(user)">Request collab</button>
                            <button v-else disabled>Request sent</button>                        
                        </p>
                    </div>
                </template>
            </Card>
        </div>
    </div>

    <div v-else>
        <SpinnerComp />
    </div>
  </template>

<script setup>
// import MessagesView from '@/views/MessagesView.vue';
import SpinnerComp from '@/components/Spinner.vue';
import Card from '@/components/Card.vue'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
const store = useStore()
const users = computed(
    () => store.state.users
)
onMounted(() => {
    store.dispatch('fetchUsers')
})

const selectedUser = ref(null)

function requestCollab(user) {
  selectedUser.value = user
  // Trigger a message to the user
  // For demonstration purposes, we'll just log a message to the console
  console.log(`Collaboration request sent to ${user.username}`)
  user.requestSent = true
  selectedUser.value = user

}



</script>

<style scoped>
.row{
    margin: 0;
    padding: 0;
}

.search-bar {
    display: flex;
    align-items: center;
    padding: 10px;
}

.search-bar input {
    border: none;
    background: none;
    outline: none;
    color: #8b9dc3;
    font-size: 16px;
    flex: 1;
}

.search-bar i {
    color: #8b9dc3;
    margin-right: 10px;
}

/* .collab-request {
    background-color: white;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ddd;
} */

.collab-request img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
}

.collab-request .info {
    flex: 1;
}

.collab-request .info p {
    margin: 0;
    color: #333;
}

.collab-request .info p span {
    font-weight: bold;
}

.collab-request .actions button {
    border: none;
    padding: 10px 20px;
    margin-left: 10px;
    border-radius: 5px;
    cursor: pointer;
}

.collab-request .actions .accept {
    background-color: #4a90e2;
    color: white;
}

.collab-request .actions .decline {
    background-color: #d3d3d3;
    color: white;
}

/* .collaboration-list {
    justify-content: center;
    align-items: center;
} */

.collab {
    padding: 10px;
    text-align: center;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.collab img {
    border-radius: 50%;
    width: 80px;
    height: 80px;
}

.collab p {
    margin: 10px 0 0;
    color: #8b9dc3;
}

button {
    color: #090909;
    padding: 0.7em 1.7em;
    font-size: 18px;
    border-radius: 0.5em;
    background: #e8e8e8;
    cursor: pointer;
    border: 1px solid #e8e8e8;
    transition: all 0.3s;
    box-shadow: 6px 6px 12px #c5c5c5, -6px -6px 12px #ffffff;
}

button:active {
    color: #666;
    box-shadow: inset 4px 4px 12px #c5c5c5, inset -4px -4px 12px #ffffff;
}
</style>