<template>
    <v-container class="py-10">
      <v-row class="justify-center">
        <v-col cols="12" md="6">
          <v-card class="pa-6" elevation="10">
            <v-card-title class="justify-center">
              <h1 class="text-center mb-4">Confirmar Cuenta</h1>
            </v-card-title>
            <v-card-text>
              <v-progress-circular
                v-if="loading"
                indeterminate
                color="primary"
                class="ma-3"
              ></v-progress-circular>
              <div v-else>
                <p v-if="confirmationStatus === 'success'">
                  Tu cuenta ha sido confirmada exitosamente. Puedes ahora <router-link to="/">iniciar sesión</router-link>.
                </p>
                <p v-else-if="confirmationStatus === 'error'">
                  Hubo un problema al confirmar tu cuenta. Por favor, intenta nuevamente más tarde.
                </p>
                <v-btn 
                  v-if="confirmationStatus === null"
                  @click="confirmAccount"
                  color="primary"
                  class="mt-4"
                >
                  Confirmar Cuenta
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        loading: false,
        confirmationStatus: null,
        token: null
      };
    },
    async created() {
      this.token = this.$route.params.token;
     
    },
    methods: {
      async confirmAccount() {
        this.loading = true;
  
        axios.get(`${import.meta.env.VITE_APP_API}/auth/confirmar/${this.token}`)
          .then(response => {
            if (response.data.message === 'User confirmed') {
              this.confirmationStatus = 'success';
              Swal.fire({
                title: 'Confirmación Exitosa',
                text: 'Tu cuenta ha sido confirmada exitosamente.',
                icon: 'success',
                confirmButtonText: 'Aceptar'
              });
            } else {
              this.confirmationStatus = 'error';
              Swal.fire({
                title: 'Error',
                text: 'No se pudo confirmar tu cuenta.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
            }
          })
          .catch(error => {
            console.error('Error al confirmar la cuenta:', error);
            this.confirmationStatus = 'error';
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al confirmar tu cuenta.',
              icon: 'error',
              confirmButtonText: 'Aceptar'
            });
          })
          .finally(() => {
            this.loading = false;
          });
      }
    }
  };
  </script>
  
  <style scoped>
  /* Añade estilos personalizados si es necesario */
  </style>

