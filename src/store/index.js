// Importing necessary modules
import { createStore } from "vuex"; 
import router from '../router/index.js'
import axios from "axios"; 
import sweet from "sweetalert"
import Swal from "sweetalert2";
axios.defaults.withCredentials = true;
// URL for the database API
const DB = "https://capstone-ecom.onrender.com/";

// Creating and exporting the Vuex store
export default createStore({
  state: { 
    users: null, 
    user: null ,
    selectedProduct: null, 
    products: null, 
    product: null, 
    LoggedIn: false,
    cart: null,
  },
  getters: {
    getUser: (state) => state.user,
  }, 
  mutations: { 
    setUsers(state, users) {
      state.users = users; 
    },
    setUser(state, user) {
      state.user = user;
    },
    setProducts(state, products) {
      state.products = products; 
    },
    setProduct(state, product) {
      state.product = product;
    },
    setSelectedProduct(state, product) {
      state.selectedProduct = product; 
    },
    setLoggedIn(state, LoggedIn) {
      state.LoggedIn = LoggedIn;
    },
  },
  actions: {
    async fetchUsers({ commit }) {
      try {
        const res = await axios.get(`${DB}users`);
        commit("setUsers", res.data);
      } catch (e) {
        alert("Request Failed! Could not retrieve all users!");
      }
    },
    async fetchUser(context, user) {
      // console.log(user.userID);
      try {
        const res = await axios.get(`${DB}users/${user.userID}`);
        const user = res.data;
        console.log(user);
        context.commit("setUser");
      } catch (error) {
        sweet("Request Failed: Could not retrieve user!");
      }
    },    
    // Action to fetch all products data
    async fetchProducts({ commit }) {
      try {
        const res = await axios.get(`${DB}products`);
        commit("setProducts", res.data);
      } catch (e) {
        sweet("Request Failed: Could not retrieve products from the database.");
      }
    },
    // Action to fetch a single product data
    async fetchProduct({ commit }) {
      try {
        const res = await axios.get(`${DB}products`);
        commit("setProduct", res.data);
      } catch (e) {
        sweet("Requested Failed: Could not fetch product.");
      }
    },
    async registerNewUser({ commit, dispatch }, registerUser) {
      try {
        const res = await axios.post(`${DB}signup`, registerUser);
        if (res.data.success) {
          Swal.fire("Successfully registered, you're being redirected to login page");
          console.log("Response data:", res.data); 
          
          setTimeout(async () => {
            await router.push('/login');
          }, 3000);
    
          dispatch("fetchUsers");
          commit("setUser", res.data.user);
        } else {
          sweet("Response Error: No success message received.");
          console.error("Response data:", res.data);
        }
      } catch (e) {
        sweet("Request Failed: Could not register user.");
        console.error("Error:", e); 
      }
    },
    // Action to update an existing user
    async updateUser({ commit }, payload) {
      try {
        const res = await axios.patch(`${DB}users/${payload.userID}`, payload.data);
        if (res.data) {
          commit("fetchUsers");
          commit("setUser", res.data);
          sweet("Update Successful");
        }
      } catch (e) {
        console.error(e);
        sweet("Request Failed: An error occurred while trying to update the user.");
      }
    },    
    // Action to delete a user
    async deleteUser({ commit }, id) {
      try {
        await axios.delete(`${DB}users/${id}`);
        commit("fetchUsers");
        console.log("User deleted successfully");
      } catch (e) {
        console.error(e);
        sweet("Request Failed: An error occurred while deleting user.");
      }
    },
    // Action to add a new product
    async addProduct({ commit }, payload) {
      try {
        const res = await axios.post(`${DB}products`, payload);
        if (res.data) {
          commit("fetchProducts");
          commit("setProduct", res.data);
        }
      } catch (e) {
        console.error(e);
        sweet("Request Failed: An error occurred while adding a new product.");
      }
    },
    // Action to update an existing product
    async updateProduct({ commit }, payload) {
      try {
        const res  = await axios.patch(`${DB}products/${payload.prodID}`, payload); 
        console.log(res.data);        
        if (res) {
          commit("fetchProducts"); 
          sweet("Successfully updated product!");
        } else {
          throw new Error("Failed to update product");
        }
      } catch (error) {
        sweet("An error occurred:", error);
        console.error("An error occurred: " + error.message);
      }
    },        
   // Action to delete a product
async deleteProduct({ commit }, prodID) {
  try {
    await axios.delete(`${DB}products/${prodID}`);
    commit("fetchProducts");
    console.log("Product deleted successfully");
  } catch (e) {
    sweet("An error occurred while deleting the product");
  }
},
async login({ commit }, loginUser) {
  console.log(loginUser);
  try {
    // data
    const { data } = await axios.post(`${DB}login`, loginUser);
    console.log("Response data:", data); 
    // token
    const token = data.token;
    $cookies.set('jwt', token);
    sweet(data.msg);
    // user role
    let [{userRole}] = data.user;
    console.log("User role:", userRole);
    await $cookies.set('userRole', userRole);
    // user data
    let [{user}] = data.user;
    await $cookies.set('user', user);
    setTimeout(async () => {
      await router.push('/');
      console.log("Redirected successfully"); 
      commit('setLoggedIn', true);
      window.location.reload();
    }, 3000); 
    
  } catch (error) {
    console.error('Error during login:', error); // Log the error
    sweet('Error during login: ' + error.message); 
  }
},
async logOut (context) {
  let cookies = $cookies.keys();
  const confirmLogout = await Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log me out',
      cancelButtonText: 'Cancel'
  });

  if (confirmLogout.isConfirmed) {
      $cookies.remove('jwt');
      $cookies.remove('userRole');
      await Swal.fire({
          title: 'Logged out successfully!',
          text: 'You will now be redirected to the home page.',
          icon: 'success',
          timer: 2000, // Change it to desired time in milliseconds
          timerProgressBar: true,
          didOpen: () => {
              Swal.showLoading();
          }
      });
      await router.push('/');
      window.location.reload();
  }
},

      // async getCart({ commit }, userID) {
      //   try {
      //     const res = await axios.get(`${DB}/cart`, userID);
      //     const data = res.data;
      //     if (data != null) {
      //       commit("setCart", data);
      //     } else {
      //       commit("setCart", null);
      //     }
      //   } catch (error) {
      //     sweet('Error getting cart:', error);
      //   }
      // },
    
      // async addToCart({ commit }, { userID, products }) {
      //   try {
      //     await axios.post(`${DB}users/${userID}cart`, products);
      //     commit("getCart", userID);
      //   } catch (error) {
      //     sweet('Error adding to cart:', error);
      //   }
      // },
    
      // async deleteFromCart({ commit }, { userID, cart }) {
      //   try {
      //     await axios.delete(`${DB}users/${userID}cart/${cart}`);
      //     commit("getCart", userID);
      //   } catch (error) {
      //     sweet('Error deleting from cart:', error);
      //   }
      // },
    
      // async deleteCart({ commit }, userID) {
      //   try {
      //     await axios.delete(`${DB}cart`);
      //     commit("getCart", userID);
      //   } catch (error) {
      //     sweet('Error deleting cart:', error);
      //   }
      // },
      checkAdmin(context) {
        if (context.state.user != null && context.state.user.userRole === "Admin") {
          return true;
        } else {
          return false;
        }
      },
    },      
  modules: {
    },
})