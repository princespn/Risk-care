<script setup>

import cta1 from "/src/assets/images/cta1.png";

</script>

<template>
  <div class="cta-section">
    <div class="container maxwidth">
      <div class="row align-items-center">

        <!-- Left Image -->
        <div class="col-md-6 text-center mb-4 mb-md-0">
          <img :src="cta1" alt="Insurance" class="cta-img">
        </div>

        <!-- Right Content -->
        <div class="col-md-6">
          <h2 class="fw-bold mb-3">See Your Coverage Options?</h2>
          <p class="text-muted mb-2">Who ever wants to shop for insurance?</p>
          <p class="text-muted mb-4">Calling around for quotes with one, two, or fifty providers?</p>
          <button class="cta-button">Call Now!!!</button>
        </div>

      </div>
    </div>
  </div>
  </template>