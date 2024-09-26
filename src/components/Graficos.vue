<template>
    <v-app>
      <v-container>
        <v-row justify="center" style="margin-top: 70px;">
          <v-col cols="12" md="5">
            <v-card class="pa-6" elevation="17" style="width: 90%;">
              <!-- Ajustado el ancho al 90% -->
              <v-card-title class="justify-center">
                <h1 class="text-center mb-8">Ganancias mensuales</h1>
              </v-card-title>
              <v-card-text>
                <bar-chart :chart-data="chartData" />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController } from 'chart.js';
  import axios from "axios";

   import { Bar } from 'vue-chartjs'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, BarController);
  
  export default {
    components: Bar,
    data() {
      return {
       
        alquiler:[],
        chartData: null, // El dato del gráfico ahora es `null` hasta que se obtengan los datos
      };
    },
    methods: {
     
      async ObtenerGrafica() {
        try {
          const response = await axios.get(`${import.meta.env.VITE_APP_API}/alquiler/ganancias-por-mes`);
          this.actividades = response.data;
  
          if (this.actividades.length > 0) {
            // Si hay actividades, genera la gráfica
            this.generarGrafica();
          } else {
            console.warn("No hay actividades para mostrar en la gráfica");
          }
        } catch (error) {
          console.error("Error al obtener las actividades:", error);
        }
      },
  
     
      generarGrafica() {
        if (!this.actividades || this.actividades.length === 0) {
          console.warn("No hay actividades para generar la gráfica");
          return;
        }
  
        // Procesa los datos agrupados por máquina
        const datosPorMaquina = this.actividades.reduce((acumulador, actividad) => {
          const maquinaNombre = actividad.maquina.nombre; 
          if (!acumulador[maquinaNombre]) {
            acumulador[maquinaNombre] = { repeticiones: 0, peso: 0 };
          }
          acumulador[maquinaNombre].repeticiones += actividad.repeticiones; 
          acumulador[maquinaNombre].peso += actividad.peso; 
          return acumulador;
        }, {});
  
        // Crea las etiquetas (nombres de máquinas) y los datos de repeticiones y peso
        const labels = Object.keys(datosPorMaquina);
        const repeticionesData = Object.values(datosPorMaquina).map((dato) => dato.repeticiones);
        const pesoData = Object.values(datosPorMaquina).map((dato) => dato.peso);
  
        // Configuración del gráfico de barras
        this.chartData = {
          labels: labels,
          datasets: [
            {
              label: 'Repeticiones por Máquina',
              backgroundColor: '#36A2EB',
              borderColor: '#36A2EB',
              borderWidth: 1,
              data: repeticionesData,
            },
            {
              label: 'Peso Levantado por Máquina (kg)',
              backgroundColor: '#FF6384',
              borderColor: '#FF6384',
              borderWidth: 1,
              data: pesoData,
            }
          ]
        };
      },
    },
  
    // Obtiene los datos de actividades y máquinas al crear el componente
    created() {
      this.ObtenerActividad();
      this.ObtenerMaquina();
    },
  };
  </script>
  
  <style scoped>
  /* Si necesitas agregar estilos personalizados */
  </style>
  