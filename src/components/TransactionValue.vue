<template>
  <b-card no-body>
    <b-card-header>
      <b-card-title>
        {{ chartOptions.title.text }}
      </b-card-title>
    </b-card-header>
    <highcharts 
      :constructorType="'stockChart'" 
      class="hc" 
      :options="chartOptions"
      ref="transaction"></highcharts>
  </b-card>
</template>

<script>
export default {
  name: 'TransactionValue',
  data() {
    return {
      chartOptions: {
        title: {},
        chart: {
          type: 'line',
          height: 300,
          width: 600
        }
      }
    }
  },
  props: {
    graphData: Object
  },
  watch: {
    graphData: {
      handler: function (newValue) {
        if (newValue) {
          this.drawGraph(newValue)
        }
      },
      deep: true
    }
  },
  methods: {
    drawGraph(newData) {

      this.chartOptions = {
        ...this.chartOptions,
        title: {
          text: newData.name
        },
        series: [
          {
            data: [...newData.data.values]
          }
        ]
      }

      this.$refs.transaction.chart.redraw()
    }
  }
}
</script>

<style></style>
