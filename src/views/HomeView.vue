<template>
<div class="container-fluid p-4 bg-light">
  <div class="row justify-content-center">
    <div class="col-md-6 col-lg-4 col-xl-3">
      <div class="search-bar input-group mb-3">
        <input type="text" v-model="searchTerm" placeholder="Search posts" class="search-input" />
        <i class="bi bi-search search-icon"></i>
      </div>
    </div>
  </div>

<div class="d-grid justify-content-center" v-if="posts">
  <PostsLayout v-for="post in filteredPosts" :key="post.postID">
    <template #PostContent>
      <p>{{ post.content }}</p>
    </template>
    <template #PostImage>
      <div class="postimage">
        <img :src="post.image_url" alt="post image" style="width:100%" />
        <div class="middle">
    <div class="button">
      <router-link :to="{ name: 'SinglePost', params: { id: post.postID } }">
        <button>Full View</button>
    </router-link>
    </div>
  </div>
      </div>
    </template>
    <template #PostFooter>
      <div class="post-footer">
            <div class="post-icons-left">
              <i class="bi bi-emoji-smile icon-yellow"></i>
              <i class="bi bi-heart icon-gray"></i>
              <i class="bi bi-chat icon-gray"></i>
            </div>
      </div>
    </template>
  </PostsLayout>
</div>

<div v-else>
  <SpinnerComp/>
</div>
  </div>

</template>

<script setup>
import PostsLayout from  '@/components/PostsLayout.vue'
import SpinnerComp from '@/components/Spinner.vue';
import { useStore } from 'vuex'
import { ref, computed, onMounted } from 'vue'
const store = useStore()
const searchTerm = ref('')

const posts = computed(
    () => store.state.posts
)
const filteredPosts = computed(() => {
  return posts.value.filter(posts =>
    posts.content.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
})

onMounted(() => {
    store.dispatch('fetchPosts')
})



</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
  height: 100vh;
  background-color: white;
}


</style>
