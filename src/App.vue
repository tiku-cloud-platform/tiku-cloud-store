<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {

    }
  }
}
</script>

<style>
.el-divider--horizontal {
  margin: 19px 0;
}
.button-red-text {
  color: red;
}
.button-blue-text {
  color: #1890ff;
}
.button-warning-text {
  color: #e6a23c;
}
.image-size-require {
  color: red;
}
.input-alter {
    color: red;
}
.show-disable-text {
  color: #e6a23c;
}
</style>
