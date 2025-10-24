<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const route = useRoute();
const router = useRouter();

const steps = [
  { name: "start", label: "Your Address", path: "/home-quote/to/address" },
  { name: "application", label: "Application Info", path: "/home-quote/to/applicantion" },
  { name: "property", label: "Property Info", path: "/home-quote/to/property" },
  { name: "discount", label: "Discount Info", path: "/home-quote/to/discounts" },
  { name: "quote", label: "Your Quote", path: "" },
];

const stepmobiles = [
  { name: "start", label: "Your Address", path: "/home-quote/to/address" },
  { name: "application", label: "Application Info", path: "/home-quote/to/applicantion" },
  { name: "property", label: "Property Info", path: "/home-quote/to/property" },
  { name: "discount", label: "Property Info", path: "/home-quote/to/discounts" },
  { name: "quote", label: "Your Quote", path: "" },
];
const currentStep = computed(() => {
  const path = route.path.toLowerCase();
  const step = steps.find((s) => path.includes(s.path.toLowerCase()));
  return step ? step.name : "start";
});

const circleClass = (step) => {
  const index = steps.findIndex((s) => s.name === step);
  const currentIndex = steps.findIndex((s) => s.name === currentStep.value);

  return {
    "step-circle": true,
    active: index === currentIndex,
    completed: index < currentIndex,
  };
};

const goToStep = (stepName) => {
  const step = steps.find((s) => s.name === stepName);
  if (step) {
    router.push(step.path);
  }
};
</script>
<template>
  <div class="col-12 col-md-2 sidebar d-flex flex-column align-items-center justify-content-start py-4">
    <!-- Desktop Sidebar -->
    <div class="step-indicator d-none d-md-flex flex-column align-items-center">
      <template v-for="(step, index) in steps" :key="step.name">
        <div @click="goToStep(step.name)" :class="circleClass(step.name)" style="cursor: pointer;"></div>
        <div class="step-label">{{ step.label }}</div>
        <div v-if="index !== steps.length - 1" class="step-line"></div>
      </template>
    </div>

    <!-- Mobile Stepper -->
    <div class="step-indicator d-flex d-md-none flex-row justify-content-center align-items-center">
      <template v-for="(step, index) in stepmobiles" :key="step.name">
        <div class="text-center mx-1" @click="goToStep(step.name)" style="cursor: pointer;">
          <div :class="circleClass(step.name)"></div>
          <div class="step-label">{{ step.label }}</div>
        </div>
        <div v-if="index !== steps.length - 1" class="step-line mx-1"></div>
      </template>
    </div>
  </div>
</template>
<style>
.side .sidebar {
  border-right: 1px solid #eee;
  height: 100vh;
}
.side .step-indicator {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 40px;
}
.side .step-circle {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 2px solid var(--primary-green);
  background-color: white;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.side .step-circle.active {
  background-color: var(--primary-green);
  color: white;
}
.side .step-circle.completed::after {
  font-family: "Font Awesome 6 Free";
  font-weight: 900;
  color: white;
  font-size: 12px;
}
.side .step-label {
  margin-top: 8px;
  font-weight: 600;
  font-size: 14px;
  color: var(--primary-green);
  text-align: center;
}
.side .step-line {
  height: 40px;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    #ccc,
    #ccc 3px,
    transparent 3px,
    transparent 6px
  );
}
.side .form-control,
.side .form-select {
  border: 2px solid var(--secondary-green);
  border-radius: 30px;
  padding: 12px 20px;
}
.side .form-control:focus,
.side .form-select:focus {
  box-shadow: 0 0 0 0.25rem rgba(75, 227, 172, 0.25);
  border-color: var(--primary-green);
}
.side .form-title {
  font-size: 24px;
  font-weight: 700;
  color: var(--primary-green);
}
.side .form-subtitle {
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}
.side label {
  font-size: 13px;
  margin-bottom: 6px;
  font-weight: 500;
}
@media (max-width: 768px) {
  .side .sidebar {
    border-right: none;
    border-bottom: 1px solid #eee;
    height: auto;
    width: 100%;
    padding: 15px 0;
  }
  .side .step-indicator {
    flex-direction: row;
    justify-content: center;
    gap: 2px;
    margin-top: 0;
  }
  .side .step-line {
    width: 40px;
    height: 2px;
    background: repeating-linear-gradient(
      to right,
      #ccc,
      #ccc 3px,
      transparent 3px,
      transparent 6px
    );
    margin: 10px 10px;
  }
  .side .step-label {
    display: block !important;
    font-size: 12px;
    margin-top: 5px;
    white-space: nowrap;
  }
  .side .step-circle {
    margin-bottom: 0;
  }
}
 </style>
