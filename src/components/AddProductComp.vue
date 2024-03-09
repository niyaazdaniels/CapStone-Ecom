<template>
  <div>
    <!-- Button trigger modal -->
    <button type="button" class="btn" data-bs-toggle="modal" data-bs-target="#exampleModal1">Add Product</button>

    <!-- Modal -->
    <div class="modal fade" id="exampleModal1" tabindex="-1" aria-labelledby="exampleModal1Label" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="exampleModalLabel">New Product</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <label for="prodName">Product Name:</label>
            <input required id="productname" placeholder="Product Name" type="text" v-model="model.product.prodName"/>
            <label for="quantity">Quantity:</label>
            <input required id="quantity" placeholder="Quantity" type="number" v-model="model.product.quantity"/>
            <label for="description">Description:</label>
            <input required id="description" placeholder="Product Description" type="text" v-model="model.product.prodDesc"/>
            <label for="price">Price:</label>
            <input required id="price" placeholder="Price" type="number" v-model="model.product.price"/>
            <label for="category">Category</label>
            <input required id="category" placeholder="Category" type="text" v-model="model.product.category"/>
            <label for="prodImage">Product Image:</label>
            <input required id="prodImage" placeholder="Product Image" type="text" v-model="model.product.prodImage"/>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn" @click="createProduct"> Save changes </button>
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
          prodDesc: "",
          prodImage: "",
        },
      },
    };
  },
  methods: {
    createProduct() {
      this.$store.dispatch("addProduct", this.model.product);
    },
  },
};
</script>

<style scoped>
.btn {
  border: 2px solid #f7f4f1;
  background-color: #7A0000;
  margin-bottom: 1rem;
  color: white;
}

input {
  width: 100%;
  height: 3rem;
  margin-bottom: 2rem;
}
</style>