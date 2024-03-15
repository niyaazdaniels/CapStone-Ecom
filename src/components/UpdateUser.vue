<template>
    <div>
      <button type="button" class="btn" @click="openEditUserModal(user.userID)" data-bs-toggle="modal" :data-bs-target="'#texampleModal' + user.userID">Edit</button>
      <div class="modal fade" :id="'texampleModal' + user.userID" tabindex="-1" :aria-labelledby="'texampleModalLabel' + user.userID" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="texampleModalLabel3">Modal title</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label>userID:</label>
              <input type="text" placeholder="ID" v-model="editingUser.userID" />
              <label>first name:</label>
              <input type="text" placeholder="first name" v-model="editingUser.firstName"/>
              <label>last name:</label>
              <input type="text" placeholder="last name" v-model="editingUser.lastName"/>
              <label>gender:</label>
              <input type="text" placeholder="gender" v-model="editingUser.gender"/>
              <label>user role:</label>
              <input type="text" placeholder="role" v-model="editingUser.userRole"/>
              <label>email address:</label>
              <input type="text" placeholder="email address" v-model="editingUser.emailAdd"/>
              <label>user profile:</label>
              <input type="text" placeholder="profile image" v-model="editingUser.userImage"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn" @click="updateUser(user.userID)">Save changes</button>
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
    background-color: #f7f4f1;
    margin-bottom: 1rem;
    color: black;
  }
  
  input {
    width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
  }
  </style>