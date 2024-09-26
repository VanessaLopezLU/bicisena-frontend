<template>
  <v-row>
    <v-col cols="3" v-for="bicicleta in bicicletas" :key="bicicleta.id">
      <v-card :color="bicicleta.estado === 'disponible' ? 'green' : 'red'" @click="alquilar(bicicleta)">
        <v-card-title>{{ bicicleta.precio }}</v-card-title>
        <v-card-text>{{ bicicleta.color }}</v-card-text>
        <v-card-text>{{ bicicleta.estado }}</v-card-text>
        <v-card-text>{{ bicicleta.marca.nombre }}</v-card-text>
        <v-card-text>{{ bicicleta.regional.nombre }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import axios from 'axios';


export default {
  data() {

    return {


      bicicletas: [],

      loading: false,
      error: null, // Aquí almacenamos las bicicletas obtenidas
    };
  },
  methods: {

    async obtenerBicicletas() {
      this.loading = true;
      this.error = null;
    

      try {
        const regional = this.$store.getters.getRegional;
        if (!regional || !regional.id) {
          console.warn("No se pudo obtener el ID del regional.");
          return;
        }
        const id = regional.id;
        const response = await axios.get(`${import.meta.env.VITE_APP_API}/bicicletas/obtenerPorRegional/${id}`);  // Reemplaza con la URL correcta
        this.bicicletas = response.data;  // Asignamos los datos a la variable 'bicicletas'
      } catch (error) {
        console.error('Error al obtener bicicletas:', error);
      }
    },
    async obtenerRegional() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_APP_API}/regional/obtenerTod`);  // Reemplaza con la URL correcta
        this.regionales = response.data;  // Asignamos los datos a la variable 'regionales'
      } catch (error) {
        console.error('Error al obtener regionales:', error);
      }
    }

  },
  mounted() {
    this.obtenerBicicletas();
  },
};
</script>

<style scoped>
/* Puedes añadir estilos personalizados si los necesitas */
</style>