<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App"
};
</script>

<style>
html body {
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
}
.page {
  padding: 30px;
  float: right;
}
</style>
