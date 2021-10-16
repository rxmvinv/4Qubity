<template>
  <TransactionValue v-bind:graphData="chartTypes[0]" />
  <NetworkDifficulty v-bind:graphData="chartTypes[2]" />
  <MarketPrice v-bind:graphData="chartTypes[1]" />
</template>

<script>
import MarketPrice from './components/MarketPrice.vue'
import NetworkDifficulty from './components/NetworkDifficulty.vue'
import TransactionValue from './components/TransactionValue.vue'

export default {
  name: 'App',
  data() {
    return {
      chartTypes: [
        {name: 'estimated-transaction-volume'}, 
        {name: 'market-price'}, 
        {name: 'difficulty'}
      ]
    }
  },
  components: {
    MarketPrice,
    NetworkDifficulty,
    TransactionValue
  },
  methods: {
    apiUrl(typeParam) {
      return `https://api.blockchain.info/charts/${typeParam}?format=json&cors=true`
    },
    async dataFetch (url) {
      const response = await fetch(url, {
        method: 'GET', 
        mode: 'cors'
      })
      const extracted = await response.json()
      console.log(extracted)

      return extracted
    }
  },
  watch: {
    chartTypes: {
      handler: function (newValue) {
        console.log(newValue, 'charts data is fetched')
      },
      deep: true
    }
  },
  mounted() {
    this.chartTypes.forEach((tp, indx) => {

      const fullApiPath = this.apiUrl(tp.name)
      
      this.dataFetch(fullApiPath).then(resp => {
        this.chartTypes[indx].data = resp
      }).catch(e => console.error(e))

    })
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

  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
