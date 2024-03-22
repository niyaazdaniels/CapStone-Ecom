<template>
  <div class="checkout-background">
    <h1 class="text-white">Checkout</h1>
    <div class="table table-responsive" >
      <table class="table table-bordered table-hover table-dark" >
                       <thead>
                           <tr>
                               <th>Name</th>
                               <th>Quantity</th>
                               <th>Price</th>
                               <th>Category</th>
                               <th>Image</th>
                               <th>Action</th>
                               <th>Total</th>
                           </tr>
                       </thead>
                       <tbody>
                           <tr v-for="product in $store.state.cart" :key="product.prodID">
                               <td data-label="Name">{{ product.prodName }}</td>
                               <td data-label="Quantity">{{ product.quantity }}</td>
                               <td data-label="Price">R {{ product.price }}</td>
                               <td data-label="Category">{{ product.category }}</td>
                               <td data-label="Image"><img :src="product.prodImage" alt= "product.prodName" id="product-image" class=" img-fluid"></td>
                               <td data-label="Actions"><button class="btn" @click="deleteItem(product.prodID)">Delete</button>
                               <button class="btn" @click="deleteItem(product.cartID)">Update</button></td>

                                 <td data-label="Total">{{ product.totalAmount }}</td>
                              </tr>
             </tbody>
          </table>
      </div>
  </div> 
</template>

<script>

export default {

  components: {

  },

  methods: {

    deleteItem(cartID) {

      this.$store.dispatch('deleteFromCart', cartID)

    }
  },
  computed: {

    getCart() {

      this.$store.dispatch('getCart', $cookies.get('userID'))

    }
  },

  mounted() {

    this.getCart

    this.deleteItem
  }
}
</script>

<style>
table {
  padding: 10px;
}
      #product-image{
        height: 50px;
        width: auto;
    } 
    td{
        vertical-align: middle
        ;
    }
 .checkout-background {
  min-height: 80vh;
  position: relative;
  background: linear-gradient(-45deg, #1E1E1E, rgb(68, 68, 68), #575a59, rgb(167, 157, 157));
  background-size: 400% 400%;
  animation: gradient 2s ease infinite;
  margin-top: 55px;

 }
 @keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
 .btn {
  background: #7A0000;
  color: white;
  margin-right: 10px ;
 }
 td{
    font-size: 14px;
    letter-spacing: 2px;
  }
  tr{
    letter-spacing: 2px;
  }
  @media screen and (max-width: 300px) {
    .table {
      min-width: 290px !important;
    }
  }
  @media  (max-width: 980px ) {
table {
  min-width: 700px;
}
.table thead{
  display: none !important;

}

.table, .table tbody, .table tr, .table td{
  display: block !important;
  min-width: 100% !important;
}

.table tr{
  margin-bottom: 20px !important;
}

.table tbody{
  background: white;
  font-size: 12px;

}

.table tbody tr td{
  text-align: right;
  position: relative;
  min-width: 100%;
  font-size: 12px;

}

.table td:before{
  display: block;
  color: white;
  content: attr(data-label) !important;
  text-align: left;
  font-size: 12px;

}

.modal-body p{
  text-align: left;
  font-size: 12px;
}
  }
</style>