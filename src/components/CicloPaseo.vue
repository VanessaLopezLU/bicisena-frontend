<template>
    <v-app>
      <v-row>
        <v-col cols="12" md="6" style="margin-top: 90px; margin-left: 200px;">
          <v-card class="pa-4" elevation="10">
            <v-card-title class="text-center">
              <h1 class="text-center mb-4">Ciclo Paseo</h1>
            </v-card-title>
            <v-card-text>
              <v-form ref="formCiclo" v-model="validForm" lazy-validation>
                <v-text-field
                  v-model="paqueteCiclo.fecha"
                  label="Fecha de Inicio"
                  outlined
                  dense
                  clearable
                  prepend-inner-icon="mdi-calendar-start"
                  type="date"
                  color="black"
                  class="text-black"
                  :rules="[(v) => !!v || 'Fecha de ciclo paseo es requerida']"
                ></v-text-field>
  
                <v-text-field
                  v-model="paqueteCiclo.ubicacion"
                  label="Direccion"
                  outlined
                  dense
                  clearable
                  prepend-inner-icon="mdi-map-marker"
                  color="black"
                  class="text-black"
                  :rules="[(v) => !!v || 'La Dirección es requerida']"
                ></v-text-field>
  
                <v-card-actions class="justify-center">
                  <v-btn class="mt-6 btn" @click="guardarCiclo" block>
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-app>
  </template>
  
  <script>
  import axios from "axios";
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        paqueteCiclo: {
          fecha: null,
          ubicacion: null,
        },
        validForm: false,
      };
    },
    methods: {
      async guardarCiclo() {
        // Valida el formulario
        const isValid = this.$refs.formCiclo.validate();
        if (!isValid) return;
  
        try {
          // Realiza la petición al servidor
          const response = await axios.post(
            `${import.meta.env.VITE_APP_API}/ciclopaseos/crear`,
            this.paqueteCiclo
          );
  
          // Si la respuesta es exitosa, muestra un mensaje
          Swal.fire({
            title: "Registro exitoso",
            text: `Fecha: ${this.paqueteCiclo.fecha}, Ubicación: ${this.paqueteCiclo.ubicacion}`,
            icon: "success",
            confirmButtonText: "Aceptar",
          });
  
          // Redirige y resetea el formulario
          this.$router.push("/");
          this.resetCiclo();
        } catch (error) {
          // Muestra el mensaje de error si hay algún fallo en la petición
          Swal.fire("Error", "Ocurrió un error en el registro", "error");
        }
      },
      resetCiclo() {
        // Resetea el contenido del paquete
        this.paqueteCiclo = {
          fecha: null,
          ubicacion: null,
        };
        // Resetea la validación del formulario
        this.$refs.formCiclo.resetValidation();
      },
    },
  };
  </script>
  
  <style>
  v-card-title {
    font-size: 24px;
    font-weight: bold;
    font-family: "Cambria", serif;
  }
  
  h1 {
    font-family: "Cambria", serif;
    color: black;
  }
  
  .v-btn {
    font-weight: bold;
  }
  
  .v-text-field {
    margin-bottom: 16px;
  }
  
  .v-text-field .v-input__control {
    color: black;
  }
  </style>
  