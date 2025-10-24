<script setup>
import about_img from "/src/assets/images/about-img.png";


</script>
<template>
<div class="" style="background-color: #e9f7f5;">
    <div class="container-fluid maxwidth">
      <div class="row gap-5 justify-content-between align-items-center">
        <!-- Left Image -->
        <div class="col-lg-5 mb-4 mb-lg-0 position-relative">
          <div class="bg-success position-absolute top-0 start-0 w-50 h-100" style="z-index: 0;"></div>
          <div class="position-relative p-3" style="z-index: 1;">
            <img :src="about_img" class="img-fluid p-5" alt="About Us Image" />
          </div>
        </div>

        <!-- Right Text -->
        <div class="col-lg-6 fw-lighter  ">
          <h2 class="fw-bold mb-4">About <span class="text-success">Us</span></h2>
          <p>
            Who ever wants to shop for insurance?<br />
            Calling around for quotes with one, two, or fifty providers?<br />
            No way! We’ve all got better things to do. Thankfully, Riskcare makes it easy.
          </p>
          <p>
            Who ever wants to shop for insurance?<br />
            Calling around for quotes with one, two, or fifty providers?<br />
            No way! We’ve all got better things to do. Thankfully, Riskcare makes it easy.
            Who ever wants to shop for insurance?<br />
            Calling around for quotes with one, two, or fifty providers?<br />
            No way! We’ve all got better things to do. Thankfully, Riskcare makes it easy.
          </p>
          <p class="mt-2">
            Who ever wants to shop for insurance?

          </p>
        </div>
      </div>
    </div>
  </div>
</template>
