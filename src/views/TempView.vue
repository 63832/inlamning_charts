<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  name: 'TempView',
  components: { apexchart: VueApexCharts },

  data() {
    return {
      temperatures: {},
      loading: false,
      chartWidth: '100%', // Dynamisk bredd
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
      const isMobile = window.innerWidth <= 768

      return {
        chart: {
          zoom: { enabled: false },
          toolbar: { show: !isMobile }, // Dölj toolbar på mobil
        },
        title: {
          text: 'Max & Min temperatur (°C)',
          style: {
            fontSize: isMobile ? '16px' : '18px',
          },
        },
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
            rotateAlways: isMobile, // Rotera alltid på mobil
            style: {
              fontSize: isMobile ? '10px' : '12px',
            },
          },
        },
        yaxis: {
          title: {
            text: 'Temp (°C)',
            style: {
              fontSize: isMobile ? '12px' : '14px',
            },
          },
          labels: {
            style: {
              fontSize: isMobile ? '10px' : '12px',
            },
          },
        },
        legend: {
          fontSize: isMobile ? '12px' : '14px',
        },
        stroke: {
          width: isMobile ? 2 : 3, // Tunnare linjer på mobil
        },
      }
    },
  },

  async created() {
    await this.fetchTempData()
    this.updateChartWidth()
    window.addEventListener('resize', this.updateChartWidth)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.updateChartWidth)
  },

  methods: {
    updateChartWidth() {
      // Sätt bredd baserat på skärmstorlek
      if (window.innerWidth <= 768) {
        this.chartWidth = '100%'
      } else {
        this.chartWidth = '700'
      }
    },

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
  <div class="temp-container">
    <h2>Temperatur i Mariehamn – senaste 10 dagarna</h2>
    <div v-if="loading" class="loading">Laddar data...</div>
    <div v-else class="chart-wrapper">
      <apexchart :width="chartWidth" type="line" :options="chartOptions" :series="series" />
    </div>
  </div>
</template>

<style scoped>
.temp-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.chart-wrapper {
  width: 100%;
  overflow-x: auto;
}

.loading {
  padding: 2rem;
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .temp-container {
    padding: 0 0.5rem;
  }

  h2 {
    font-size: 1.1rem;
    margin-bottom: 1rem;
  }
}
</style>
