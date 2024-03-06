<template>
  <section class="background overflow-x-hidden">
    <section class="container-fluid body-header">
        <div class="container-fluid w-25 heading">
          <div class="container-fluid row position-relative text-white ">
            <h2 class="display-6 fw-medium">About Us</h2>
          </div>
        </div>
    </section>
    <div class="container-fluid content-holder d-inline-flex ">
      <div class="container-fluid ms-auto become-independent-heading d-inline-flex flex-column justify-content-lg-start t-50">
        <h1 class="display-5 text-white fw-medium text-lg-start">Become Independent</h1>
        <p class="text text-white text-start fw-lighter">BSS is an energy solutions company that sells solar panels, generators and  lithium-iron batteries. 
          These are  available as single units, all-in-one or powerful high voltage systems.
           BSS was founded in 2024. <br> 
           Our customers include wholesalers and installers and residential.</p>
           </div>
           <div class="container-fluid me-auto about-us-heading text-end d-inline-flex flex-column justify-content-lg-end">
             <h1 class="display-5 text-white fw-medium text-lg-end"> About Us</h1>
             <p class="text text-white fw-lighter text-end">Founded in 2024 BSS has quickly become a respected player in the ssolar energy market. 
               BSS offers a range of LiFePO4 batteries that comes in carry-case-sized units, All-In-One systems, and High Voltage solutions. 
               BSS service wholesalers, installers and residents , countrywide with plans to have branches located in JHB, KZN, and CPT and to go international.
               BSS is renowned for its Back up technology, which directly addresses the current insecurity of the electricity grid in the Republic of South Africa and the growing demand for backup in the rest of Sub-Saharan Africa. 
               BSS is a carbon-conscious,  agile, and responsive business, run by a team that lives and breathes solar storage.</p>
           </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
.body-header{
  background-image: url(https://i.postimg.cc/pVFPy9LY/Untitled1.png) ;
  min-height: 28vh;
  background-repeat: no-repeat;
  background-size: cover;
}
.background {
  height: 83vh;
  background: linear-gradient(110deg,#232323, grey);
}
.row {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 7vh;
  top: 120px;
  background: #7A0000;
}
.about-us-heading{
  max-width: 600px;
}
.become-independent-heading{
  max-width: 600px;

}
.content-holder{
  top: 80px;
  position: relative;
  display: inline-flex;
  flex-flow: row wrap;
  width: 100vw;
}

@media (max-width: 1024px) {
  .body-header{
    min-height: 21vh;
  }
  .row{
    top: 80px;
  }
  h2{
    font-size: 2rem;
  }
  .background{
    height: 100vh;
  }
}
 @media (max-width: 768px) {
  h2{
    font-size: 1rem;
  }
  .body-header{
    min-height: 15vh;
    top: 50px;
    position: relative;
    background-size: cover;
  }
  .content-holder{
    top: 90px;
  }
  .background{
    height: 98vh;
  }
  .row{
    top: 40px
  }
  .become-independent-heading{
    align-items: start;
  }
 }
 @media (max-width: 426px) {
  .row {
    height: 30px;
    width: 130px;
    top: 20px;
    justify-content: center;
    right: 10px;
  }
  h2{
    font-size: 0.7rem;
  }
  .body-header{
    min-height: 8vh;
    top: 55px;
  }
  p {
    font-size: 14px;
  }
  .become-independent-heading {
    align-self: start;
  }
  h1{
    font-size: 22px;
  }
 }
 @media (max-width: 320px) {
  h1{
    font-size: 1rem;
  }
  p {
    font-size: 12px;
  }
  .row{
    justify-content: center;
    align-items: center;
    right: 20px;
    top: 11px ;
  }
  .body-header{
    min-height: 6vh;
    top: 55px;
  }
  .background{
    max-height: 90vh;
  }
 }
</style>