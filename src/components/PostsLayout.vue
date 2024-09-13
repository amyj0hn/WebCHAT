<template>
      <div class="post-container">
        <div class="post-header">
            <slot name="PostContent"></slot>
        </div>
      <div class="post-image">
        <slot name="PostImage"></slot>
      </div>

      <div class="post-footer">
        <slot name="PostFooter"></slot>
      </div>
    </div>
</template>

<script>
export default {
  // data() {
  //   return {
  //     showCommentsSection: false,
  //   };
  // },
  // computed: {
  //   postComments() {
  //     // Assuming you have a getter in your Vuex store for comments
  //     return this.$store.fetchComments(this.postID);
  //   },
  // },
  // methods: {
  //   showComments() {
  //     this.showCommentsSection = !this.showCommentsSection;
  //   },
  // },
};


</script>

<style>

</style>