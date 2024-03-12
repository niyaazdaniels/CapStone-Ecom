<template>
  <div>
      <div v-if="user">
      <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" :src=user.userImage><span class="text-black-50">{{ user.firstName }}</span><span> </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Name</label><input type="text" class="form-control" placeholder="Name" value="">{{ user.firstName }}</div>
                    <div class="col-md-6"><label class="labels">Surname</label><input type="text" class="form-control" value="" placeholder="surname">{{ user.lastName }}</div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Email ID</label><input type="text" class="form-control" placeholder="Enter email " value="">{{ user.emailAdd}}</div>
                    <div class="col-md-12"><label class="labels">Gender</label><input type="text" class="form-control" placeholder="Gender" value="">{{ user.gender }}</div>
                    <div class="col-md-12"><label class="labels">Age</label><input type="text" class="form-control" placeholder="Age" value="">{{ user.age }}</div>
                    <div class="col-md-12"><label class="labels">Role</label><input type="text" class="form-control" placeholder="Role" value="">{{ user.userRole }}</div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><label class="labels">Password</label><input type="text" class="form-control" placeholder="password" value="">{{ user.userPass }}</div>
                    <div class="col-md-6"><label class="labels">Image</label><input type="text" class="form-control" value="" placeholder="Image URL"></div>
                </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Save Profile</button></div>
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

    name: 'profile', 
    components: SpinnerComp,
    computed: {
      user() {
        return this.$store.state.user || [];
      }
    },
    methods: {
      logOut() {
        this.$store.dispatch("logOut");
        router.push("/");
      },
      updateUser() {
        this.$store.dispatch('updateUser', this.user);
      }
    }
  }
  </script>

<style scoped>

body {
    background: rgb(99, 39, 120)
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #682773
}

.profile-button:focus {
    background: #682773;
    box-shadow: none
}

.profile-button:active {
    background: #682773;
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}

.labels {
    font-size: 11px
}

.add-experience:hover {
    background: #BA68C8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #BA68C8
}

</style>