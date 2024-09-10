<script>
export default {
  name: "TopNav"
}
</script>

<template>
 <div>
   <div class="nav">
     <div class="logo-wrap">
       <img src="../assets/img/logo.png" alt="" class="logo">
       <h1>胸牌设置</h1>
     </div>

     <div class="header-button-wrap">
       <el-button size="mini" type="primary">Connect</el-button>
       <el-button size="mini" type="danger">Restart</el-button>
     </div>

   </div>
 </div>

</template>

<style scoped>

.nav{
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  height: 100%;

  justify-content: space-between;
  align-items: center;
  .logo-wrap{
    display: flex;
    height: 100%;
    align-items: center;
    .logo{
      display: inline-block;
      width: auto;
      height: 80%;
      margin-right: 10px;
    }
  }
}


</style>
