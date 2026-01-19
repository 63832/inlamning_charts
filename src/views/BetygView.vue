<script>
import VueApexCharts from 'vue3-apexcharts'

export default {
  components: {
    apexchart: VueApexCharts,
  },
  data() {
    return {
      grades: {
        Matematik: null,
        Svenska: null,
        Engelska: null,
        Biologi: null,
        Fysik: null,
        Kemi: null,
        Geografi: null,
        Historia: null,
        Religion: null,
        Samhällskunskap: null,
        Idrott: null,
        Bild: null,
        Musik: null,
        Slöjd: null,
      },
      options: {
        xaxis: {
          categories: [],
        },
      },
    }
  },
  computed: {
    series() {
      return [
        {
          name: 'Betyg',
          data: Object.values(this.grades),
        },
      ]
    },
  },
  methods: {
    validateGrade(subject, value) {
      if (value === '' || value === null) {
        this.grades[subject] = null
        return
      }
      const numValue = Number(value)
      if (numValue < 4) {
        this.grades[subject] = 4
      } else if (numValue > 10) {
        this.grades[subject] = 10
      } else {
        this.grades[subject] = numValue
      }
    },
  },
  created() {
    this.options.xaxis.categories = Object.keys(this.grades)
  },
}
</script>
<template>
  <apexchart width="500" type="radar" :options="options" :series="series" />

  <div class="inputs">
    <div class="input-row" v-for="(grade, subject) in grades" :key="subject">
      <label>{{ subject }}</label>
      <input
        type="number"
        min="4"
        max="10"
        :value="grades[subject]"
        @input="validateGrade(subject, $event.target.value)"
      />
    </div>
  </div>
</template>
