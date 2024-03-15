<template>
    <div>
      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Add User</button>
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel1">New User</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
            <div class="modal-body">
              <label for="firstName">First Name:</label>
              <input required id="firstName" type="text" placeholder="Name" autocomplete="off" v-model="model.user.firstName"/>
              <label for="lastName">Last Name:</label>
              <input required id="lastName" type="text" placeholder="Surname" autocomplete="off" v-model="model.user.lastName"/>
              <label for="userAge">Age:</label>
              <input required id="userAge" type="number" placeholder="Age" autocomplete="off" v-model="model.user.userAge"/>
              <label for="gender">Gender:</label>
              <input required id="gender" type="text" placeholder="Gender" autocomplete="off" v-model="model.user.gender"/>
              <label for="userRole">Role:</label>
              <input required id="userRole" type="text" placeholder="Role" autocomplete="off" v-model="model.user.userRole"/>
              <label for="email">Email Address</label>
              <input required  id="email"  type="text" placeholder="Email" autocomplete="off" v-model="model.user.emailAdd"/>
              <label for="password">Password:</label>
              <input required id="password" type="text" placeholder="Password" autocomplete="off" v-model="model.user.userPass"/>
              <label for="profilePic">Profile Image:</label>
              <input required id="profilePic" type="text" placeholder="Profile Image" autocomplete="off" v-model="model.user.userImage"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn" @click="createNewUser">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        addingUserID: null,
        model: {
          user: {
            firstName: "",
            lastName: "",
            userAge: "",
            gender: "",
            userRole: "",
            emailAdd: "",
            userPass: "",
            userImage: "",
          },
        },
      };
    },
    methods: {
      createNewUser() {

        this.$store.dispatch("registerNewUser", this.model.user);

        console.log(this.model.user);
        
      },
    },
  };
  </script>
  
  <style scoped>
  button {
    background-color: #696201;
    color: white;
    margin-bottom: 1rem;
  }
 
  .btn:hover{
    background: black;
    color: white;
  }
  /* input for filling areas within the modal */
  input {
    width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
  }
  </style>