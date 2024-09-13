<template>
<nav class="navbar navbar-expand-lg ">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">
      <img src="https://amyj0hn.github.io/project-images/images/webchatlogo.png" alt="Logo" style="width:90px;">
    </a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link active" aria-current="page" to="/"><button><i class="bi bi-house-fill"></i></button></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/collaborate"><button><i class="bi bi-people-fill"></i></button></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/messages"><button><i class="bi bi-messenger"></i></button></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/connect"><button><i class="bi bi-person-plus-fill"></i></button></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/feedback"><button><i class="bi bi-chat-right-fill"></i></button></router-link>
        </li>

      </ul>
      
      <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/profile"><button><i class="bi bi-person-circle"></i></button></router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>
</template>

<script>
export default {
    name:  'NavBar'

}
</script>

<style scoped>

.navbar {
  background-color: #2c3e50;
  padding: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.nav-link button {
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  margin: 0 0.5rem;
  padding: 0;
}

.navbar-toggler {
  border-color: rgba(255, 255, 255, 0.5);
}

.navbar-toggler-icon {
  color: white;
}

/* From Uiverse.io by WhiteNervosa */ 
button {
  font-size: 18px;
  color: #e1e1e1;
  font-family: inherit;
  font-weight: 800;
  cursor: pointer;
  position: relative;
  border: none;
  background: none;
  text-transform: uppercase;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: color;
}

button:focus,
button:hover {
  color: #fff;
}

button:focus:after,
button:hover:after {
  width: 100%;
  left: 0%;
}

button:after {
  content: "";
  pointer-events: none;
  bottom: -2px;
  left: 50%;
  position: absolute;
  width: 0%;
  height: 2px;
  background-color: #fff;
  transition-timing-function: cubic-bezier(0.25, 0.8, 0.25, 1);
  transition-duration: 400ms;
  transition-property: width, left;
}

</style>