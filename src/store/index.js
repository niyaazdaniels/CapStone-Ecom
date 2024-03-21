import { createStore } from "vuex"; 

import router from '../router/index.js'

import axios from "axios"; 

import sweet from "sweetalert"

import Swal from "sweetalert2";

axios.defaults.withCredentials = true;

const DB = "https://capstone-ecom.onrender.com/";

export default createStore({

  state: { 

    users: null, 

    user: null ,

    selectedProduct: null, 

    products: null, 

    product: null, 

    LoggedIn: false,

    cart: [],

  },

  getters: {

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

    setCart: (state, cart) => {

      state.cart = cart
      }
    },

  actions: {
    
    // fetch all users function
    async fetchUsers({ commit }) {

      try {

        const res = await axios.get(`${DB}users`);

        commit("setUsers", res.data);

      } catch (e) {

        sweet("Request Failed! Could not retrieve all users!");
      }
    },
    
    // fetch single user function
    async fetchUser(context, user) {

      try {
        
        setTimeout(async () => {

          try {

            const res = await axios.get(`${DB}users/${user.userID}`);

            const fetchedUser = res.data; 

            context.commit("setUser", fetchedUser);
          } catch (error) {

          }
        }, 3000);

      } catch (error) {

        console.error("Error in fetchUser:", error);
      }
    },
    
    // function to fetch all products 
    async fetchProducts({ commit }) {

      try {

        const res = await axios.get(`${DB}products`);

        commit("setProducts", res.data);

      } catch (e) {

        sweet("Request Failed: Could not retrieve products from the database.");
      }
    },

    //fetch a single product function
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
          
          await new Promise(resolve => setTimeout(resolve, 1500));
          
          Swal.fire({

              icon: 'success',

              title: 'Registration Successful!',

              text: 'You can now log in with your credentials. Welcome aboard!',

          });
  
          router.push('/login');
          
          dispatch("fetchUsers");
          
          commit("setUser", res.data.user);

      } catch (error) {

          console.error("Error registering new user:", error.message);
  
          if (error.response) {

              if (error.response.status === 409) {

                  console.error("User already exists:", error.response.data.message);

                  Swal.fire({

                      icon: 'error',

                      title: 'Registration Failed',

                      text: 'A user with this email already exists. Please use a different email or log in.',

                  });

              } else {

                  console.error("Server responded with status:", error.response.status);

                  console.error("Response data:", error.response.data);

                  Swal.fire({

                      icon: 'error',

                      title: 'Registration Failed',

                      text: 'An error occurred while registering. Please try again later.',

                  });
              }

          } else if (error.request) {

              console.error("No response received from server");

              Swal.fire({

                  icon: 'error',


                  title: 'Network Error',

                  text: 'Could not connect to the server. Please check your internet connection and try again.',

              });

          } else {

              console.error("Error:", error.message);

              Swal.fire({

                  icon: 'error',

                  title: 'Unexpected Error',

                  text: 'An unexpected error occurred. Please try again later.',

              });
          }
      }
  },
  
    
    // function to update an existing user
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

    // function to delete a user
    async deleteUser({ commit }, id) {

      try {

        await axios.delete(`${DB}users/${id}`);

        commit("fetchUsers");

        console.log("User deleted successfully");

        sweet("User deleted successfully");

      } catch (e) {

        console.error(e);

        sweet("Request Failed: An error occurred while deleting user.");

      }
    },

    // function to add a new product
    async addProduct({ commit }, payload) {

      try {

        const res = await axios.post(`${DB}products`, payload);

        if (res.data) {

          commit("fetchProducts");

          commit("setProduct", res.data);

          this.$swal({

            title: "Success!",

            text: "Product added successfully",

            icon: "success",

            timer: 2000, 

            buttons: false 

          });

        }

      } catch (e) {

        console.error(e);

        this.$swal("Error", "An error occurred while adding a new product.", "error");

      }
    },

    // update product function
    async updateProduct({ dispatch }, product) {

      try {

        const res = await axios.patch(`${DB}products/${product.prodID}`, product);

        if (res.status === 200) {

          dispatch("fetchProducts");

          sweet("Successfully updated product!");

        } else {

          throw new Error("Failed to update product: " + res.statusText);

        }
      } catch (error) {

        console.error("An error occurred:", error);

        sweet("An error occurred: " + error.message);

      }
    },
    
   // function to delete a product
async deleteProduct({ commit }, prodID) {

  try {

    await axios.delete(`${DB}products/${prodID}`);

    commit("fetchProducts");

    console.log("Product deleted successfully");

    sweet("Product deleted successfully");

  } catch (e) {

    sweet("An error occurred while deleting the product");

  }
},

// login function
async login({ commit }, loginUser) {
  
  try {

    // data
    const { data } = await axios.post(`${DB}login`, loginUser);

    if (data.error) {

      throw new Error(data.error); 
    } 

    // token
    const token = data.token;

    $cookies.set('jwt', token);

    sweet(data.msg);

    // user role
    const [{userRole}] = data.user;

    console.log("User role:", userRole);

    await $cookies.set('userRole', userRole);

    // user data
    const [user] = data.user;

    await $cookies.set('user', user);

    // user email
    let [{emailAdd}] = data.user

    JSON.parse(atob($cookies.get('jwt').split('.')[1])).emailAdd

    $cookies.set('emailAdd', emailAdd)

    // user ID
    let [{userID}] = data.user

    JSON.parse(atob($cookies.get('jwt').split('.')[1])).userID

    $cookies.set('userID', userID)

    let [{cartID}] = data.user

    $cookies.set('cartID', cartID)

    setTimeout(async () => {

      await router.push('/');

      console.log("Redirected successfully");

      commit('setLoggedIn', true);

      window.location.reload();

    }, 3000); 
    
  } catch (error) {

    console.error('Error during login:', error);

    sweet('Error during login: ' + (error.response ? error.response.data.msg : error.message));

}
},

// logout function
async logOut (context) {

  let cookies = $cookies.keys();

  const confirmLogout = await Swal.fire({

      title: 'Are you sure you want to log out?',

      icon: 'warning',

      showCancelButton: true,

      confirmButtonText: 'Yes, Log me out',

      cancelButtonText: 'Cancel'

  });

  if (confirmLogout.isConfirmed) {

      $cookies.remove('jwt');

      $cookies.remove('userRole');

      $cookies.remove('user');

      $cookies.remove('emailAdd');

      $cookies.remove('userID');

      $cookies.remove('cartID');

      await Swal.fire({

          title: 'Logged out successfully!',

          text: 'You will now be redirected to the home page.',
          
          icon: 'success',

          timer: 1500,

          timerProgressBar: true,

          didOpen: () => {

              Swal.showLoading();
          }
      });

      await router.push('/login');

      window.location.reload();

       }

      },

      // delete user profile
  deleteMyUser ({commit}, userID) {

  try {

    axios.delete(`${DB}users/${userID}`);

    let cookies = $cookies.keys();

    $cookies.remove('jwt');

    $cookies.remove('userRole');

    $cookies.remove('user');

    $cookies.remove('emailAdd');

    $cookies.remove('userID');

    $cookies.remove('cartID');

    sweet({

      title: 'Success',

      icon: 'success',

      text: 'User deleted successfully',

      timer: 4000

    });

    setTimeout(() => {

      window.location.assign('/register');

    }, 3000); 

  } catch (e) {

    sweet({

      title: 'Error',

      icon: 'error',

      text: 'Failed to delete user',

      timer: 4000

    });

    window.location.reload();

  }
},

async addToCart({ commit }, payload) {

  try {

    const res = await axios.post(`${DB}cart/${payload.id}?user=${payload.userID}`);

    const data = res.data;

    console.log(data);

    await $cookies.set('setCart', res.data);

    window.location.reload();

  } catch (error) {

    console.error("Error adding to cart:", error);

    Swal.fire({

      icon: 'error',

      title: 'Error',

      text: 'An error occurred while adding to cart. Please try again later.',
      
    });
  }
},



async getCart({ commit  }) {

  try {
    const res = await axios.get(`${DB}cart/${$cookies.get('cartID')}`);

    const data = res.data;

    console.log(data);

    commit('setCart', data);

    if (!data) {

      Swal.fire({

        icon: 'info',

        title: 'No Cart Found',

        text: 'There is no cart associated with this user ID and cart ID.',

      });
    }

  } catch (error) {

    console.error("Error fetching cart:", error);

    Swal.fire({

      icon: 'error',

      title: 'Error',

      text: 'An error occurred while fetching the cart. Please try again later.',

    });
  }
},

async deleteFromCart({commit},cartID){

  let {data} = await axios.delete(DB + '/' + cartID )

  console.log(data);

  window.location.reload()

 }  


    },      

  modules: {

    },
})
