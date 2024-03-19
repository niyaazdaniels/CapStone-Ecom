<template>
    <section class="container-fluid background overflow-hidden">
            <div class="container-lg row text text-uppercase d-flex  ">
                <h1 class="display-6 fw-bold animate__animated animate__fadeInLeftBig animate__slow">Solar Backup <br> Power Solutions</h1>
                <div class="subtext">
                    <h5 class="text-uppercase fw-semibold  animate__animated animate__fadeInLeftBig  animate__slower ">Find the right setup for you now!</h5>
                    <button class="animate__animated animate__fadeInLeftBig  animate__slower">
                        <span class="circle1"></span>
                        <span class="circle2"></span>
                        <span class="circle3"></span>
                        <span class="circle4"></span>
                        <span class="circle5"></span>
                        <span class="submit">Contact Us</span>
                    </button>
                </div>
            </div>
    </section>
</template>

<script>

import 'animate.css';

export default {

}
</script>

<style scoped>
.background{
    background-image: url(https://i.postimg.cc/3rpQy1Bq/Upscales-ai-1709639906381.webp);
    background-position: center;
    min-height: 85.9vh;
    background-size: cover;
}

.text{
    position: relative;
    width: 450px;
    left: 60px;
    align-items: center;
    height: 70vh;
    color: #FFFFFF;
    top: 60px;
}
/* button Contact Us */
button {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  color: white;
  background-color: #171717;
  padding: 0.6em 2em;
  border: none;
  width: 140px;
  border-radius: 3rem;
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

button span:not(:nth-child(6)) {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 30px;
  width: 40px;
  background-color: #BD0000;
  border-radius: 50%;
  transition: .6s ease;
}

button span:nth-child(6) {
  position: relative;
}

button span:nth-child(1) {
  transform: translate(-3.3em, -4em);
}

button span:nth-child(2) {
  transform: translate(-6em, 1.3em);
}

button span:nth-child(3) {
  transform: translate(-.2em, 1.8em);
}

button span:nth-child(4) {
  transform: translate(3.5em, 1.4em);
}

button span:nth-child(5) {
  transform: translate(3.5em, -3.8em);
}

button:hover span:not(:nth-child(6)) {
  transform: translate(-50%, -50%) scale(4);
  transition: 1.5s ease;
}
  


/* Media queries */
@media (max-width: 480px) {
    .text {
        position: relative;
        width: 360px;
        height: 80vh;
        display: flex;
        align-content: center;
    }
    h1 {
        font-size: 2rem;
    }
}
@media (max-width: 399px) {
    .text {
        position: relative;
        width: 290px;
        align-content: center;
    }
    h1 {
        font-size: 1.6em;
    }
    h5 {
        font-size: 0.9rem;
    }
    button{
        padding: 10px;
    }
}
@media (max-width: 330px) {
    .text {
        position: relative;
        width: 230px;
        align-content: center;
    }
    h1 {
        font-size: 1.3em;
    }
    h5 {
        font-size: 0.7rem;
    }
    button{
        padding: 10px;
    }
}
@media (max-width: 301px) {
    .text {
        position: relative;
        width: 200px;
        align-content: center;
    }
    h1 {
        font-size: 1.3em;
    }
    h5 {
        font-size: 0.7rem;
    }
    button{
        padding: 10px;
    }
}



</style>