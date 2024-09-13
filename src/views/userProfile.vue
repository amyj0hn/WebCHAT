<template>
  <div>
    <h2 v-if="user">Hi, {{ user.firstName }} {{ user.lastName }}</h2>
    <h2 v-if="!user">You are not logged in!</h2>
  </div>

    <div class="col-md-6">
      <UserProfileLayout>
        <template #ProfilePicture>
          <div class="user-profile d-flex">
            <img :src="user.profile_picture_url" alt="Profile Picture">
            <i class="bi bi-pencil-square" @click="toggleEditingProfilePicture"></i>
            <form v-if="editingProfilePicture">
              <input type="text" v-model="this.payload.profile_picture_url" @change="handleProfilePictureChange">
              <button @click.prevent="updateProfilePicture">Update Profile Picture</button>
              <button @click.prevent="toggleEditingProfilePicture">Cancel</button>
            </form>
          </div>
        </template>

        <template #UserName>
          <div class="user-name d-flex">
            <h2>{{ user.username }}</h2>
            <form v-if="editingUsername">
              <input type="text" v-model="newUsername">
              <button type="submit" @click.prevent="updateUsername">Update Username</button>
              <button @click.prevent="toggleEditingUsername">Cancel</button>
            </form>
            <i class="bi bi-pencil-square" @click="toggleEditingUsername"></i>
          </div>

        </template>

        <template #UserBio>
          <div class="user-bio d-flex">
            <p>{{ user.bio }}</p>
            <i class="bi bi-pencil-square" @click="toggleEditingBio"></i>
            <form v-if="editingBio">
              <input type="text" v-model="newBio">
              <button type="submit" @click.prevent="updateBio">Update Bio</button>
              <button @click.prevent="toggleEditingBio">Cancel</button>
            </form>
          </div>
        </template>

        <template #UserAge>
          <div class="user-age d-flex">
            <p>Age: {{ user.userAge }}</p>
            <i class="bi bi-pencil-square" @click="toggleEditingAge"></i>
            <form v-if="editingAge">
              <input type="text" v-model="newAge">
              <button type="submit" @click.prevent="updateAge">Update Age</button>
              <button @click.prevent="toggleEditingAge">Cancel</button>
            </form>
          </div>
        </template>
      </UserProfileLayout>
    </div>

    <div class="col-md-6">
      <div class="post-form d-flex">
  <input type="text" v-model="newPost" placeholder="Add post...">
  <i class="bi bi-image" @click="toggleEditingPostImage"></i>
  <form v-if="editingPostImage">
    <input type="file" @change="handlePostImageChange">
    <button @click.prevent="addPost">Post</button>
    <button @click.prevent="toggleEditingPostImage">Cancel</button>
  </form>
  <ul v-if="user.posts">
    <li v-for="post in user.posts" :key="post.id">
      {{ post.content }}
      <img v-if="post.image" :src="post.image" alt="Post Image">
    </li>
  </ul>
</div>
    </div>

</template>

<script>
// import axios from 'axios';
import UserProfileLayout from '@/components/UserProfileLayout.vue'
import { useCookies } from 'vue3-cookies';
import store from '@/store';
const { cookies } = useCookies()

export default {
  name: 'userProfile',
  components: {
    UserProfileLayout
  },

  data() {

    return {
      payload:{
        profile_picture_url : '',
        
      },
      editingProfilePicture: false,
      editingUsername: false,
      editingBio: false,
      editingAge: false,
      newUsername: '',
      newBio: '',
      newAge: '',
      newProfilePicture: null,
      newPost: '',
      newImage: null,
      editingPostImage: false,
    }
  },
  
  computed: {
    user() {
      return this.$store.state.user || cookies.get('LegitUser')?.result;
    },


  },

  mounted() {
    return store.dispatch('fetchUser', this.user.userID)
  },


  methods: {
    toggleEditingProfilePicture() {
      this.editingProfilePicture = !this.editingProfilePicture;
    },
    toggleEditingUsername() {
      this.editingUsername = !this.editingUsername;
    },
    toggleEditingBio() {
      this.editingBio = !this.editingBio;
    },
    toggleEditingAge() {
      this.editingAge = !this.editingAge;
    },
    handleProfilePictureChange(event) {
      this.newProfilePicture = event.target.files[0];
    },
    handleUsernameChange(event) {
      this.newUsername = event.target.value;

    },

    updateProfilePicture() {  
  this.$store.dispatch('updateUser', { id: this.payload.userID ,data: this.payload.profile_picture_url }
)
  .then(() => {
    this.editingProfilePicture = false;
    console.log('Profile picture updated!');
  })
  .catch(err => {
    console.error('Error updating profile picture:', err);
  });
},

    updateUsername() {
      this.$store.dispatch('updateUser', { userID: +this.user.userID, username: this.newUsername })
        .then(() => {
          this.user.username = this.newUsername;
          this.editingUsername = false;
        })
        .catch((error) => {
          console.error(error);
        })
    },
    updateBio() {
      this.$store.dispatch('updateUser', { userID: this.user.userID, bio: this.newBio })
        .then(() => {
          this.user.bio = this.newBio;
          this.editingBio = false;
        })
        .catch((error) => {
          console.error(error);
        })
    },
    updateAge() {
      this.$store.dispatch('updateUser', { userID: this.user.userID, userAge: this.newAge })
        .then(() => {
          this.user.userAge = this.newAge;
          this.editingAge = false;
        })
        .catch((error) => {
          console.error(error);
        })
    },

    toggleEditingPostImage() {
      this.editingPostImage = !this.editingPostImage;
    },

    handlePostImageChange(event) {
      this.newImage = event.target.files[0];
    },

    addPost() {
      const formData = new FormData();
      formData.append('image', this.newImage);
      formData.append('content', this.newPost);

      this.$store.dispatch('addPost', { userID: this.user.userID, formData })
        .then(() => {
          this.user.posts.push({ id: new Date().getTime(), content: this.newPost, image: URL.createObjectURL(this.newImage) });
          this.newPost = '';
          this.newImage = null;
          this.editingPostImage = false;
        })
        .catch((error) => {
          console.error(error);
        })
    },
  }
}
</script>


<style></style>

