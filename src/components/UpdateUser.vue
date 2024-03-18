<template>
    <div>
      <button type="button" class="btn" @click="openEditUserModal(user.userID)" data-bs-toggle="modal" :data-bs-target="'#texampleModal' + user.userID"><i class="fa-regular fa-pen-to-square"></i></button>
      <div class="modal fade" :id="'texampleModal' + user.userID" tabindex="-1" :aria-labelledby="'texampleModalLabel' + user.userID" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h1 class="modal-title fs-4 text-dark text-white" id="texampleModalLabel3">Edit User</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body bg-dark text-center">
              <label>ID:</label>
              <input type="text" placeholder="ID" v-model="editingUser.userID" />
              <label>First Name:</label>
              <input type="text" placeholder="First Name" v-model="editingUser.firstName"/>
              <label>Last Name:</label>
              <input type="text" placeholder="Last Name" v-model="editingUser.lastName"/>
              <label>Gender:</label>
              <input type="text" placeholder="Gender" v-model="editingUser.gender"/>
              <label>User Role:</label>
              <input type="text" placeholder="Role" v-model="editingUser.userRole"/>
              <label>Email Address:</label>
              <input type="text" placeholder="Email Address" v-model="editingUser.emailAdd"/>
              <label>Profile Image:</label>
              <input type="text" placeholder="Profile Image" v-model="editingUser.userImage"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn bg-dark text-white" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn bg-dark text-white" @click="updateUser(user.userID)">Save changes</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ["user"],
    data() {
      return {

        editingUser: {

          ...this.user,
        },

        editingUserID: null,

        model: {

          user: {

            firstName: "",

            lastName: "",

            userAge: "",

            gender: "",

            userRole: "",

            emailAdd: "",

            userImage: "",
          },
        },
      };
    },

    computed: {
      currentUser() {

        return this.$store.state.user;

      },
    },
    methods: {

      openEditUserModal(id) {

        this.editingUserID = id;

        this.editingUser = {...this.$store.state.users.find((user) => user.userID === id),

        };
      },

      updateUser(id) {

        this.$store.dispatch("updateUser", {userID: id, data: { ...this.editingUser },

          }).then(() => {

            alert("User updated!");

          })
          .catch((err) => {

            alert("Error updating: ", err);

          });
      },
    },
  };
        
  </script>
  
  <style scoped>
  .btn {
    border: 2px solid #f7f4f1;
    background: white;
    margin-bottom: 1rem;
    color: black;
  }
  
  input {
    width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
  }
  </style>