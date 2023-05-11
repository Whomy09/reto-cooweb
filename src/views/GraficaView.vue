<template>
  <div class="">
    <Bar :options="chartOptions" :data="chartData" />
  </div>
</template>

<script lang="ts">
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { useFirestore } from '@/composables/useFirestore'
import type Medicine from '@/interfaces/Medicine'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

const { getCollection } = useFirestore()

export default {
  components: { Bar },
  props: {
    chartId: {
      type: String,
      default: 'bar-chart'
    }
  },
  data() {
    return {
      etiquetas: [], valores: [], chartData: {
         labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true
      }
    }
  },
  async mounted() {
    const response: Medicine[] = await getCollection('medicines');
    response.forEach((e) => {
      this.etiquetas.push(e.name);
      this.valores.push(e.qty);
    });
    this.chartData = {
      labels: this.etiquetas,
      datasets: [
        {label: 'Medicinas', data: this.valores, backgroundColor: '#2898ee'}
      ]
    }
  }
}
</script>

<style scoped></style>
