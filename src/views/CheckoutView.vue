<template>
  <div class="table-responsive">
     <!-- Button trigger modal -->  
  
                     <table class="table table-bordered table-hover table-dark">
                         <thead>
                             <tr>
                                 <th>prodName</th>
                                 <th>quantity</th>
                                 <th>amount</th>
                                 <th>Category</th>
                                 <th>img</th>
                                 
                             </tr>
                         </thead>
                         <tbody>
                             <tr v-for="item in $store.state.carts" :key="item.id">
                                 <td>{{ item.prodName }}</td>
                                 <td>{{ item.quantity }}</td>
                                 <td>R{{ item.amount }}</td>
                                 <td>{{ item.category }}</td>
                                 <td><img :src="item.img" alt="Product Image" id="image" class=" img-fluid"></td>
                                 <td><button class="btnes" @click="deleteproducts(item.id)">delete</button></td>
                             </tr>
                         </tbody>
                     </table>
                 </div>
        
  
   
  
  </template>
  
  <script>
  export default {
    components: {
    },
    computed: {
      getCart() {
        this.$store.dispatch('getCart', $cookies.get('userID'))
      }
    },
    mounted() {
      this.getCart
    }
  }
  </script >
  
  <style scoped >
   body{
      background-color: #363636 !important;
    }
  
  
  
  </style>