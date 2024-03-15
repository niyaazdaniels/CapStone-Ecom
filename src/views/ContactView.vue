<template>
  <section class="contact-background">
    <div class="contact-heading-background position-relative">
        <div class="container-fluid contact-text position-relative">
            <h1 class="container d-flex ms-auto justify-content-center text-white fw-medium">Get in Touch</h1>
        </div>
    </div>

    <div class="contact-form-section d-flex align-content-center justify-content-end position-relative container-fluid col-10">
        <div class="contact-heading container">
    <h1>Contact Us</h1>
    <p>20 Worcestershire Crescent <br>
       Blackmerrow Industrial
       Park 1
      <br>
      8120
      <br><br>
      Enquiries <span>+10 624 2828</span> <br>
      Tech Support <span>support@bss.co.za</span></p>
</div>
        <form action="https://formspree.io/f/mayrbqgy" method="POST" class="colorful-form container form m-0">
  <div class="form-group">
    <label class="form-label" for="name">Name:</label>
    <input required="Name" placeholder="Enter your name" class="form-input" type="text" >
  </div>
  <div class="form-group">
    <label class="form-label" for="email">Email:</label>
    <input required="Email" placeholder="Enter your email" class="form-input" name="email" id="email" type="email" autocomplete="off">
  </div>
  <div class="form-group">
    <label class="form-label" for="message">Message:</label>
    <textarea required="" placeholder="Enter your message" class="form-input" name="message" id="message"></textarea>
  </div>
  <button class="form-button" type="submit">Submit</button>
</form>
    </div>
  </section>
</template>

<script>
export default {

}
</script>

<style scoped>
.contact-heading-background{
    background-image: url(https://i.postimg.cc/m2yHXpY6/Upscales-ai-1709733984393.webp);
    background-size: cover;
    background-repeat: no-repeat;
    top: 55px;
    height: 15vh;
}
.contact-background{
    height: 100vh;
    background: linear-gradient(-60deg,grey,white);
}
.contact-text{
    top: 35px;
    background: #7A0000;
    height: 40%;
    max-width: 500px;
}
.contact-form-section{
    top: 130px;
    margin: 0;
    padding: 0;
}
.contact-heading{
    position: relative;
}
span{
    color: #7A0000;
}
.colorful-form {
  min-width: 400px;
  max-height: 500px;
  margin: 0 auto;
  padding: 20px;
  background: linear-gradient(-90deg,grey,silver);
  border-radius: 10px;
  outline: none;
  box-shadow: 10px 10px 2em grey;
}

.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
  color: #333;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: none;
  background-color: #fff;
  color: #333;
  border-radius: 5px;
}

textarea.form-input {
  height: 100px;
}

.form-button {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #7A0000;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.form-button:hover {
  background-color: #ff5f59;
}
@media (max-width: 836px){
.contact-form-section{
    left: -10px;
    gap: 100px;
}
h1{
font-size: 1.6rem;
}
p{
    font-size: 16px;
}
}
@media (max-width: 824px) {
    .contact-form-section{
        left: 0px;
    }
}
@media (max-width: 785px) {
    .contact-form-section{
        left: 3.2rem;
    }
}
@media (max-width: 768px) {
    .contact-form-section{
        left: 5rem;
    }
}
@media (max-width: 712px) {
    .contact-form-section{
        flex-direction: row;
        flex-flow: row wrap;
        left: 30px;
        top: 65px;
        gap: 0px;
    }
    .colorful-form{
       font-size: 14px;
       position: relative;
       left: 50px;
    }
    .contact-heading{
        left: 40px  ;
    }
    @media (max-width: 640px) {
        .contact-form-section{
            left: 0px;
        }
    }
    @media (max-width: 598px){
        .contact-form-section{
            left: 0px;
        }
    }
    @media (max-width: 579px) {
        .contact-form-section{
            left: 0px;
        }
    }
    @media (max-width: 490px){
        .contact-form-section{
            left: 2rem;
        }
        .contact-heading{
            left: -10px;
        }
        .colorful-form{
            left: 10px;
            min-width: 350px;
        }
    }
    @media (max-width: 460px) {
        .contact-form-section{
        width: 300px;
          left: 60px;
        }
        .colorful-form{
            position: relative;
            left: 20px;
        }
    }
    @media (max-width: 400px){
        .colorful-form{
            left: 1rem;
        }
        .contact-heading{
            left: -28px;
        }
    }
    @media (max-width: 380px){
        .colorful-form{
            left: 1rem;
            font-size: 12px;
        }
        .contact-heading{
            left: -8px;
        }
        .contact-form-section{
            font-size: 12px;
            width: 290px;
        }
    }
    @media (max-width: 369px){
        .contact-form-section{
            font-size: 10px;
            left: 2.2rem;
        }
        .contact-heading{
            left: 4px;
        }
        .colorful-form{
            left: 35px;
        }
    }
    @media (max-width: 360px) {
        .colorful-form{
            font-size: 10px;
            left: 30px;
        }
    }
    @media (max-width: 355px) {
        .colorful-form{
            font-size: 10px;
            left: 1.7rem;
        }
    }
    @media (max-width: 350px) {
        .colorful-form{
            font-size: 10px;
            left: 1.48rem;
        }
        .contact-form-section{
            left: 2rem;
            max-width: 290px;
        }
        .contact-heading{
            left: -5px;
            font-size: 12px;
        }
    }
    @media (max-width: 335px) {
        .contact-form-section{
            left: 0em;
            max-width: 250px;
        }
        .contact-heading{
            left: 45px;
            font-size: 12px;
        }
        .colorful-form{
            font-size: 10px;
            left: 5.7rem
        }
    }
    @media (max-width: 320px){
        .colorful-form{
            min-width: 300px;
            left: 30px;
        }
        .contact-form-section{
            left: 27px;
        }
        .contact-heading{
            left: 10px;
            font-size: 12px;
        }
    }
    @media (max-width: 300px){
        .contact-form-section{
            left: 45px;
        }
        .colorful-form{
            left: 0.5px;
        }
        .contact-heading{
            left: -20px;
        }
    }
}
</style>