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
                    <a href="" class="logBut bg-white my-3 p-2 px-5 rounded-5" @click="logout">Log Out</a>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-8 my-5">
              <div class="mx">
                <h1 class="profile-heading display-6 fst-italic fw-semibold ">Profile</h1>
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
                  <div class="modal-footer">
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
export default {

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
  computed: {
    thisUser() {
      return this.$store.state.user;
    },
  },
    logout() {
      this.$store.dispatch("logOut");
    }
  }

</script>

<style scoped>

.prof{
    justify-content: center !important;
}
.profile{
    justify-content: center;
    align-items: center;
    margin-top: 100px;
    min-height: 80vh;
}

.card{
    max-width: 100%;
}

.card-body{
    height: 500px;
    background-color: #7A0000;
    color: white;
}

.card-body img{
    width: 200px;
    height: 200px;
    border-radius: 20%;
}
.about{
    max-width: 100%;
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
.logBut{
            text-align: center;
            text-decoration: none;
            max-width: 100px !important;
            color: rgb(0, 0, 0);
        }

        .logBut:hover{
            color: rgb(0, 0, 0);
           opacity: 90%;
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