<template>
  <div class="profile-container">
    <div v-if="user">
      <h1 class="profile-heading fst-italic fw-light">
        WELCOME TO YOUR PROFILE {{ user.firstName }} {{ user.lastName }}
      </h1>
      <div class="row">
        <div class="col-6" data-aos="zoom-in-down">
          <label>PROFILE IMAGE:</label>
          <center>
            <img :src="user.userImage" :alt="user.firstName" loading="lazy" class="img-fluid"/>
          </center>
        </div>
        <div class="col-6" data-aos="zoom-in-down">
          <div class="userinformation">
            <center>
              <label>NAME:</label>
              <p>{{ user.firstName }}</p>
              <br />
              <label>SURNAME:</label>
              <p>{{ user.lastName }}</p>
              <br />
              <label>AGE:</label>
              <p>{{ user.age }}</p>
              <br />
              <label>GENDER:</label>
              <p>{{ user.gender }}</p>
              <br />
              <label>EMAIL:</label>
              <p>{{ user.emailAdd }}</p>
              <br />
              <label>ROLE:</label>
              <p>{{ user.userRole }}</p>
            </center>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <center>
        <button class="logout-button" @click="logout"><i class="fa-solid fa-right-from-bracket"></i></button>
        <button type="button" class="edit-button" @click="openEditModal(thisUser.userID)" data-bs-toggle="modal" :data-bs-target="'#mexampleModal' + editingUser.userID"><i class="fa-regular fa-pen-to-square"></i></button>
        <div class="modal fade" :id="'mexampleModal' + editingUser.userID" tabindex="-1" :aria-labelledby="'mexampleModalLabel' + editingUser.userID" aria-hidden="true">
          <div class="modal-dialog">
            <div class="modal-content">
              <div class="modal-header">
                <h1 class="modal-title fs-5" id="mexampleModalLabel3">Update your information</h1>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div class="modal-body">
                <label>First Name:</label>
                <input type="text" placeholder="First Name" oninvalid="this.setCustomValidity('first name required')" oninput="this.setCustomValidity('')" required v-model="editingUser.firstName"/>
                <label>last name:</label>
                <input type="text" placeholder="Last Name" oninvalid="this.setCustomValidity('last name required')" oninput="this.setCustomValidity('')" required v-model="editingUser.lastName"/>
                <label>Age:</label>
                <input type="text" placeholder="Age" oninvalid="this.setCustomValidity('please enter your age here')" oninput="this.setCustomValidity('')" required v-model="editingUser.age"/>
                <label>Gender:</label>
                <input type="text" placeholder="gender"  oninvalid="this.setCustomValidity('please enter your gender here')"  oninput="this.setCustomValidity('')" required v-model="editingUser.gender"/>
                <label>Email Address:</label>
                <input type="email" placeholder="emailAdd" oninvalid="this.setCustomValidity('please enter email here')" oninput="this.setCustomValidity('')" required v-model="editingUser.emailAdd"/>
                <label>User Image:</label>
                <input type="text" id="test" placeholder="Profile Image" oninvalid="this.setCustomValidity('please insert a profile picture')" oninput="this.setCustomValidity('')" required v-model="editingUser.userImage"/>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn" @click="updateUser(editingUser.userID)">Save changes</button>
              </div>
            </div>
          </div>
        </div>
        <button @click="deleteUser(user.userID)"><i class="fa-regular fa-trash-can"></i></button>
      </center>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editingUser: {
        ...this.thisUser,
      },
      editingUserID: null,
      model: {
        user: {
          firstName: "",
          lastName: "",
          age: "",
          gender: "",
          emailAdd: "",
          userImage: "",
        },
      },
    };
  },
  created() {
    const storedUser = this.$cookies.get('user');
    console.log(storedUser);
    if (storedUser) {
      this.user = storedUser;
      this.$store.commit('setUser', storedUser);
    }
  },
  computed: {
    thisUser() {
      return this.$store.state.user;
    },
  },
  methods: {
    deleteUser(userID) {
      if (confirm('Are you sure you want to delete this user?')) {
        this.$store.dispatch('deleteUser', userID);
        setTimeout(() => {
          location.reload();
        }, 500);
      }
    },
    logout() {
      if (this.$cookies.isKey('user')) {
        this.$cookies.remove('user');
      }
      this.$router.push('/login');
    },
    openEditModal(userID) {
      const data = this.$cookies.get('user');
      if (data) {
        this.editingUser = JSON.parse(JSON.stringify(user));
      }
      this.editingUserID = userID;
    },
    async updateUser(userID) {
      try {
        await this.$store.dispatch('updateUser', {
          userID: userID,
          data: { ...this.editingUser },
        });
        setTimeout(() => {
          location.reload();
        }, 500);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>

<style scoped>
.profile-container {
  top: 65px;
  height: 82vh;
  position: relative;
}
.row {
  margin-bottom: 3rem;
  display: flex !important;
  justify-content: space-between !important;
}
.img-fluid {
  background-color: #7A0000;
  width: 35.5rem;
}

button {
  padding: 0.4rem;
  width: 5rem;
  margin-left: 20px;
  background-color: #7A0000;
  color: white;
  margin-bottom: 1rem;
  outline: none;
  border: none;
}


.btn1 {
  padding: 0.5rem;
  width: 10rem;
  background-color: #7A0000;
  color: white;
  margin-bottom: 1rem;
}

.btn-close {
  padding: 0.5rem;
  width: 4rem;
  background-color: #7A0000;
  color: white;
  margin-bottom: 1rem;
  border-radius: 5rem;
}

.profile-heading {
  margin-top: 2rem;
  margin-bottom: 2rem;
  letter-spacing: 6px;
    
}

p {
  color: black;
  width: 50%;
  height: 2rem;
  font-weight: bolder;
  border-bottom: 1px solid #7A0000;
}

input {
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
}

label {
  font-size: larger;
  color: black;
  letter-spacing: 5px;
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