<template>
    <div class="row justify-content-center" v-if="user">
        <UserProfileLayout>
            <template #ProfilePicture>
                <img :src="user.profile_picture_url" alt="profile-picture">
            </template>
            <template #UserName>
                <h2>{{ user.username }}</h2>
            </template>
            <template #UserBio>
                <p>{{ user.bio }}</p>
            </template>
            <template #UserAge>
                <p>Age: {{ user.userAge }}</p>
            </template>

        </UserProfileLayout>
    </div>

    <div v-else>
        <SpinnerComp />
    </div>


</template>

<script setup>
import SpinnerComp from '@/components/Spinner.vue'
import UserProfileLayout from '@/components/UserProfileLayout.vue'
import { useStore } from 'vuex'
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const store = useStore()
const route = useRoute()
const user = computed(
    () => store.state.user
)
onMounted(() => {
    store.dispatch('fetchUser', route.params.id)
})

</script>

<style></style>