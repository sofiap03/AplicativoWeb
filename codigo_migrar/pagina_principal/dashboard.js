document.addEventListener('DOMContentLoaded', function () {
    const themeSelect = document.getElementById('themeSelect');
    const savedTheme = localStorage.getItem('theme') || 'default';

    // Aplicar el tema guardado al cargar la página
    applyTheme(savedTheme);

    // Si existe el selector de temas, configúralo y maneja los cambios
    if (themeSelect) {
        themeSelect.value = savedTheme;

        themeSelect.addEventListener('change', function () {
            const selectedTheme = themeSelect.value;
            applyTheme(selectedTheme);

            // Guardar la selección de tema en localStorage
            localStorage.setItem('theme', selectedTheme);
        });
    }

    // Función para aplicar un tema
    function applyTheme(theme) {
        // Eliminar todas las clases de temas existentes
        document.body.className = document.body.className.replace(/theme-\S+/g, '');

        // Añadir la clase del tema seleccionado
        document.body.classList.add(`theme-${theme}`);
    }
});

