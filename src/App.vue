<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import './assets/styles/global.scss';

* {
  box-sizing: border-box;
}

html, body {
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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: $primary-color;
  }
}
</style>
