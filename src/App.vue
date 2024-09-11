<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  name: "App",
  data() {
    return {


    }
  },
  components: {

  },
  computed: {


  }, methods: {

  }
};
</script>

<style>
html,
body {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  margin: 0;
  background: #FAFBFC;

}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  width: 100%;
  height: 100%;
}

::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background-color: rgba(0, 0, 0, 0.1);
}

::-webkit-scrollbar-thumb {
  background-color: #8F9BB3;
  border-radius: 4px;
}


::-webkit-scrollbar-thumb:hover {
  background-color: rgba(0, 0, 0, 0.7);
}


.custom-drawer-header .drawer-title {
  font-size: 18px;
  color: #333;
}

* {
  box-sizing: border-box
}


</style>
