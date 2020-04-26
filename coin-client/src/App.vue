<template>
  <div id="dashboard">
    <rates-board/>
    <trade-board/>
  </div>
</template>

<script>
  import RatesBoard from "./components/RatesBoard"
  import TradeBoard from "./components/trades/TradeBoard";

  export default {
    name: "Dashboard",
    components: {
      RatesBoard,
      TradeBoard
    }
  };
</script>

<style>
  #dashboard {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
