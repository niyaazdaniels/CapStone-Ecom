<template>
    <div>
      <div v-if="user">
        <div class="profile-background">
        <div class="profile">
          <div class="single">
            <div class="main container justify-content-center">
              <div class="row justify-content-center">
                <div class="col-md-4 my-5 mt-1 prof">
                  <div class="card text-center sidebar">
                    <div class="card-body">
                      <img :src="user.userImage" alt="" class="my-4">
                      <div class="card-text">
                        <h3 class="my-4">{{ user.firstName }} {{ user.lastName }}</h3>
                        <a href="#" class="logBut bg-white my-3 p-2 px-5" @click="logOut">Log Out</a>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-8 my-5 mt-1 about">
                  <div class=" mx">
                    <h1>Profile</h1>
                    <form autocomplete="off" @submit.prevent="updateUser" method="POST">
                      <p>First Name</p>
                      <input class="col-12 my-3" id="Name" type="text" v-model="user.firstName" required>
                      <p>Last Name</p>
                      <input class="col-12 my-3" id="Surname" type="text" v-model="user.lastName" required>
                      <p>Email Address</p>
                      <input class="col-12 my-3 emailAdd" id="text" type="text" v-model="user.emailAdd" required>
                      <p>Profile Image</p>
                      <input class="col-12 my-3" id="img" type="text" v-model="user.userImage" required>
                      <div class="modal-footer">
                        <button type="submit" class="btn btn-dark" id="submit">Save Changes</button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <SpinnerComp/>
    </div>
</div>
  </template>
  
  <script>
  import SpinnerComp from '../components/SpinnerComp.vue';
  
  export default {

    name: 'Profile', 
    components: { SpinnerComp },
    computed: {
      user() {
        return this.$store.state.user;
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch("logOut");
        router.push("/");
      },
      updateUser() {
        // Dispatch action to update user data
        this.$store.dispatch('updateUser', this.user);
      }
    }, 
    mounted(){
    this.$store.dispatch('fetchUser', this.user)
    }
  }
  </script>

<style scoped>

.profile-background{
    min-height: 100vh;
}
.prof{
    justify-content: center !important;
}
.profile{
    justify-content: center;
    align-items: center;
    margin-top: 130px;
    min-height: 120vh;
}

.card{
    max-width: 100%;
}

.card-body{
    height: 445px;
    background-color: black;
    color: white;
}

.card-body img{
    margin-top: 15px;
    width: 180px;
    height: 180px;
    border-radius: 50%;
}

.logOut{
    margin-top: 30px !important;
}

.about{
    max-width: 100%;
}

.aboutRow{
    padding: 10px;
    border-bottom: 1px solid black;
}

.aboutHead{
    font-size: 20px;
    font-weight: bold;
}

.col-8{
    word-wrap: break-word;   
    font-size: 18px;
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

</style>