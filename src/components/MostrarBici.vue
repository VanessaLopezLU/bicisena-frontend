<template>
  <v-row style="margin-top: 80px">
    <v-col cols="3" v-for="bicicleta in bicicletas" :key="bicicleta.id">
      <v-card
        :color="bicicleta.estado == 'disponible' ? 'green' : 'red'"
        @click="alquilar(bicicleta)"
      >
        <v-card-title>{{ bicicleta.marca }}</v-card-title>
        <v-card-text>{{ bicicleta.color }}</v-card-text>
        <v-card-text>{{ bicicleta.estado }}</v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {
    return {
      bicicletas: [
        {
          id: 1,
          marca: "Bici 1",
          color: "azul",
          estado: "disponible",
        },
        {
          id: 2,
          marca: "Bici 2",
          color: "verde",
          estado: "ocupada",
        },
        {
          id: 3,
          marca: "Bici 3 ",
          color: "Azul",
          estado: "disponible",
        },
        
      ],
    };
  },
  methods: {
    alquilar(bicicleta) {
      if (bicicleta.estado == "disponible") {
      } else {
        alert("La bicicleta se encuentra ocupada");
      }
    },
  },
};
</script>
<style></style>
