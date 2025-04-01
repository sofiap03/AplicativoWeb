const { error } = require("console");
const { response } = require("express");

document.addEventListener("DOMContentLoaded", () => {
    const formEquipo = document.getElementById('form-equipo');
    const tipoEquipo = document.getElementById('tipo');
    const buscarInput = document.getElementById('busqueda');
    const tablaInventario = document.getElementById('tabla-inventario');
    const detallesEquipo = document.querySelector('.detalles-equipo');
    const equipoPresentacion = document.getElementById('equipo-presentacion'); //
    const descripcionContainer = document.getElementById('equipo-descripcion');//
    const hojaVidaContainer = document.getElementById('hoja-vida-container'); //
    const alertasContainer = document.querySelector('.alertas');
    const contenidoDinamico = document.getElementById('contenido-dinamico');
    

    /************************************************************************************ */

    //Funcion para cargar la seccion de todos los equipos
    function cargarTodosLosEquipos(){
        fetch('todos-los-equipos.html')
        .then(response => response.text())
        .then(html => {
            contenidoDinamico.innerHTML = html;
            //se pueden agregar funcionalidades adicionales despues de cargar el contenido
            inicializarFiltros();
        })
        .catch(error => console.error('Error al cargar la página de todos los equipos:', error));
    }

    //Evento para cargar los equipos cuando se seleccione la opcion correspondiente
    document.getElementById('ver-todos-equipos').addEventListener('click', cargarTodosLosEquipos);

    //Funcion para inicializar filtros y funcionalidades especificas de la tabla
    function inicializarFiltros(){
        const buscarEquipo = document.getElementById('buscarEquipo');
        const filtrarCategoria = document.getElementById('filtrarCategoria');

        //Lógic para filtrar equipos por nombre y categoria
        buscarEquipo.addEventListener('input', () => {
            //filtrar la lista de equipos por nombre 
        });

        filtrarCategoria.addEventListener('change', () => {
            //filtra la lista de equipos por categoria
        });
    }
    
    
    // Simulación de datos iniciales
    const equipos = [
        {
            nombre: "Rayos X",
            tipo: "imagenologia",
            estado: "Operativo",
            ubicacion: "Sala 1",
            responsable: "Dr. Gómez",
            ultimoMantenimiento: "2024-05-15",
            descripcion: "Equipo de imagenología utilizado para diagnósticos internos.",
        },
        {
            nombre: "Electrocardiógrafo",
            tipo: "diagnostico",
            estado: "En Mantenimiento",
            ubicacion: "Sala 2",
            responsable: "Enf. Rodríguez",
            ultimoMantenimiento: "2024-06-01",
            descripcion: "Dispositivo que registra la actividad eléctrica del corazón.",
        },
        // Añadir más equipos según sea necesario
    ];

    // Función para mostrar la tabla de inventario
    function mostrarInventario(equipos) {
        tablaInventario.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Nombre del Equipo</th>
                        <th>Tipo</th>
                        <th>Estado</th>
                        <th>Ubicación</th>
                        <th>Responsable</th>
                        <th>Último Mantenimiento</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    ${equipos
                        .map(
                            (equipo, index) => `
                        <tr data-index="${index}">
                            <td>${equipo.nombre}</td>
                            <td>${equipo.tipo}</td>
                            <td>${equipo.estado}</td>
                            <td>${equipo.ubicacion}</td>
                            <td>${equipo.responsable}</td>
                            <td>${equipo.ultimoMantenimiento}</td>
                            <td>
                                <button class="ver-detalles">Ver Detalles</button>
                            </td>
                        </tr>
                    `
                        )
                        .join("")}
                </tbody>
            </table>
        `;
    }
    // Mostrar la información detallada de un equipo
    function mostrarDetalles(equipo) {
        detallesEquipo.innerHTML = `
            <h2>Detalles del Equipo: ${equipo.nombre}</h2>
            <p><strong>Tipo:</strong> ${equipo.tipo}</p>
            <p><strong>Estado:</strong> ${equipo.estado}</p>
            <p><strong>Ubicación:</strong> ${equipo.ubicacion}</p>
            <p><strong>Responsable:</strong> ${equipo.responsable}</p>
            <p><strong>Último Mantenimiento:</strong> ${equipo.ultimoMantenimiento}</p>
            <p><strong>Descripción:</strong> ${equipo.descripcion}</p>
        `;
        detallesEquipo.style.display = "block";
        hojaVidaContainer.style.display = "none"; // Oculta la hoja de vida cuando se muestran los detalles
    }

    // Función para filtrar equipos por la búsqueda del usuario
    function filtrarEquipos(termino) {
        const resultados = equipos.filter((equipo) =>
            equipo.nombre.toLowerCase().includes(termino.toLowerCase())
        );
        mostrarInventario(resultados);
    }

    // Mostrar alertas de equipos críticos
    function mostrarAlertas() {
        const criticos = equipos.filter(
            (equipo) => equipo.estado === "En Mantenimiento" || equipo.estado === "Fuera de Servicio"
        );

        if (criticos.length > 0) {
            alertasContainer.innerHTML = `
                <h3>Alertas Críticas</h3>
                <ul>
                    ${criticos
                        .map(
                            (equipo) => `<li>${equipo.nombre} - ${equipo.estado}</li>`
                        )
                        .join("")}
                </ul>
            `;
            alertasContainer.style.display = "block";
        } else {
            alertasContainer.style.display = "none";
        }
    }

    // Event listener para mostrar los detalles de un equipo al hacer clic en "Ver Detalles"
    tablaInventario.addEventListener("click", (event) => {
        if (event.target.classList.contains("ver-detalles")) {
            const index = event.target.closest("tr").dataset.index;
            mostrarDetalles(equipos[index]);
        }
    });

    // Event listener para la búsqueda de equipos
    buscarInput.addEventListener("input", (event) => {
        filtrarEquipos(event.target.value);
    });

    // Event listener para mostrar u ocultar la hoja de vida
    tipoEquipo.addEventListener("change", function () {
        if (this.value) {
            descripcionContainer.style.display = "block";
            equipoPresentacion.style.display = "block";
            hojaVidaContainer.style.display = "none";
        } else {
            descripcionContainer.style.display = "none";
            equipoPresentacion.style.display = "none";
            hojaVidaContainer.style.display = "block";
        }
    });

    // Inicializar la interfaz con los datos iniciales
    mostrarInventario(equipos);
    mostrarAlertas();
});
