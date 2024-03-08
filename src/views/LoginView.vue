<template>
  <section class="login-background">
    <div class="container-fluid login-background-heading position-relative">
        <div class="container login-heading position-relative">
            <h1>Sign In</h1>
        </div>
        <div class="form-container container d-flex justify-content-center align-items-center flex-column position-relative">
            <form class="form" @submit.prevent>
    <div class="header d-flex justify-content-center align-items-center position-relative">Welcome Back</div>
    <div class="inputs d-flex flex-column">
        <input placeholder="Email" class="input fw-light" type="text" required autocomplete="off"  v-model="loginUser.emailAdd" oninvalid="this.setCustomValidity('Please enter your email')"
                    oninput="this.setCustomValidity('')">
        <input placeholder="Password" class="input fw-light" type="password" required autocomplete="off" v-model="loginUser.userPass" oninvalid="this.setCustomValidity('Please enter your password')"
                    oninput="this.setCustomValidity('')">
    <button class="sigin-btn d-flex justify-content-center align-items-center" @click="logIn">Log In</button>
    <p class="signup-link">Don't have an account? <router-link to="/register" class="fw-medium fst-italic">Sign up</router-link></p> 
    </div>
</form>
        </div>
    </div>
  </section>
</template>

<script>
import VueCookies  from 'vue-cookies';
import router from '@/router/index';
export default {
  data() {
    return {
      loginUser: {
        emailAdd: "",
        userPass: "",
      },
    };
  },
  computed: {
    user() {
      return this.$store.state.user;
    },
    logIn() {
      this.$store.dispatch('login')
    },
  },
  methods: {
  },
  beforeCreate() {
    this.$store.dispatch("fetchUsers");
  },
  mounted() {
    console.log(VueCookies.get("RealUser"));
 },
}

</script>

<style scoped>
.login-background{
    height: 100vh;
    background: #1E1E1E;
}
.login-background-heading{
    background-image: url(https://i.postimg.cc/QNPLLcBB/Upscales-ai-1709799664524.webp);
    background-size: cover;
    background-repeat: no-repeat;
    top: 50px;
    height: 150px;
}
.login-heading{
    background: #7A0000;
    color: white;
    top: 53px;
    max-width: 300px;
}
.form-container{
    height: 100vh;
}
.form {
  color: white;
  width: 22rem;
  border-radius: 5px ;
  box-shadow:  0px 0px 2px silver;
}

.header {
  background-color: #7A0000;
  background-image: linear-gradient(to top right,#7A0000,#BD0000);
  margin: 10px;
  overflow: hidden;
  color: #fff;
  height: 7rem;
  letter-spacing: 0;
  line-height: 1.375;
  font-size: 1.9rem;
}

.inputs {
  padding: 1.5rem;
  gap: 1rem;
}
.input {
  border: none;
  border-bottom: 1px solid #7A0000;
  outline: none;
  color: white;
  font-size: .9rem;
  line-height: 1.25rem;
  padding: 0.75rem;
  background-color: transparent;
  width: 100%;
  height: 100%;
}

.input:focus {
  border-bottom: 1px solid #7A0000;
}

.sigin-btn {
  text-transform: uppercase;
  font-size: .75rem;
  line-height: 1rem;
  text-align: center;
  padding: .75rem 1.5rem;
  background-color: #7A0000;
  background-image: linear-gradient(to top right,#7A0000,#BD0000);
  width: 100%;
  outline: 0;
  border: 0;
  color: #fff;
}

.signup-link {
  line-height: 1.5;
  font-size: 0.875rem;
}

.signup-link a, .forget {
    color: #BD0000;
  line-height: 1.5;
  font-size: .875rem;
  margin-left: .25rem;
}

.login-background {
  background: linear-gradient(-45deg, #1E1E1E, rgb(68, 68, 68), #575a59);
  background-size: 400% 400%;
  animation: gradient 5s ease infinite;
  height: 100vh;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
@media (max-width: 433px) {
  .form{
    display: flex;
    left: -15px;
    font-size: 10px;
    max-width: 290px;
  }
  .header{
    display: flex;
    height: 250px;
    flex-direction: column;
    font-size: 12px;
  }
}
@media (max-width: 355px) {
  .form {
    left: 0px;
    display: flex;
    position: relative;
  }
}
</style>