<template>
    <section class="body overflow-hidden">
        <div class="container-fluid background-header-image">
            <div class="container-fluid inner-text position-relative m-0 ms-auto">
                <h2 class="heading display-6 text-center m-0 me-auto d-flex justify-content-center pt-3">Products</h2>
            </div>
           </div>
  <div class="cards">
    <h1 class="Products-Range">Product Range</h1>
    <form class="d-inline-flex mx-2 w-auto search-button" role="search">
      <input class="form-control" type="search" id="search" placeholder="Search" aria-label="Search" v-model="searchDBProducts" />
    </form>
    <div class="sort-dropdown">
      <label for="sort" class="sortHeading fw-medium">Filter by: </label>
      <select class="sort" v-model="sortBy">
        <option value="default">Default</option>
        <option value="price ">Price</option>
        <option value="category">Category</option>
        <option value="alphabetical">Alphabetical</option>
      </select>
      <button class="btn" @click="sortToggle">
        {{ sort === 'asc' ? 'Ascending' : 'Descending' }}
      </button>
    </div>
    <div class="row row-cols-1 row-cols-sm-3 row-cols-md-3 flex" v-if="products">
      <div class="col flex" v-for="product in filterDBProducts" :key="product" data-aos="zoom-in-down">
        <div class="card flex" id="test">
            <img :src="product.prodImage" class="card-img-top img-fluid " id="image" loading="lazy" :alt="product.prodName" />
          <div class="card-body">
            <div class="title">
              <h5 class="card-title fw-semibold">{{ product.prodName }}</h5>
            </div>
            <div class="card-body overflow-y-hidden  ">
              <h5 class="card-text fs-6 fw-medium overflow-hidden">{{ product.prodDesc }}</h5>
            </div>
            <div class="category">
              <p class="card-text  fw-medium">Category: {{ product.category }}</p>
            </div>
            <div class="amount">
              <p class="card-text fw-medium">Price: R {{ product.price }}</p>
            </div>
            <div class="button">
              <button @click="displayProduct(product.prodID)" class="btn fw-semibold">View Product</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" v-else>
      <SpinnerComp />
    </div>
  </div>
    </section>
</template>

<script>

import SpinnerComp from "../components/SpinnerComp.vue";

export default {

  components: {

    SpinnerComp,

  },
  computed: {

    products() {

      return this.$store.state.products;

    },

    filterDBProducts() {

  let filter = this.products;

  if (this.searchDBProducts !== '') {

    const searchQuery = this.searchDBProducts.toLowerCase();

    filter = filter.filter(product => 

      (product.prodName && product.prodName.toLowerCase().includes(searchQuery)) ||

      (product.category && product.category.toLowerCase().includes(searchQuery))

    );
  }

return filter.sort((a, b) => {

  if (this.sortBy === 'price') {

    return (this.sort === 'asc' ? a.price - b.price : b.price - a.price);

  } else if (this.sortBy === 'category') {

    return a.category.localeCompare(b.category) * (this.sort === 'asc' ? 1 : -1);

  } else if (this.sortBy === 'alphabetical') {

    return a.prodName.localeCompare(b.prodName) * (this.sort === 'asc' ? 1 : -1);

  }

  return filter;

});

    },
  },

  mounted() {

    this.$store.dispatch("fetchProducts");

  },

  methods: {

searchDBProducts(e) {

  e.preventDefault();

  this.searchDBProducts = this.searchDBProducts.trim();

},

sortToggle() {

  this.sort = this.sort === 'asc' ? 'desc' : 'asc';

},
    resetSearchTab() {

      this.searchDBProducts = ''

    },

    displayProduct(prodID) {

      const selectedItem = this.products.find(

        (product) => product.prodID === prodID

      );

      this.$store.commit("setSelectedProduct", selectedItem);

      this.$router.push({ name: "SingleProductView", params: { prodID: prodID }});

    }
  },

  data() {

    return {

      searchDBProducts: '', 

      sortBy: "",

      sort: "" 
      
    }

  }
};
</script>

<style scoped>
.background-header-image{
    background-image: url(https://i.postimg.cc/j2yYxd74/PPBG.jpg);
    background-size: cover;
    background-repeat: no-repeat;
    min-height: 25vh;
}
.body {
    min-height: 100vh;
}
.inner-text {
    color: white;
    height: 10vh;
    top: 87px;
    background: #7D0000;
    max-width: 600px;   
}
.heading{
    top: 10px;
}
.sortHeading{
  font-size:17px;
  margin-right: 1.5rem;
}

.sort{
  margin-top: 1rem;
  margin-right: 1rem;
  margin-bottom: 2rem;
  width: 10rem;
  height: 2rem;
  outline: none;
  border-bottom: 2px solid black ;
  transition: ease-in-out all 6s;
}
.flex {
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
}

.search-button{
  display: flex;
  justify-content: center;
  align-items: center;
}

#image {
  aspect-ratio: 1/1;
  width: 10rem;
  height: auto;
  margin-top: .5rem;
  filter: grayscale(100%);
}
#image:hover{
    filter: grayscale(0);
    transform: scale(1.1);
    transition: all ease-in-out .8s;
}

#search{
  width: 12rem;
  display: flex !important;
  justify-content: center !important;
}

.btn {
  border: 2px solid #f7f4f1;
  background-color: #7D0000;
  color: white;
}

.btn:hover {
  background-color: black;
  color: white;
}

.card {
  margin-bottom: 2rem;
  width: 65% !important;
}  

.card-text {
  height: 40px;
  overflow: auto;
}
.title {
  height: 10%;
}
.button {
  height: 10%;
}
.cards{
    position: relative;
    top: 20px;
}
.Products-Range{
    color: black;
    font-style: italic;
}
.row {
  --bs-gutter-x: 0;
  display: flex !important;
  justify-content: space-between !important;
}


/* Media queries for responsive design */

@media screen and (max-width:300px) {
  .card {
    width: 295px !important;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }
  .search-button {
    width: 290px !important;
    display: flex;
    position: relative;
    right: 20px;
  }
  .inner-text{
    height: 8vh;
  }
  .row {
    --bs-gutter-x: 0;
  }
}

@media screen and (max-width:700px) {
  .search-button {
    width: 690px;
  }

  #image {
    width: 15rem;
  }

  .quantity {
    margin-top: .1rem;
    margin-bottom: .5rem;
  }

  .card {
    width: 600px;
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
  }

  .row {
    --bs-gutter-x: 0;
  }
}

@media screen and (min-width: 1592px) {
  .card {
    width: 1591px;
  }

}
</style>