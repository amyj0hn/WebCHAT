<template>
    <div>
        <router-link to="/" class="back">
                            Back to posts
                        </router-link>
    </div>
    <div v-if="post">
        <PostsLayout>
            <template #PostContent>
                <p>{{ post.content }}</p>
            </template>
            <template #PostImage>
                <div class="postimage">
                    <img :src="post.image_url" alt="post image" style="width:100%" />
                </div>
            </template>
            <template #PostFooter>
                <div class="post-footer">
                    <div class="post-icons-left">
                        <!-- <i class="bi bi-emoji-smile icon-yellow"></i> -->
                        <i class="bi bi-heart icon-gray"></i>
                        <i class="bi bi-chat icon-gray" @click="showCommentForm = true"></i>

                        <div v-if="showCommentForm">
                        <form @submit.prevent="addComment">
                            <input type="text" v-model="newComment" placeholder="Add a comment...">
                            <button type="submit">Comment</button>
                        </form>
                    </div>
                    </div>

                    <div v-if="comments?.length > 0">
                        <div v-for="comment in filteredComments" :key="comment.postID">
                            <p v-if="comment.postID === post.postID">
                            </p>
                            <p>{{ comment.commentText }}</p>
                        </div>
                    </div>
                    <div v-else>
                        <SpinnerComp />
                    </div>


                </div>
            </template>
        </PostsLayout>
    </div>
</template>

<script setup>
import SpinnerComp from '@/components/Spinner.vue'
import PostsLayout from '@/components/PostsLayout.vue'
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useCookies } from 'vue3-cookies'
const {cookies} = useCookies()
const store = useStore()
const route = useRoute()  
const post = computed(
    () => store.state.post
)
const comments = computed(
    () => store.state.comments
)

onMounted(() => {
    store.dispatch('fetchPost', route.params.id)
    store.dispatch('fetchComments', route.params.id)
})

const filteredComments = computed(() => {
  return comments.value.filter(comment => comment.postID === post.value.postID)
})

const showCommentForm = ref(false)
const newComment = ref('')

const addComment = () => {
    if (newComment.value !== '') {
    const userID = store.state.user?.userID || cookies.get('LegitUser')?.result?.userID;
    // const postID = post.value?.postID; 

    console.log(userID);
    

    if (userID) {
      store.dispatch('addComment', {
        postID: post.value.postID,
        commentText: newComment.value,
        userID: userID // Use the correct userID
      });
    newComment.value = ''
    showCommentForm.value = false
  }
}
}

</script>

<style scoped>
.back {
    text-decoration: none;
}
</style>