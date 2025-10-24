<script setup>

import claim from "/src/assets/images/claim/claim.png";
import claim3 from "/src/assets/images/claim/claim3.png";
import claim5 from "/src/assets/images/claim/claim5.png";
import claim4 from "/src/assets/images/claim/claim4.png";
import claim1 from "/src/assets/images/claim/claim1.png";

</script>

<template>

  <section class="py-5 review">
    <div class="container  maxwidth">
      <div class="row align-items-center mb-4">
     
        <div class="col-lg-4 mb-4 mb-lg-0">
          <h2 class="fw-bold mb-3">
            Want To <span class="text-success">Know More?</span>
          </h2>
          <p>
            Whether you prefer to buy online or want expert guidance, Insurify makes it easy to find your perfect
            policy.
          </p>
          <p>
            Whether you prefer to buy online or want expert guidance, Insurify makes it easy to find your perfect
            policy.
          </p>
          <a href="#" class="btn focus-ring btn-outline-success rounded-pill px-4 py-2 mt-3">
            See More
          </a>
        </div>

        <!-- Right Top Cards (2) -->
        <div class="col-lg-8">
          <div class="row g-4">
            <div class="col-sm-6">
              <div class="card border-0 shadow-sm h-100">
                <img :src="claim" class="card-img-top rounded-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title fw-bold">Claims</h5>
                  <p class="card-text">
                    Whether you prefer to buy online or want expert guidance, Insurify makes it easy to find
                  </p>
                </div>
              </div>
            </div>
            <div class="col-sm-6">
              <div class="card border-0 shadow-sm h-100">
                <img :src="claim1" class="card-img-top rounded-top" alt="...">
                <div class="card-body">
                  <h5 class="card-title fw-bold">Claims</h5>
                  <p class="card-text">
                    Whether you prefer to buy online or want expert guidance, Insurify makes it easy to find
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Cards (3) -->
      <div class="row g-4">
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100">
            <img :src="claim3" class="card-img-top rounded-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-bold">Claims</h5>
              <p class="card-text">
                Whether you prefer to buy online or want expert guidance, Insurify makes
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100">
            <img :src="claim4" class="card-img-top rounded-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-bold">Claims</h5>
              <p class="card-text">
                Whether you prefer to buy online or want expert guidance, Insurify makes
              </p>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card border-0 shadow-sm h-100">
            <img :src="claim5" class="card-img-top rounded-top" alt="...">
            <div class="card-body">
              <h5 class="card-title fw-bold">Claims</h5>
              <p class="card-text">
                Whether you prefer to buy online or want expert guidance, Insurify makes
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  
</template>