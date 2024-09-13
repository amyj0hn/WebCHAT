<template>
  <div class="container-fluid">
    <div class="suggestions-container" v-if="users">
      <div class="suggestions-header">Suggested for you</div>
      <SuggestionLayout v-for="user in users" :key="user.userID">
        <template #UserProfile>
          <img :src="user.profile_picture_url" alt="user-profile" class="img-fluid">
        </template>

        <template #UserName>
          <router-link :to="{ name: 'SingleUser', params: { id: user.userID } }">
            {{ user.username }}
          </router-link>
        </template>
      </SuggestionLayout>
    </div>

    <div v-else>
      <SpinnerComp />
    </div>

  </div>
</template>

<script setup>
import SpinnerComp from '@/components/Spinner.vue'
import SuggestionLayout from '@/components/SuggestionLayout.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
const store = useStore()
const users = computed(
  () => store.state.users
)
onMounted(() => {
  store.dispatch('fetchUsers')
})

</script>

<style scoped>
.container-fluid {
  display: flex;
  justify-content: center;
}

.suggestions-container {
  width: 100%;
  max-width: 500px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
}

.suggestions-header {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 15px;
}

.suggestion-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px 0;
  border-bottom: 1px solid #ddd;
}

.suggestion-item:last-child {
  border-bottom: none;
}

.user-icon {
  width: 40px;
  height: 40px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.user-name {
  flex-grow: 1;
  padding-left: 20px;
  font-size: 16px;
}

.action-icon {
  width: 20px;
  height: 20px;
  background-color: #ddd;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>