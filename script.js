document.addEventListener('DOMContentLoaded', () => {
    const mensajeInicial = document.getElementById('mensajeInicial');
    const seleccionFlores = document.getElementById('seleccionFlores');
    const textoSubtitulo = document.getElementById('textoSubtitulo');
    const btnUnaFlor = document.getElementById('btnUnaFlor');
    const btnMuchasFlores = document.getElementById('btnMuchasFlores');
    const contenedorFlores = document.getElementById('contenedorFlores');

    const btnCanelita = document.getElementById('btnCanelita');
    const contenedorCanelita = document.getElementById('contenedorCanelita');
    const imgCanelitaElement = document.getElementById('imgCanelitaElement'); // Referencia al elemento <img>

    const tiempoVisibleMensaje = 2500;
    const tiempoDeFadeTransicionInicial = 800; // Para mensaje inicial -> botones

    // --- CONFIGURACIÓN PARA IMÁGENES DE CANELITA ---
    const totalImagenesCanelita = 11; // Total de imágenes CanelitaX.jpg
    const carpetaImagenes = 'Images'; // Nombre de la carpeta de imágenes
    const prefijoNombreImagen = 'Canelita'; // Prefijo común del nombre
    const extensionImagen = '.jpg'; // Extensión de las imágenes
    // --- FIN CONFIGURACIÓN ---

    // Tiempos de fade para el contenido principal (flores/Canelita)
    const tiempoFadeFlores = 500; // ms, debe coincidir con la transición CSS de .contenedor-flores
    const tiempoFadeCanelita = 1000; // ms, debe coincidir con la transición CSS de .contenedor-imagen

    // Inicializar opacidades para las transiciones
    seleccionFlores.style.opacity = '0';
    contenedorFlores.style.opacity = '0'; // Empezar oculto
    contenedorCanelita.style.opacity = '0'; // Empezar oculto

    setTimeout(() => {
        mensajeInicial.style.opacity = '0';
        setTimeout(() => {
            mensajeInicial.classList.add('hidden');
            seleccionFlores.classList.remove('hidden');
            void seleccionFlores.offsetHeight;
            seleccionFlores.style.opacity = '1';
        }, tiempoDeFadeTransicionInicial);
    }, tiempoVisibleMensaje);

    function ocultarFlores(callback) {
        if (contenedorFlores.style.opacity === '1' && contenedorFlores.innerHTML !== '') {
            contenedorFlores.style.opacity = '0';
            setTimeout(() => {
                contenedorFlores.innerHTML = ''; // Limpiar después del fade
                if (callback) callback();
            }, tiempoFadeFlores);
        } else {
            contenedorFlores.innerHTML = ''; // Limpiar si no estaba visible
            if (callback) callback();
        }
    }

    function ocultarCanelita(callback) {
        if (contenedorCanelita.style.opacity === '1' && !contenedorCanelita.classList.contains('hidden')) {
            contenedorCanelita.style.opacity = '0';
            setTimeout(() => {
                contenedorCanelita.classList.add('hidden');
                imgCanelitaElement.src = ""; // Limpiar src para la próxima vez
                if (callback) callback();
            }, tiempoFadeCanelita);
        } else {
            contenedorCanelita.classList.add('hidden'); // Asegurar que esté oculto
            imgCanelitaElement.src = "";
            if (callback) callback();
        }
    }

    function mostrarFlores(cantidad) {
        textoSubtitulo.textContent = "¿Cuántas flores quieres hoy?";
        contenedorFlores.innerHTML = ''; // Limpiar por si acaso antes de añadir nuevas
        for (let i = 0; i < cantidad; i++) {
            const florElemento = document.createElement('span');
            florElemento.classList.add('flor');
            florElemento.textContent = '🌸';
            if (cantidad > 1) {
                florElemento.style.animationDelay = `${i * 0.05}s`;
            }
            contenedorFlores.appendChild(florElemento);
        }
        // Forzar reflow antes de la animación de opacidad
        void contenedorFlores.offsetHeight;
        contenedorFlores.style.opacity = '1'; // Las flores individuales tienen su propia animación 'aparecer'
    }

    function mostrarCanelita() {
        textoSubtitulo.textContent = "¡Una Canelita sorpresa!";

        // --- LÓGICA PARA IMAGEN ALEATORIA ---
        const numeroImagen = Math.floor(Math.random() * totalImagenesCanelita) + 1;
        const rutaImagen = `${carpetaImagenes}/${prefijoNombreImagen}${numeroImagen}${extensionImagen}`;
        imgCanelitaElement.src = rutaImagen;
        // --- FIN LÓGICA IMAGEN ALEATORIA ---

        contenedorCanelita.classList.remove('hidden'); // Hacerlo visible en el layout
        void contenedorCanelita.offsetHeight; // Forzar reflow
        contenedorCanelita.style.opacity = '1'; // Iniciar fade-in
    }

    btnUnaFlor.addEventListener('click', () => {
        ocultarCanelita(() => { // Primero oculta a Canelita (si está visible)
            mostrarFlores(1);   // Luego muestra las flores
        });
    });

    btnMuchasFlores.addEventListener('click', () => {
        ocultarCanelita(() => {
            mostrarFlores(15);
        });
    });

    btnCanelita.addEventListener('click', () => {
        ocultarFlores(() => {   // Primero oculta las flores (si están visibles)
            mostrarCanelita();  // Luego muestra a Canelita
        });
    });
});