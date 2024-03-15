<template>
  <div class="background-card">
    <div class="card" id="card">
      <div v-if="product">
        <h1 class="fw-semibold">{{ product.prodName }}</h1>
        <div>
          <img :src="product.prodImage" :alt="product.prodName" loading="lazy" class="img-fluid" id="image"/>
          <p class="title fw-medium  fs-4">{{ product.prodDesc }}</p>
          <p class="text fs-5">Category: {{ product.category }}</p>
          <div id="quantity" class="quantity fs-5">Quantity: {{ product.quantity }}</div><br>
          <p class="price fs-6">Price: R{{ product.price }}</p>
        </div>
        <button class="cta">
          <span class="hover-underline-animation" @click="addToCart(product.id)">Add to Cart</span>
          <svg id="arrow-horizontal" xmlns="http://www.w3.org/2000/svg" width="30" height="10" viewBox="0 0 46 16">
            <path id="Path_10" data-name="Path 10" d="M8,0,6.545,1.455l5.506,5.506H-30V9.039H12.052L6.545,14.545,8,16l8-8Z" transform="translate(30)"></path>
          </svg>
        </button>
      </div>
      <div v-else>
        <SpinnerComp />
      </div>
    </div>
  </div>
</template>

<script>
import SpinnerComp from "@/components/SpinnerComp.vue";

export default {
  props: ['id'],
  components: {
    SpinnerComp,
  },
  computed: {
    product() {
      return this.$store.state.selectedProduct;
    }
  },
  methods: {
    addToCart(prodID) {
      this.$store.dispatch("addToCart", { prodID: prodID });
    }
  }
}
</script>
  
  <style scoped>
  .background-card {
    height: 83.6vh;
    position: relative;
  }
  #image{
    height: 14rem;
    margin-bottom: 3rem;
  }
  
  .card {
    margin-top: 1rem;
    padding: 2rem;
    margin-bottom: 1rem;
    border: none;
  }
  
  h1 {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  .cta {
  border: none;
  background: none;
  cursor: pointer;
}

.cta span {
  padding-bottom: 7px;
  letter-spacing: 4px;
  font-size: 14px;
  padding-right: 15px;
  text-transform: uppercase;
}

.cta svg {
  transform: translateX(-8px);
  transition: all 0.3s ease;
}

.cta:hover svg {
  transform: translateX(0);
}

.cta:active svg {
  transform: scale(0.9);
}

.hover-underline-animation {
  position: relative;
  color: black;
  padding-bottom: 20px;
}

.hover-underline-animation:after {
  content: "";
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 2px;
  bottom: 0;
  left: 0;
  background-color: #7A0000;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.cta:hover .hover-underline-animation:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

  
  @media (max-width: 300px) {
    #card {
      padding: 1rem;
    }
  }
  
  @media (max-width: 576px) {
    #image {
      width: 100%;
    }
  }
  </style>
  