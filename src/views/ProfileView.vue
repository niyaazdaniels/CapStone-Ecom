<template>
  <div v-if="user">
    <div class="profile">
      <div class="single">
        <div class="main container justify-content-center">
          <div class="row justify-content-center">
            <div class="col-md-4 my-5 mt-5 prof">
              <div class="card text-center sidebar">
                <div class="card-body">
                  <img :src="user.userImage" alt="" class="my-5 rounded-4">
                  <div class="card-text">
                    <h3 class="my-4">{{ user.firstName }} {{ user.lastName }}</h3>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 my-5">
              <div class="mx-3">
                <h1 class="profile-heading display-6 fst-italic fw-semibold">Profile</h1>
                <form autocomplete="off" @submit.prevent="updateUser" method="POST">
                  <p>First Name</p>
                  <input class="col-12 my-3" id="Name" type="text" v-model="user.firstName" required>
                  <p>Last Name</p>
                  <input class="col-12 my-3" id="Last Name" type="text" v-model="user.lastName" required>
                  <p>Email Address</p>
                  <input class="col-12 my-3 emailAdd" id="emailAdd" type="text" v-model="user.emailAdd" required>
                  <p>Profile Image</p>
                  <input class="col-12 my-3" id="img" type="text" v-model="user.userImage" required>
                  <p>Password:</p>
                  <input class="col-12 my-3" id="text" type="text" v-model="user.userPass" required>
                  <div class="modal-footer d-flex">
                    <button class="btn logOut text-white" v-if="$cookies.get('jwt')" @click="logOut()"><i class="fa-solid fa-right-from-bracket"></i></button>
                    <button  @click="deleteMyUser(user.userID)" class="btn btn-dark">Delete Profile</button>
                    <button @click="$store.dispatch('updateUser', user)" class="btn btn-dark" id="submit">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <SpinnerComp />
  </div>
</template>


<script>

import SpinnerComp from '@/components/SpinnerComp.vue';

export default {

  components: {

    SpinnerComp

  },


  created() {

    const fetchUser = $cookies.get("user");

    if (fetchUser) {

      this.user = $cookies.get('user')

    }

    const userData = $cookies.get('user')

    if (userData) {

      this.$store.commit("setUser", userData);

    }
  },
  methods: {

    thisUser() {

      return this.$store.state.user;

    }, 

    deleteMyUser(userID){

        this.$store.dispatch('deleteMyUser',userID)

  },

  logOut() {

      this.$store.dispatch("logOut");
    },
  }
}

</script>

<style scoped>

.prof{
    justify-content: center !important;
    border: none;
  }
  .profile{
    background: linear-gradient(-60deg,grey,white);
    justify-content: center;
    align-items: center;
    position: relative;
    margin-top: 19px;
    padding-top: 30px;
    min-height: 80vh;
}
.btn {
  margin-left: 16px;
  background: #7A0000;
  box-shadow: 2px 8px 16px grey;
  border: none;
}
.card{
    max-width: 100%;
    box-shadow: 0px 20px 36px grey;
    border: none;
    top: 50px;
}
.card-body{
    height: 500px;
    background-color: #7A0000;
    color: white;
}
.card-body img{
    width: 190px;
    height: auto;
    border-radius: 40%;
}
p {
  font-size: 16px;
}
input {
  font-size: 14px;
}
.col-8{
    word-wrap: break-word;   
    font-size: 24px;
}
@media screen and (max-width: 300px) {
  .row {
    --bs-gutter-x: 0;
    flex-direction: column;
  }

  .col-6 {
    width: 100%;
  }

  p {
    font-size: small;
    width: 100%;
  }
}

@media screen and (max-width: 700px) {
  .row {
    --bs-gutter-x: 0;
    flex-direction: column;
  }

  .col-6 {
    width: 100%;
  }

  p {
    font-size: small;
    width: 100%;
  }
}
</style>