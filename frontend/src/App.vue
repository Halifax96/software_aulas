<template>
  <div>
    <div class="header">
      <p>MATRICULAPP</p>
    </div>
    <main>
      <router-view></router-view>
    </main>
    <div class="footer">
      <p>© 2024 ®EsCarlandia S.L., Todos los derechos reservados.</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
    //Login
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.header, header p{
  position: absolute;
  background-color: #333;
  color: #eeeeee;
  font-size: 30px;
  font-weight: bold;
  top:0px;
  left: 0px;
  height: 11wh;
  width: 100vw;
  text-align: center;
}

main{
  position: absolute;
  height: 78wh;
}

.footer, footer p {
  position: absolute;
  background-color: #333;
  color: #eee;
  font-size: 15px;
  bottom: 0px;
  left: 0px;
  width: 100vw;
  text-align: center;
  height: 11wh;
}
</style>
