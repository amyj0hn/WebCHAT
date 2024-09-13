<template>
  <div class="row col-md-6 offset-md-3">
    <div class="col-md-6 offset-md-3">
      <div>
        <div>
          <h3>Login</h3>
        </div>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label>Email</label>
            <input type="text" v-model="payload.email" class="form-control" />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input type="password" v-model="payload.userPassword" class="form-control" />
          </div>

          <div class="my-3">
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>

  <div class="row col-md-6 offset-md-3">

    Don't have an account?
    <router-link to="/register">Sign Up</router-link>
  </div>

</template>

<script>
export default {
  name: 'LogIn',
  data() {
    return {
      payload: {
        email: '',
        userPassword: ''
      }

    }

  },

  methods: {
    handleSubmit() {
      this.$store.dispatch('login', this.payload)
      this.$router.push('/profile')


    }
  }

}

</script>

<style></style>