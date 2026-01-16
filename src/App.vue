<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'ChartView',
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      // Bar diagram
      Baroptions: {
        chart: {
          id: 'basic-line',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      Barseries: [
        {
          name: 'Series 1',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
      ],

      // Linje diagram
      Lineoptions: {
        chart: {
          id: 'basic-line',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
        markers: {
          size: [5.5],
        },
      },
      Lineseries: [
        {
          name: 'Series 1',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
          name: 'Series 2',
          data: [3, 43, 4, 53, 4, 63, 7, 100],
        },
      ],

      // Cirkeldiagram
      donutOptions: {
        chart: {
          id: 'basic-donut',
        },
        labels: ['donuts', 'pumpkin pies', 'Bananas', 'brownies', 'cakes', 'batman'],
        dataLabels: {
          formatter: (percent, opts) =>
            `${opts.w.globals.series[opts.seriesIndex]} (${percent.toFixed(1)}%)`,
        },
      },

      donutSeries: [34, 41, 84, 53, 60, 1],
      // Bar2 diagram
      Bar2options: {
        chart: {
          id: 'basic-line',
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },
      Bar2series: [
        {
          name: '1',
          data: [30, 40, 45, -50, 49, -60, 70, -91],
        },
        {
          name: '2',
          data: [-3, -4, -4, -5, -4, 6, 7, 9],
        },
        {
          name: '3',
          data: [32, -42, 48, -58, 89, -68, 78, 98],
        },
      ],

      // Bar3 diagram
      Bar3options: {
        chart: {
          id: 'basic-line',
          stacked: true,
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
        },
      },

      Bar3series: [
        {
          name: '1',
          data: [30, 40, 45, 50, 49, 60, 70, 91],
        },
        {
          name: '2',
          data: [3, 4, 4, 5, 4, 6, 7, 9],
        },
        {
          name: '3',
          data: [32, 42, 48, 58, 89, 68, 78, 98],
        },
      ],

      Dotoptions: {
        chart: {
          type: 'scatter',
        },
        xaxis: {
          position: 'top',
        },
      },
      Dotseries: [
        {
          name: 'Punkter',
          data: [
            [1, 2],
            [2, 3],
            [3, 5],
            [4, 6],
            [5, 7],
            [6, 8],
            [2, 6],
            [8, 10],
          ],
        },
      ],
    }
  },
}
</script>

<template>
  <div>
    <apexchart width="500" type="bar" :options="Baroptions" :series="Barseries"></apexchart>
  </div>
  <hr />

  <div>
    <apexchart width="500" type="line" :options="Lineoptions" :series="Lineseries"></apexchart>
  </div>
  <hr />

  <div>
    <apexchart width="500" type="donut" :options="donutOptions" :series="donutSeries"></apexchart>
  </div>
  <hr />

  <div>
    <apexchart width="500" type="bar" :options="Bar2options" :series="Bar2series"></apexchart>
  </div>
  <hr />

  <div>
    <apexchart width="500" type="bar" :options="Bar3options" :series="Bar3series"></apexchart>
  </div>
  <hr />
  <div>
    <apexchart width="500" type="scatter" :options="Dotoptions" :series="Dotseries"></apexchart>
  </div>
</template>
