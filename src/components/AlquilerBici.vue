<template>
    <v-app>
        <v-container class="contenedor py-10">
            <v-row justify="center">
                <!-- Section for Activity Registration -->
                <v-col cols="12" md="6">
                    <v-card class="pa-4" elevation="10">
                        <v-card-title class="justify-center">
                            <h1 class="text-center mb-4">Registrar Alquiler</h1>
                        </v-card-title>
                        <v-card-text>
                            <form ref="formAlquiler">
                                <v-text-field v-model="paqueteAlquiler.fecha_alquiler" label="Fecha de Inicio" outlined
                                    dense clearable prepend-inner-icon="mdi-calendar-start" type="date" color="black"
                                    class="text-black">
                                </v-text-field>

                                <v-text-field v-model="paqueteAlquiler.horaInicio" label="Hora de Inicio" outlined dense
                                    clearable prepend-inner-icon="mdi-calendar-start" type="time" color="black"
                                    class="text-black">
                                </v-text-field>


                                <v-text-field v-model="paqueteAlquiler.horaFin" label="Hora de Inicio" outlined dense
                                    clearable prepend-inner-icon="mdi-calendar-start" type="time" color="black"
                                    class="text-black">
                                </v-text-field>

                                <v-text-field v-model.number="paqueteAlquiler.costo_alquiler"
                                    label="Costo del  Alquiler " outlined dense clearable
                                    prepend-inner-icon="mdi-account" class="text-black"
                                    :rules="[(v) => !!v || 'El Valor es requerido']" color="black"></v-text-field>

                                <v-text-field v-model.number="paqueteAlquiler.descuento" label="Valor con Descuento "
                                    prepend-inner-icon="mdi-account" class="text-black"
                                    :rules="[(v) => !!v || 'El Descuento es requerido']" color="black"></v-text-field>

                                <v-select v-model="paqueteAlquiler.bicicleta" :items="bicicletas"
                                    label="Seleccione la Bicicleta " item-title="nombre" item-value="id" color="black"
                                    class="text-black" prepend-inner-icon="mdi-account"
                                    :rules="[(v) => !!v || 'La Bicicleta es requerida']" required></v-select>

                              
                                <v-card-actions class="justify-center">
                                    <v-btn class=" mt-6 btn " @click="guardarDatos" block>
                                        Guardar
                                    </v-btn>
                                </v-card-actions>
                            </form>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

        </v-container>
    </v-app>
</template>

<script>




export default {

    data() {
        return {
            paqueteAlquiler: {
                fecha_alquiler: "",
                horaInicio: "",
                horaFin: "",
                costo_alquiler: null,
                descuento: null,
                bicicleta: null,
                
            },

            bicicletas: [],
         

            validActividad: false,



        };
    },
    methods: {

        async obtenerBicicletas() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API}/bicicletas/obtenerTodos`);
                this.bicicletas = response.data
            } catch (error) {
                console.error(
                    "Error al obtener las regionales:",
                    error.response ? error.response.data : error.message

                );
            }

        },
        async obtenerUsuario() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_APP_API}/usuarios/obtenerTodos`);
                this.usuarios = response.data
            } catch (error) {
                console.error(
                    "Error al obtener las regionales:",
                    error.response ? error.response.data : error.message

                );
            }

        },



    },
    created() {

        this.obtenerBicicletas()
    }

};
</script>

<style>
.contenedor {

    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}

h1 {
    font-family: "Cambria", serif;
    color: black;
}

.v-btn {
    font-weight: bold;
}


.v-card {
    background-color: #f5f5f5;
    border-radius: 15px;
}

.v-text-field,
.v-select {
    margin-bottom: 16px;
}

.v-text-field .v-input__control,
.v-select .v-input__control {
    color: black;
}

.v-btn {
    font-weight: bold;
}

.chart-container {
    height: 400px;
    /* Adjust as needed */
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
    border-radius: 15px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
