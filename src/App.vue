<template>
  <div id="app">
    <main-menu />
    <root-modals />
    <router-view />
  </div>
</template>

<script>
import MainMenu from './components/main-menu/MainMenu';
import RootModals from './components/root-modals/RootModals';


export default {
  name: 'App',
  components: {
    MainMenu,
    RootModals,
  },
};
</script>

<style>
html {
  background: #555555;
}

html, body {
  margin: 0;
  min-height: 100%;
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.scroll-disabled {
  overflow: hidden;
}
</style>
