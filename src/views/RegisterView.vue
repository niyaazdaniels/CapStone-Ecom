<template>
    <div class="body">
        <div class="login-container">
            <h1 class="my-5 head">Sign Up</h1>
            <form @submit.prevent="registerUser" method="POST" class="mx-4 my-5">
                <div class="row">
        <div class="col">
            <p>Name</p>
          <input type="text" class="form-control" v-model="register.firstName" name="firstName" placeholder="Enter Name" aria-label="First name" required="">
        </div>
        <div class="col">
            <p>Surname</p>
          <input type="text" class="form-control" v-model="register.lastName" name="lastName" placeholder="Enter Surname" aria-label="Last name" required="">
        </div>
        <div class="col">
            <p>Gender</p>
          <input type="text" class="form-control" v-model="register.gender" name="lastName" placeholder="Enter Gender" aria-label="Last name" required="">
        </div>
        <div class="col">
            <p>Role</p>
          <input type="text" class="form-control" v-model="register.userRole" name="Role" placeholder="Role" aria-label="Last name" required="">
        </div>
      </div>
      <div class="row">
        <div class="col">
            <p>Email</p>
          <input type="text" class="form-control" v-model="register.userEmail" name="userEmail" placeholder="Enter Email" aria-label="First name" required="">
        </div>
      </div>
      <div class="row">
        <div class="col">
            <p>Password</p>
          <input type="password" class="form-control"  v-model="register.userPass" name="userPass" placeholder="Enter Password" aria-label="Last name" required="">
        </div>
      </div>

<div>
<button type="submit" class="btn text-white reg" value="register" v-on:click="toggle"><span id="logs">Register</span><i class="fa fa-spinner fa-spin" id="icon"></i></button>
</div>

<router-link to="/login"><a href="">Already have an account?</a></router-link>
</form>
            

        
    </div>
        </div>
</template>

<script>
    export default {
        name: 'registerUser',
        data() {
        return {
            register: {
            firstName: "",
            lastName: "",
            gender: "",
            userRole: "",
            userEmail: "",
            userPass: "", 
            }
            
        };
    },
    methods: {
        async registerUser() {
           await this.$store.dispatch("registerUser", this.register);
            this.register.firstName = "";
            this.register.lastName = "";
            this.register.gender = "";
            this.register.role = "";
            this.register.userEmail = "";
            this.register.userPass = "";
            },

        }
    }
    
</script>

<style scoped>

i{
    display: none;
}

.body{
    margin: 0;
    padding: 0;
    background: linear-gradient(-90deg, #232323, grey);
    background-position: center;
    background-size: cover;
    min-height: 100vh;
}

.login-container{
    min-width: 300px;
    max-width: 700px;
    color: white;
    top: 50%;
    left: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    box-shadow: 0px 0px 10px #232323;
}

h1{
    margin: 0;
    padding: 0 0 10px;
    text-align: center;
    font-size: 28px;
}

.login-container p{
    margin: 0;
    padding: 0;
}
::placeholder{
    color: white ;
    font-weight: lighter;
    text-align: center;
}
.login-container form input{
    margin-bottom: 20px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #7A0000;
    outline: none;
    height: 30px;
    color: white;
    border-radius: 0px;
}

.login-container button{
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 0px;
}

.login-container button:hover{
    transition: 0.3s;
    opacity: 80%;
}

.login-container a{
    text-decoration: none;
    color: white;
}

.login-container a:hover{
    color: rgb(198, 191, 191);
    transition: 0.3s;
}

.reg{
    background: #7A0000;
}

@media screen and (width <= 650){
    .login-container{
        width: 70% !important;
    }
}
</style>