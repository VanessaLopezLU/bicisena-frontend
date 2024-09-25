<template>
    <div class="map-container">
      <GoogleMap
        ref="mapRef" 
        :center="{ lat: centro.lat, lng: centro.lng }"
        :zoom="4"
        style="width: 100%; height: 100vh;"
        @ready="onMapReady"
      >
        <!-- Marcadores de ubicaciones -->
        <Marker
          v-for="(ubicacion, index) in ubicaciones"
          :key="index"
          :options="{
            position: { lat:  3.3315195490027034, lng: -76.22419720000001 },
           
            
          }"
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
        centro: { lat: 0, lng: 0 },
      };
    },
    
    methods: {
    
  
      onMapReady(mapInstance) {
        this.addGroundOverlay(mapInstance);
      },
  
      addGroundOverlay(mapInstance) {
        const bounds = new google.maps.LatLngBounds(
          new google.maps.LatLng(-76.5081301586335),  // Coordenadas suroeste
          new google.maps.LatLng(40.7128, -74.0060)    // Coordenadas noreste
        );
  
        const imageUrl = 'path-to-your-image.jpg'; // URL de la imagen
  
        // Crear el GroundOverlay en el mapa
        const overlay = new google.maps.GroundOverlay(imageUrl, bounds);
        overlay.setMap(mapInstance);
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
  