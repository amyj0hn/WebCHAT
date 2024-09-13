<template>
  <div class="row col-md-6 offset-md-3">
  <div class="col-md-6 offset-md-3">
    <div>
      <div>
        <h3>Sign Up</h3>
      </div>
      <form @submit.prevent="handleSubmit">
        <div class="form-group">
          <label>First Name</label>
          <input type="text" v-model="firstName" class="form-control"/>
        </div>

        <div class="form-group">
          <label>Last Name</label>
          <input type="text" v-model="lastName" class="form-control"/>
        </div>

        <div class="form-group">
          <label>User Name</label>
          <input type="text" v-model="username" class="form-control"/>
        </div>

        <div class="form-group">
          <label>Age</label>
          <input type="number" v-model="userAge" class="form-control"/>
        </div>

        <div class="form-group">
          <label>Email</label>
          <input type="email" v-model="email" class="form-control"/>
        </div>
    
        <div class="form-group">
          <label>Password</label>
          <input type="password" v-model="userPassword" class="form-control"/>
        </div>    
        <div class="my-3">
          <button type="submit" class="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  </div>
</div>

<div class="row col-md-6 offset-md-3">

  Already have an account?
  <router-link to="/login">Login</router-link>
</div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'SignUp',
    data() {
        return{
            firstName:'',
            lastName:'',
            username:'',
            userAge:'',
            email:'',
            userPassword:''
        }
    },
    methods:{
        async handleSubmit(){
            await axios.post('http://localhost:3001/Users/register', {
                firstName: this.firstName,
                lastName: this.lastName,
                username: this.username,
                userAge:this.userAge,
                email: this.email,
                userPassword: this.userPassword
            });
            this.$router.push('/login');   
        }
    }
}
</script>

<style>

</style>