<template>
  <div class="suggestion-item">
    <div class="user-icon">
      <slot name="UserProfile"></slot>
    </div>
    <div class="user-name">
      <slot name="UserName"></slot>
    </div>
    <div class="action-icon">
      <i class="bi bi-person-plus-fill"></i>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
