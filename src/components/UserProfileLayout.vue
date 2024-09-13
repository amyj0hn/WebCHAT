<template>
      <div class="profile-header">
        <div class="profile-picture">
          <slot name="ProfilePicture"></slot>
        </div>
    
        <div class="profile-info">
          <h2 class="user-name">
            <slot name="UserName"></slot>
          </h2>
    
          <p class="user-bio">
            <slot name="UserBio"></slot>
          </p>
    
          <p class="user-age">
            <slot name="UserAge"></slot>
          </p>
    
          <!-- <button class="follow-btn">Follow</button> -->
        </div>
      </div>

</template>

<script>
export default {};
</script>

<style>

</style>
