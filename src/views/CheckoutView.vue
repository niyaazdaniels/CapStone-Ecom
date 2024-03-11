<template>
    <div class="container-checout">
        <div v-if="user">
        <div v-if="cart">
            <div class="body">
                <div class="container login-checkout-container p-2  animate__animated animate__fadeIn">
                    <h1 class="my-4 head">Checkout</h1>
                    <div class="container">
                        <table class="table">
                        <thead>
                            <tr>
                            <th class="col-6"><h3>Product</h3></th>
                            <th class="col-6"><h3>Price</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="prodRow my-5" v-for="product in cart" :key="product.prodID">
                            <td><img :src="product.prodImage" alt="" class="img"></td>
                            <td class="text-success"><h5 class="my-4">${{ product.price }}</h5></td>
                            <th><button class="btn btn-danger my-3" @click="deleteFromCart(item.id)">Del</button></th>
                            </tr>
                        </tbody>
                        </table>
                    </div>
            </div>
                </div>
        </div>
        <div v-else>
            <div class="body">
                <div class="container login-checkout-container p-2  animate__animated animate__fadeIn">
                    <h1 class="my-4 head">Checkout</h1>
                    <div class="container">
                        <table class="table">
                        <thead>
                            <tr>
                            <th class="col-6"><h3>Product</h3></th>
                            <th class="col-6"><h3>Price</h3></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="prodRow my-5">
                            <td><img :src="product.prodImage" alt="" class="img"></td>
                            <td class="text-success"><h5 class="my-4">{{ product.price }}</h5></td>
                            <th><button class="btn btn-danger my-3" @click="deleteFromCart(item.id)">Del</button></th>
                            </tr>
                        </tbody>
                        </table>
                    </div>
            </div>
        </div>
        </div>
        </div>
        <div v-else>
        <div class="container">
            <div class="row vh-100 d-flex justify-content-center align-content-center">
              <div class="text-center">
                <h2>You are not Logged In<br/>Please Log In</h2>
                  <router-link to="/login"><a class="btn mx-2">Login</a></router-link>
                  <router-link to="/"><a class="btn mx-2">Back to Homepage</a></router-link>
              </div>
            </div>
          </div>
    </div>
    </div>
</template>

<script>
    export default {
        name: 'CheckoutView',
    computed: {
        user() {
            return this.$store.state.user;
        },
        cart() {
            console.log(this.$store.state.cart)
            return this.$store.state.cart
        },
    },

    mounted() {
        this.$store.dispatch("getCart", this.userID)
    },

    methods: {
        deleteFromCart(id) {
          this.$store.dispatch("deleteFromCart", id);
           sweet("Product was deleted");
        },
    }
}
</script>

<style scoped>

.table{ 
    color: white;
    text-align: center;
}
.table th{
    border-style: none;
}
.table td{
    border-style: none;
}
.img{
    height: 70px;
    width: 110px;
}
.body{
    margin: 0;
    padding: 0;
    background-position: center;
    background-size: cover;
    min-height: 90vh;
}
.login-checkout-container{
    background-color: #000;
    color: white;
    top: 30%;
    left: 50%;
    position: absolute;
    transform: translate(-50%,-50%);
    box-sizing: border-box;
    margin-top: 130px;
}

h1{
    margin: 0;
    padding: 0 0 10px;
    text-align: center;
    font-size: 28px;
}

.login-checkout-container p{
    margin: 0;
    padding: 0;
}

.login-checkout-container input{
    width: 100%;
    margin-bottom: 20px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid white;
    outline: none;
    height: 40px;
    color: white;

}

.login-checkout-container button{
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    border-radius: 0px;
}

.login-checkout-container button:hover{
    transition: 0.3s;
    opacity: 80%;
}

.login-checkout-container a{
    text-decoration: none;
    color: white;
}

.login-checkout-container a:hover{
    color: rgb(198, 191, 191);
    transition: 0.3s;
}


.btn{
    border-radius: 0px;
    background: #7A0000;
    color: white;
}

</style>
