<template>
    <v-app>
      <!-- Barra de Navegación -->
      <v-app-bar class="bar" dark>
        <img src="/src/assets/sena.png" alt="">
        
        <v-toolbar-title>BiciSena</v-toolbar-title>
      </v-app-bar>
  
      <!-- Contenedor Principal -->
      <v-main>
        <v-container class="pa-6">
          <h1 class="text-center">¡Bienvenido a Vuetify 3!</h1>
  
          <!-- Ejemplo de Formulario -->
         <v-row class="justify-center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-6" elevation="10">
            <v-card-title class="justify-center">
              <h1 class="text-center mb-4">Iniciar Sesión</h1>
            </v-card-title>
            <v-card-text>
              <v-form ref="formLogin" lazy-validation>
                <v-text-field 
                  v-model="paqueteUsuario.email" 
                  label="Email" 
                  outlined 
                  dense 
                  clearable
                  prepend-inner-icon="mdi-account"
                  color="black"
                  class="text-black"
                  :rules="[v => !!v || 'Usuario es requerido']"
                ></v-text-field>
  
                <v-text-field 
                  v-model="paqueteUsuario.password" 
                  label="Contraseña" 
                  outlined 
                  dense 
                  clearable
                  prepend-inner-icon="mdi-lock"
                  type="password"
                  color="black"
                  class="text-black"
                  :rules="[v => !!v || 'Contraseña es requerida']"
                ></v-text-field>
  
                <v-card-actions class="justify-center">
                  <v-btn class="btn" @click="loginUser" block>
                    <v-icon left>mdi-login</v-icon>Ingresar
                  </v-btn>
                </v-card-actions>
              </v-form>
            </v-card-text>
  
            <v-card-actions class="justify-center">
              <span class="no-account-text">¿No tienes una cuenta?</span>
              <v-btn color="#27ae60 " @click="goToRegister">
                <v-icon left>mdi-account-plus</v-icon>Regístrate aquí
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
  
          <!-- Ejemplo de Tarjetas -->
          <v-row>
            <v-col cols="12" md="4" v-for="i in 3" :key="i">
              <v-card class="pa-4" elevation="4">
                <v-card-title>Tarjeta {{ i }}</v-card-title>
                <v-card-text>Contenido de la tarjeta número {{ i }}.</v-card-text>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
  
      <!-- Pie de página -->
      <v-footer app class=" footer pa-4"  dark>
        <span class="white--text">&copy; 2024 Mi Aplicación</span>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        validForm: false, // Valida el formulario
        formData: {
          nombre: '', // Nombre del usuario
          email: '',  // Correo del usuario
        },
        paqueteUsuario: {
          email: null,
          password: null,
        }
      };
    },
    methods: {
      enviarFormulario() {
        if (this.$refs.form.validate()) {
          alert(`Formulario enviado: ${this.formData.nombre}, ${this.formData.email}`);
          this.resetForm();
        }
      },
      resetForm() {
        this.formData.nombre = '';
        this.formData.email = '';
        this.$refs.form.resetValidation();
      },
    },
  };
  </script>
  
  <style scoped>
  .bar {
    background: radial-gradient(
    circle,
    rgb(174, 238, 190) 0%,
    rgb(7, 180, 50) 100%
  );
  }
  h1 {
    font-family: "Cambria", serif;
    font-weight: bold;
    color: #3f51b5; /* Primary color de Vuetify */
  }
  
  .v-footer {
    justify-content: center;
  }
  
  .v-btn {
    background-color: #3f51b5;
    color: white;
    font-weight: bold;
  }
  
  .pa-6 {
    padding: 24px;
  }
  </style>
  