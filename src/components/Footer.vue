<template>
  <div>
    <footer id="footer" class="">
      <div class="container">
        <div class="copyright">
          &copy; Copyright <strong><span>StreamVault</span></strong>. All Rights Reserved
        </div>
        <div class="credits">
          Designed by <a href="https://bootstrapmade.com/">BootstrapMade</a>
        </div>
      </div>
    </footer>
    <a href="#" class="back-to-top d-flex align-items-center justify-content-center"><b-icon icon="arrow-up"></b-icon></a>
    <script type="application/javascript" src="assets/js/main.js"></script>
  </div>
</template>

<script>
export default{
    name: "FooterComponent",
    props: {
        navItems: Array
    }
}
</script>

<style>
#footer {
  background: #4a5562;
  padding: 0 0 30px 0;
  color: #fff;
  font-size: 14px;
}

#footer .copyright {
  text-align: center;
  padding-top: 30px;
}

#footer .credits {
  padding-top: 10px;
  text-align: center;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.6);
}

#footer .credits a {
  color: rgba(255, 255, 255, 0.6);
  transition: 0.3s;
  font-weight: 600;
}

#footer .credits a:hover {
  color: white;
}

.back-to-top {
  position: fixed;
  visibility: hidden;
  opacity: 0;
  right: 15px;
  bottom: 15px;
  z-index: 996;
  background: var(--button-background-color);
  width: 40px;
  height: 40px;
  border-radius: 4px;
  transition: all 0.4s;
}

.back-to-top {
  color: #fff;
  line-height: 0;
}

.back-to-top:hover {
  background: var(--movie-background-color);
  color: #fff;
}

.back-to-top.active {
  visibility: visible;
  opacity: 1;
}
</style>