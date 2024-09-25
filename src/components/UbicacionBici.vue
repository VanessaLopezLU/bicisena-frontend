

<template>
    <div class="map-container">
      <GoogleMap 
        :center="{ lat: centro.lat, lng: centro.lng }" 
        :zoom="4" 
        style="width: 100%; height: 100vh;">
        
        <!-- Marcadores de ubicaciones -->
        <Marker 
          v-for="(ubicacion, index) in ubicaciones" 
          :key="index" 
          :options="{ position: { lat: ubicacion.posY, lng: ubicacion.posX }, title: ubicacion.nombre, label: ubicacion.nombre }" 
          :title="ubicacion.nombre" 
        />
  
        <!-- Líneas de conexiones -->
        <Polyline 
          v-for="(conexion, index) in conexiones" 
          :key="index" 
          :options="{
            path: conexion,
            geodesic: true,
            strokeColor: '#17bfb7',
            strokeOpacity: 1.0,
            strokeWeight: 2
          }"
        />
       
      </GoogleMap>
    </div>
  </template>
  
  <script>
  import { GoogleMap, Marker, Polyline } from 'vue3-google-map';
  import axios from 'axios';
  
  export default {
    components: {
      GoogleMap,
      Marker,
      Polyline
    },
    data() {
      return {
        ubicaciones: [], 
        conexiones: [],  
        centro: { lat: 0, lng: 0 }  
      };
    },
    created() {
      this.obtenerDatos();  
    },
    methods: {
      
      async obtenerDatos() {
        try {
         
          const res = await axios.get(`${import.meta.env.VITE_APP_API}/ubicacion/obtenerTodos`);
          this.ubicaciones = res.data;  
  
          const response = await axios.get(`${import.meta.env.VITE_APP_API}/conexion/obtenerTodos`);
          
         
          this.conexiones = response.data.map(con => {
            const ubicacion1 = con.ubicacion1;
            const ubicacion2 = con.ubicacion2;
            return [
              { lat: ubicacion1.posY, lng: ubicacion1.posX },  // Punto de inicio de la línea
              { lat: ubicacion2.posY, lng: ubicacion2.posX }   // Punto de fin de la línea
            ];
          });
  
          // Actualizamos el centro del mapa
          this.actualizarCentroMapa();
        } catch (error) {
          console.error('Error al obtener los datos:', error);
        }
      },
  
      // Función para actualizar el centro del mapa basado en las ubicaciones obtenidas
      actualizarCentroMapa() {
        if (Array.isArray(this.ubicaciones) && this.ubicaciones.length > 0) {
          this.centro = {
            lat: this.ubicaciones[0].posY,  // Usamos la primera ubicación para centrar el mapa
            lng: this.ubicaciones[0].posX
          };
        } else {
          console.error('No hay ubicaciones válidas para centrar el mapa');
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .map-container {
    width: 100%;
    height: 100vh;
  }
  </style>
  