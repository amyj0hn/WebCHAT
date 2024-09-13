<template>
  <div class="card" id="card">
  <span class="glass"></span>
  
  <div class="cardheader"></div>
  <div class="content">
    <slot name="contentBody"></slot>
  </div>
</div>
</template>

<script>
export default {
    name:  'CardComp',

}
</script>

<style scoped>
/* From Uiverse.io by javierBarroso */ 
.card {
  width: 190px;
  height: 254px;
  background: #171717;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 3px 1px #00000088;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
}

.card .content {
  border-radius: 10px;
  background: #171717;
  width: 186px;
  height: 250px;
  z-index: 1;
  padding: 20px;
  color: white;
  display: flex;
  /* justify-content: center; */
  align-items: center;
            flex-wrap: wrap;
            padding: 10px;
  /* position: relative; */
}

.content::before {
  opacity: 0;
  transition: opacity 300ms;
  content: " ";
  display: block;
  background: #fff5;
  width: 50px;
  height: 50px;
  position: absolute;
  filter: blur(50px);
}

.card:hover .content::before {
  opacity: 1;
}

.card::before {
  opacity: 1;
  content: "";
  position: absolute;
  display: block;
  width: 120px;
  height: 300px;
  transform: rotate(0deg) translateY(50%);
  background: linear-gradient(90deg, #ff2288, transparent);
  transition: opacity 300ms;
  animation: rotation_9018 3000ms infinite linear;
  animation-play-state: paused;
}
.card::after {
  opacity: 1;
  content: "";
  position: absolute;
  display: block;
  width: 120px;
  height: 300px;
  transform: rotate(0deg) translateY(-50%);
  background: linear-gradient(90deg, transparent, #2268ff);
  transition: opacity 300ms;
  animation: rotation_9019 3000ms infinite linear;
  animation-play-state: paused;
}

.card:hover::before {
  opacity: 1;
  animation-play-state: running;
}
.card:hover::after {
  opacity: 1;
  animation-play-state: running;
}

.card:hover .glass {
  opacity: 0;
}

.glass {
  position: absolute;
  content: "";
  display: block;
  width: 190px;
  height: 254px;
  background: #17171733;
  backdrop-filter: blur(50px);
  z-index: 1;
  transition-duration: 0.5s;
}

@keyframes rotation_9018 {
  0% {
    transform: rotate(0deg) translateY(50%);
  }

  100% {
    transform: rotate(360deg) translateY(50%);
  }
}
@keyframes rotation_9019 {
  0% {
    transform: rotate(0deg) translateY(-50%);
  }

  100% {
    transform: rotate(360deg) translateY(-50%);
  }
}


</style>