<template>
    <v-app>
      <v-container>
        <v-row justify="center" style="margin-top: 70px;">
          <v-col cols="12" md="5">
            <v-card class="pa-6" elevation="17" style="width: 90%;"> <!-- Ajustado el ancho al 90% -->
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

export default {
    
}
</script>



<style></style>