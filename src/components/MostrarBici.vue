<template>
  <v-row style="margin-top: 80px">
    <v-col cols="3" v-for="bicicleta in bicicletas" :key="bicicleta.id">
      <v-card
        :color="bicicleta.estado == 'disponible' ? 'green' : 'red'"
        @click="alquilar(bicicleta)"
      >
        <v-card-title>{{ bicicleta.marca }}</v-card-title>
        <v-card-text>{{ bicicleta.modelo }}</v-card-text>
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
          marca: "Marca1",
          modelo: "Modelo1",
          color: "Color1",
          estado: "disponible",
        },
        {
          id: 2,
          marca: "Marca2",
          modelo: "Modelo2",
          color: "Color2",
          estado: "ocupada",
        },
        {
          id: 3,
          marca: "Marca3",
          modelo: "Modelo3",
          color: "Color3",
          estado: "disponible",
        },
        {
          id: 4,
          marca: "Marca4",
          modelo: "Modelo4",
          color: "Color",
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
