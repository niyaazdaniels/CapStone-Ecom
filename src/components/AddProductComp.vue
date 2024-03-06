<template>
    <div>
      <!-- Button trigger modal -->
      <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal">Add Product</button>
  
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">New Product</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <label for="productname">Product Name:</label>
              <input required id="productname" placeholder="product Name" type="text" autocomplete="off" v-model="model.product.prodName"/>
              <label for="quantity">Quantity:</label>
              <input required id="quantity" placeholder="quantity" type="number" autocomplete="off" v-model="model.product.quantity"/>
              <label for="price">Price:</label>
              <input required id="price" placeholder="price" type="number" autocomplete="off" v-model="model.product.price"/>
              <label for="category">Category</label>
              <input required id="category" placeholder="category" type="text" autocomplete="off" v-model="model.product.category"/>
              <label for="prodImage">Product Image:</label>
              <input required id="prodImage" placeholder="product image" type="text" autocomplete="off" v-model="model.product.prodImage"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn" @click="addProduct">Save changes</button>
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
        model: {
          product: {
            prodName: "",
            quantity: "",
            price: "",
            category: "",
            prodImage: "",
          },
        },
      };
    },
    methods: {
      addProduct() {
        this.$store.dispatch("addProduct", this.model.product);
      },
    },
  };
  </script>
  
  <style scoped>
  .btn {
    border: 2px solid #7b6651;
    background-color: #f7f4f1;
    margin-bottom: 1rem;
  }
  
  input {
    width: 100%;
    height: 3rem;
    margin-bottom: 2rem;
  }
  </style>