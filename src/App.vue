<template>
  <div id="app">
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
@import "./assets/styles/global.scss";

* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  overflow: hidden;
}

#app {
  font-family: $font-family;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $primary-color;
  height: 100%;
  background: $secondary-color;
  overflow-y: auto;
}

.slide-enter-active,
.slide-leave-active {
  transition-property: all;
  transition-duration: 0.25s;
}

.slide-enter-active {
  transition-delay: 0.25s;
}

.slide-enter,
.slide-leave-active {
  transform: translate(-100vw);
  position: fixed;
}
</style>
