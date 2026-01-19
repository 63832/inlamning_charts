<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'TempView',
  components: { apexchart: VueApexCharts },

  data() {
    return {
      temperatures: {},
      loading: false,
    }
  },

  computed: {
    series() {
      return [
        {
          name: 'Max temp',
          data: Object.values(this.temperatures).map((t) => t.max),
          color: '#FF0000',
        },
        {
          name: 'Min temp',
          data: Object.values(this.temperatures).map((t) => t.min),
          color: '#0000FF',
        },
      ]
    },

    chartOptions() {
      return {
        chart: { zoom: { enabled: false } },
        title: { text: 'Max & Min temperatur (°C)' },
        xaxis: {
          categories: Object.keys(this.temperatures).map((date) => {
            const d = new Date(date)
            const day = d.getDate()
            const months = [
              'jan',
              'feb',
              'mar',
              'apr',
              'maj',
              'jun',
              'jul',
              'aug',
              'sep',
              'okt',
              'nov',
              'dec',
            ]
            const month = months[d.getMonth()]
            return `${day} ${month}`
          }),
          labels: {
            rotate: -45,
            rotateAlways: false,
          },
        },
        yaxis: {
          title: { text: 'Temp (°C)' },
        },
      }
    },
  },

  async created() {
    await this.fetchTempData()
  },

  methods: {
    async fetchTempData() {
      const url =
        'https://api.open-meteo.com/v1/forecast?latitude=60&longitude=20&past_days=9&daily=temperature_2m_max,temperature_2m_min&timezone=Europe/Mariehamn&forecast_days=0'

      this.loading = true
      try {
        const res = await fetch(url)
        const data = await res.json()

        const dates = data.daily.time.slice(-9)
        const maxTemps = data.daily.temperature_2m_max.slice(-9)
        const minTemps = data.daily.temperature_2m_min.slice(-9)

        const temps = {}
        dates.forEach((day, i) => {
          temps[day] = {
            max: maxTemps[i],
            min: minTemps[i],
          }
        })

        this.temperatures = temps
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        this.loading = false
      }
    },
  },
}
</script>

<template>
  <div>
    <h2>Temperatur i Mariehamn – senaste 10 dagarna</h2>
    <div v-if="loading">Laddar data...</div>
    <apexchart v-else width="700" type="line" :options="chartOptions" :series="series" />
  </div>
</template>
