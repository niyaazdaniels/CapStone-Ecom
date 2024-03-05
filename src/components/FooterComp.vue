<template>
    <div class="footer">
        <div class="container">
    <div class="row justify-content-center">
        <div class="col-sm-4 col-md-3 item">
            <h3 class="Contact-Heading">Contact Us</h3>
            <ul>
                <li>Address: <br>
                    20 Worcestershire Crescent <br>
                    Blackmerrow Industrial b
                    Park 1 <br>
                  Cape Town <br>
                  8120

                </li><br>
                <li> Contact: +10 624 2828</li><br>
                <li> Email: enquries@bss.co.za</li>
            </ul>
        </div>
        <div class="col-sm-4 col-md-3 item">
            <img src="https://i.postimg.cc/7Ypccvbj/Screenshot-2023-08-27-155311-removebg-preview.png" loading="lazy" alt="logo" class="logo img-fluid">
        </div>
        <hr>
        <div class="container-fluid">
          <div class="copyright">
              <p class="copyright">Copyright 2024 | Bobs Solar Solutions (PTY) Ltd</p>
          </div>
            <div class="footer-social-icon">
                <span>Follow us</span>
                <br>
                <a href="https://www.facebook.com/" id="media" target="_blank"><img src="https://i.postimg.cc/xj6TkVPw/icons8-facebook-50-1.png" loading="lazy" alt="facebook" class="facebook"></a>
                <a href="https://www.instagram.com/"  id="media" target="_blank"><img src="https://i.postimg.cc/TPbpmNPr/icons8-instagram-50-1.png" loading="lazy" alt="instagram" class="instagram"></a>
                <a href="https://twitter.com/" target="_blank" id="media"><img src="https://i.postimg.cc/Qd9tGY1R/icons8-twitter-50-1.png" loading="lazy" alt="twitter" class="twitter"></a> <br>
            </div>
          </div>
    </div>
</div>

    </div>
        
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
.footer {
    padding:50px 0;
    background:linear-gradient(grey,#292929) !important;
    color:white !important;
    position: fixed;
    width: 100%;
    bottom: 0;
  }

  .footer-social-icon{
    float: right;
  }
  
  #media{
    margin:5px;
  }

  .footer h3 {
    margin-top:0;
    margin-bottom:12px;
    font-weight:bold;
    font-size:16px;
  }
  
  .footer ul {
    padding:0;
    list-style:none;
    line-height:1.4;
    font-size:14px;
    margin-bottom:0;
  }
  .logo{
    width: 20rem;
  }

  .item{
    padding: 1rem;
  }
  .Contact-Heading{
    color: #BD0000;
  }
  
  .footer ul a {
    color: white !important;
    text-decoration:none;
    opacity:0.8;
  }
  
  .footer ul a:hover {
    opacity:1;
    color: #BD0000 !important;
  }
  
  .copyright {
    color: white !important;
    display: inline-flex !important;
    justify-content: center !important;
    align-items: center !important;
    text-align: center !important;
    width: 100%;
  }

 .instagram{
    width: 2rem;
 }

 .facebook{
    width: 2rem;
 }

 .twitter{
  width: 2rem;
 }

 
  
</style>
