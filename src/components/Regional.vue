<template>
    <v-app>
      <v-container  class="contenedor py-10">
        <v-row justify="center">
          <v-col cols="12" md="6">
            <v-card class="pa-4" elevation="10">
              <v-card-title class="text-center">
                <h1 class="text-center mb-4">Registrar Regional</h1>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="validForm" lazy-validation>
                  
                  <!-- Campo para el nombre -->
                  <v-text-field
                    v-model="regional.nombre"
                    label="Nombre"
                    prepend-icon="mdi-account"
                    outlined
                    dense
                    clearable
                    :rules="[v => !!v || 'El nombre es requerido']"
                    color="black"
                  ></v-text-field>
  
                
                  <v-select
                    v-model="regional.departamento"
                    :items="Departamento"
                    label="Departamento"
                    prepend-icon="mdi-map"
                    outlined
                    dense
                    clearable
                   :rules="[v => !!v || 'El departamento es requerido']"
                    color="black"
                  ></v-select>

                  <v-select
                    v-model="regional.municipio"
                    :items="municipios"
                    label="Municipio"
                    prepend-icon="mdi-city"
                    outlined
                    dense
                    clearable
                    :rules="[v => !!v || 'El municipio es requerido']"
                    color="black"
                  ></v-select>
  
                  <v-card-actions class="justify-center">
                    <v-btn  class=" mt-6 btn " @click="guardarDatos" block>
                      Guardar
                    </v-btn>
                  </v-card-actions>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-app>
  </template>
  
  <script>
  import axios from 'axios';
  import Swal from 'sweetalert2';
  
  export default {
    data() {
      return {
        validForm: false,
        regional: {
          nombre: null,
          departamento: null,
          municipio: null,
        },
        municipios: ['Bogotá', 'Medellín', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'], 
        Departamento: ['Tolima', 'cordoba', 'Cali', 'Barranquilla', 'Cartagena', 'Bucaramanga'],
      };
    },
    methods: {
    
      async guardarDatos() {
        const isValid = this.$refs.form.validate();
        if (!isValid) return;
        
        try {
            const response = await axios.post(`${import.meta.env.VITE_APP_API}/regional/crear`,
            this.regional
          )
          Swal.fire({
          title: 'Registro exitoso',
          text:
          `Nombre: ${this.regional.nombre},
           Departamento: ${this.regional.departamento}, 
           Municipio: ${this.regional.municipio}`,
          icon: 'success',
          confirmButtonText: 'Aceptar'
        });
          this.$router.push('/')
            
        }catch(error){
            Swal.fire('Error', 'Credenciales incorrectas', 'error');
        }
            
        
       
      }
  },
};
  </script>
  
  <style scoped>
  .v-card-title {
    font-size: 24px;
    font-weight: bold;
    
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
  <style>
  .btn {
  background-color: #25a745;
  color: #f5f5f5;
  width: 10px;

}


  </style>
  