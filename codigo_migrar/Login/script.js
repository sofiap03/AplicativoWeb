// Selección de elementos en el DOM
const contenedor = document.getElementById("contenedor");
const botonRegistro = document.getElementById("registrarse");
const botonInicioSesion = document.getElementById("iniciarSesion");

// Evento para mostrar el formulario de Registro
botonRegistro.addEventListener("click", () => {
  contenedor.classList.add("active");
});

// Evento para mostrar el formulario de Inicio de Sesión
botonInicioSesion.addEventListener("click", () => {
  contenedor.classList.remove("active");
});
