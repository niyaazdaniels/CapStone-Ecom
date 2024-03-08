<template>
    <nav class="navbar navbar-expand-lg bg-dark text-uppercase fw-bold navbar-dark fixed-top" id="navbar">
      <div class="container-fluid">
          <a class="navbar-brand">BSS</a>
              <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                       </button>
                          <div class="offcanvas offcanvas-end bg-dark" tabindex="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
                              <div class="offcanvas-header">
                                  <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel"></h5>
                                      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                          </div>
                                              <div class="offcanvas-body ">
                                                  <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
                                              <router-link to="/">Home</router-link> 
                                           <router-link to="/about">About</router-link> 
                                       <router-link to="/products">Products</router-link> 
                                  <router-link to="/contact">Contact</router-link> 
                                  <router-link to="/admin">Admin</router-link> 
                            <router-link to="/login">Login</router-link> 
                        <router-link to="/checkout"><i class="fa-solid fa-cart-arrow-down"></i></router-link> 
                   </ul>
              </div>
          </div>
      </div>
   </nav>
  </template>
  
  <script>
  export default {
  
  }
  </script>
  
  <style>
  nav a{
      text-decoration: none;
      color: white;
      padding-left: 14px;
      font-size: 1rem;
      transition: all ease-in .5s;
    }
    nav{
      letter-spacing: 3px;
    }
    #navbar{
      background:linear-gradient(#232323,rgb(82, 82, 82));
  }
 
  </style>