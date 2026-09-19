// ----------------------------------------------------
// 1. LÓGICA DEL BUSCADOR (Sugerencias y Navegación)
// ----------------------------------------------------
const buscadorInput = document.querySelector('.buscador input');
const buscadorDiv = document.querySelector('.buscador');

if (buscadorInput) {
    const sugerenciasBox = document.createElement('div');
    sugerenciasBox.classList.add('sugerencias-box');
    buscadorDiv.appendChild(sugerenciasBox);

    // Lista corregida: Solo los productos que realmente existen en el HTML
    const juguetesDisponibles = [
        "Oso de Peluche Educativo", 
        "Rompecabezas de Madera", 
        "Tren Didáctico", 
        "Microscopio Infantil"
    ];

    buscadorInput.addEventListener('input', (e) => {
        const textoEscrito = e.target.value.toLowerCase();
        sugerenciasBox.innerHTML = ''; 

        if (textoEscrito.length > 0) {
            const coincidencias = juguetesDisponibles.filter(juguete => 
                juguete.toLowerCase().includes(textoEscrito)
            );

            coincidencias.forEach(juguete => {
                const opcion = document.createElement('p');
                opcion.textContent = juguete;
                
                // Al hacer clic, te lleva a la página del producto
                opcion.addEventListener('click', () => {
                    // Guardamos el nombre del juguete elegido en la memoria del navegador
                    localStorage.setItem('productoSeleccionado', juguete);
                    // Redirigimos a la página de detalle (que crearemos pronto)
                    window.location.href = 'producto.html'; 
                });
                sugerenciasBox.appendChild(opcion);
            });
            sugerenciasBox.style.display = coincidencias.length > 0 ? 'block' : 'none';
        } else {
            sugerenciasBox.style.display = 'none';
        }
    });
}

// ----------------------------------------------------
// 2. LÓGICA DEL CARRITO (Matemáticas y Eliminar)
// ----------------------------------------------------

// Función para recalcular el precio total
function actualizarTotalCarrito() {
    const itemsCarrito = document.querySelectorAll('.item-carrito');
    let subtotal = 0;

    // Sumar el precio de cada artículo que quede en la pantalla
    itemsCarrito.forEach(item => {
        // Extraemos el texto del precio, le quitamos el símbolo $ y el punto, y lo convertimos a número
        let precioTexto = item.querySelector('.precio-item').innerText.replace('$', '').replace('.', '');
        let cantidad = parseInt(item.querySelector('input').value);
        subtotal += parseInt(precioTexto) * cantidad;
    });

    // Si el subtotal es 0 (carrito vacío), el envío también es 0
    let costoEnvio = subtotal > 0 ? 3500 : 0;
    let totalFina = subtotal + costoEnvio;

    // Buscar los textos en la boleta de la derecha y actualizar los números
    const valoresResumen = document.querySelectorAll('.fila-resumen span:nth-child(2)');
    if (valoresResumen.length > 0) {
        // Formatear los números para que se vean como moneda chilena ($X.XXX)
        valoresResumen[0].innerText = '$' + subtotal.toLocaleString('es-CL');
        valoresResumen[1].innerText = '$' + costoEnvio.toLocaleString('es-CL');
        document.querySelector('.total span:nth-child(2)').innerText = '$' + totalFina.toLocaleString('es-CL');
    }
}

// Lógica para el botón de eliminar (basurero rojo)
const botonesEliminar = document.querySelectorAll('.btn-eliminar');
botonesEliminar.forEach(boton => {
    boton.addEventListener('click', function() {
        const articulo = this.closest('.item-carrito');
        articulo.remove(); // Borra el juguete de la pantalla
        actualizarTotalCarrito(); // ¡Llama a la calculadora inmediatamente!
    });
});

// Lógica para los botones + y -
const controlesCantidad = document.querySelectorAll('.controles-cantidad');
controlesCantidad.forEach(control => {
    const btnMenos = control.children[0];
    const input = control.children[1];
    const btnMas = control.children[2];

    btnMas.addEventListener('click', () => {
        input.value = parseInt(input.value) + 1;
        actualizarTotalCarrito(); // Recalcula al sumar
    });

    btnMenos.addEventListener('click', () => {
        if (parseInt(input.value) > 1) {
            input.value = parseInt(input.value) - 1;
            actualizarTotalCarrito(); // Recalcula al restar
        }
    });
});

// ----------------------------------------------------
// 3. AÑADIR PRODUCTOS DESDE EL CATÁLOGO
// ----------------------------------------------------
const botonesAgregar = document.querySelectorAll('.btn-agregar');
botonesAgregar.forEach(boton => {
    boton.addEventListener('click', function() {
        const tarjeta = this.closest('.producto');
        const nombreProducto = tarjeta.querySelector('h3').innerText;
        
        // Simulación visual de que se agregó al carrito
        alert(`¡"${nombreProducto}" se ha añadido a tu carrito!`);
        this.innerText = "¡Añadido!";
        this.style.backgroundColor = "#4caf50"; // Cambia a verde
        
        setTimeout(() => {
            this.innerText = "Añadir al Carrito";
            this.style.backgroundColor = "var(--color-azul)"; // Vuelve a la normalidad
        }, 2000);
    });
});