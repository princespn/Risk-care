<!-- To use import this component and pass a visible prop -->

<template>
  <transition name="fade">
    <div v-if="visible" class="overlay">
      <div class="loader">
        <!-- Road + Car Animation -->
        <div class="road-container">
          <div class="road"></div>

          <!-- Car -->
          <div class="car animate-car">
            <!-- Car Body -->
            <div class="car-body"></div>
            <div class="car-top"></div>

            <!-- Wheels -->
            <div class="wheels">
              <div class="wheel animate-wheel"></div>
              <div class="wheel animate-wheel"></div>
            </div>
          </div>
        </div>

        <!-- Loading Text -->
        <p class="loading-text">Loading... Please wait</p>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "CarLoadingOverlay",
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

/* Loader Container */
.loader {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

/* Road */
.road-container {
  position: relative;
  width: 300px;
  height: 100px;
  overflow: hidden;
}
.road {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 20px;
  background: #b2f2bb; /* light green */
  border-radius: 10px;
}

/* Car */
.car {
  position: absolute;
  bottom: 20px;
  left: 0;
  width: 140px;
  height: 60px;
}
.car-body {
  width: 140px;
  height: 40px;
  background: #38a169; /* dark green */
  border-radius: 8px;
}
.car-top {
  position: absolute;
  top: -20px;
  left: 20px;
  width: 100px;
  height: 20px;
  background: #68d391; /* light green */
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

/* Wheels */
.wheels {
  position: absolute;
  bottom: -10px;
  left: 20px;
  display: flex;
  gap: 70px;
}
.wheel {
  width: 30px;
  height: 30px;
  border: 4px solid #22543d;
  border-radius: 50%;
  background: white;
}

/* Animations */
@keyframes drive {
  0% {
    transform: translateX(-150px);
  }
  50% {
    transform: translateX(160px);
  }
  100% {
    transform: translateX(-150px);
  }
}
.animate-car {
  animation: drive 4s ease-in-out infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-wheel {
  animation: spin 0.8s linear infinite;
}

/* Loading Text */
.loading-text {
  color: #2f855a;
  font-size: 18px;
  font-weight: bold;
  animation: pulse 1.5s infinite;
}
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
