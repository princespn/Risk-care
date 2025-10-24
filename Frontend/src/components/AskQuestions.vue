<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

import cta4 from "/src/assets/images/cta4.png";


const faqs = ref([]);

const fetchFAQs = async () => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/vehicle/getfaqs`);
    faqs.value = response.data.map((faq) => ({
      id: faqs.id,
      question: faq.question,
      answer: faq.answer,
      isOpen: false,
      //icon: vuesax_bold_arrow_circle_down1
    }));
  } catch (error) {
    console.error("Error fetching FAQs:", error);
  }
};
const toggleFAQ = (id) => {
  faqs.value = faqs.value.map(faq =>
    faq.id === id ? { ...faq, isOpen: !faq.isOpen } : { ...faq, isOpen: false }
  );
};

onMounted(fetchFAQs);
</script>
<template>


  <div class="py-5 review">
    <div class="container maxwidth">
      <div class="row align-items-start">
        <!-- Left Column: Accordion -->
        <div class="col-lg-6 mb-4 mb-lg-0">
          <h2 class="fw-bold mb-3">
            Frequently <span class="text-success">Asked</span> Questions
          </h2>
          <p class="mb-4">
            Whether you prefer to buy online or want expert guidance, Insurify makes it easy to find your perfect
            policy.
          </p>

          <div class="accordion" id="faqAccordion">
            <!-- Accordion Item 1 -->
            <div class="accordion-item mb-3" v-for="faq in faqs" :key="faq.id">
              <h2 class="accordion-header" id="headingOne">
                <button :class="['accordion-button', { collapsed: !faq.isOpen }]" type="button" @click="toggleFAQ(faq.id)">
                  {{ faq.question }}
                </button>
              </h2>
              <div :class="['accordion-collapse collapse', { show: faq.isOpen }]">
                <div class="accordion-body">
                  {{ faq.answer }}
                </div>
              </div>
            </div>



          </div>



        </div>

        <!-- Right Column: Image -->
        <div class="col-lg-6 text-center">
          <img :src="cta4" alt="FAQ" class="img-fluid  rounded-4 shadow" />
        </div>
      </div>
    </div>
  </div>

</template>
