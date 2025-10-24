<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

import aconmyinsurence from "/src/assets/images/partner/aconmyinsurence.png";
import aviva from "/src/assets/images/partner/aviva.png";
import wawanesa from "/src/assets/images/partner/wawanesa.png";
import tottengroup from "/src/assets/images/partner/tottengroup.png";
import travelers from "/src/assets/images/partner/travelers.png";
import jevco from "/src/assets/images/partner/jevco.png";






</script>
<template>
<div class="mt-5 maxwidth">
    <div class="container">
      <h2 class="fs-2 fw-bold text-center ">Our <span class="primary-color">Partners</span></h2>

 <nav class="partners-nav m-3 ">
        <ul class="nav flex-wrap justify-content-center">
          <li class="nav-item">
            <a href="#" class="nav-link primary-color fw-bold">Auto</a>
          </li>
          <li class="nav-item text-dark">
            <a href="#" class="nav-link text-dark  text fw-medium">Business & Commercial</a>
          </li>
          <li class="nav-item"> <a href="#" class="nav-link text-dark   text fw-medium">Home</a></li>
          <li class="nav-item">
            <a href="#" class="nav-link text-dark   text fw-medium">Life & Health</a>
          </li>
          <li class="nav-item"> <a href="#" class="nav-link  text-dark   text fw-medium">Travel</a></li>
          <li class="nav-item"> <a href="#" class="nav-link text-dark   text fw-medium">Visitors</a></li>
          <li class="nav-item">
            <a href="#" class="nav-link  text-dark  text fw-medium">Super Visa</a>
          </li>
        </ul>
      </nav>
 


      <!-- Partner Logos Row 1 -->
      <div class="row justify-content-center align-items-center">
        <div class="col-6 col-sm-4 col-md-3 col-lg-3 mb-4">
          <div class="logo-card">
            <img :src="aconmyinsurence" alt="Economical Insurance" class="img-fluid" />
          </div>
        </div>
        <div class="col-6 col-sm-4 col-md-3 col-lg-3 mb-4">
          <div class="logo-card">
            <img :src="aviva" alt="Aviva" class="img-fluid" />
          </div>
        </div>
        <div class="col-6 col-sm-4 col-md-3 col-lg-3 mb-4">
          <div class="logo-card">
            <img :src="wawanesa" alt="Wawanesa Insurance" class="img-fluid" />
          </div>
        </div>
        <div class="col-6 col-sm-4 col-md-3 col-lg-3 mb-4">
          <div class="logo-card">
            <img :src="tottengroup" alt="Totten Group Insurance" class="img-fluid" />
          </div>
        </div>
      </div>

      <!-- Partner Logos Row 2 -->
      <div class="row justify-content-center align-items-center">
        <div class="col-6 col-sm-4 col-md-3 col-lg-3 mb-4">
          <div class="logo-card2">
            <img :src="travelers" alt="Travelers" class="img-fluid" />
          </div>
        </div>
        <div class="col-6 col-sm-4 col-md-3 col-lg-3 mb-4">
          <div class="logo-card2">
            <img :src="jevco" alt="Jevco" class="img-fluid" />
          </div>
        </div>
      </div>
    </div>
  </div>
  </template>