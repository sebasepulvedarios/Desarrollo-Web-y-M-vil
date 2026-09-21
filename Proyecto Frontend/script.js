// "Base de Datos" pequeña
const baseDatosJuguetes = {
    "Oso de Peluche Educativo": { emoji: "🧸", precio: 12990, desc: "Suave oso de peluche con texturas interactivas diseñado para estimular el desarrollo sensorial desde los primeros meses." },
    "Rompecabezas de Madera": { emoji: "🧩", precio: 8500, desc: "Rompecabezas de 20 piezas con formas de animales para fomentar el pensamiento espacial y la motricidad fina." },
    "Tren Didáctico": { emoji: "🚂", precio: 15990, desc: "Tren de madera con vagones magnéticos desmontables. Ideal para aprender colores y formas geométricas." },
    "Microscopio Infantil": { emoji: "🔬", precio: 24990, desc: "Microscopio de iniciación a las ciencias con 3 lentes de aumento. Incluye láminas de muestra preparadas." }
};
const nombresJuguetes = Object.keys(baseDatosJuguetes);
// Logica del Buscador
const buscadorInput = document.querySelector('.buscador input');
const buscadorDiv = document.querySelector('.buscador');
if (buscadorInput) {
    const sugerenciasBox = document.createElement('div');
    sugerenciasBox.classList.add('sugerencias-box');
    buscadorDiv.appendChild(sugerenciasBox);
    let focoActual = -1;
    buscadorInput.addEventListener('input', (e) => {
        const textoEscrito = e.target.value.toLowerCase();
        sugerenciasBox.innerHTML = ''; 
        focoActual = -1;
        if (textoEscrito.length > 0) {
            const coincidencias = nombresJuguetes.filter(juguete => juguete.toLowerCase().includes(textoEscrito));
            coincidencias.forEach(juguete => {
                const opcion = document.createElement('p');
                opcion.textContent = juguete;
                opcion.addEventListener('click', () => {
                    localStorage.setItem('productoSeleccionado', juguete);
                    window.location.href = 'producto.html'; 
                });
                sugerenciasBox.appendChild(opcion);
            });
            sugerenciasBox.style.display = coincidencias.length > 0 ? 'block' : 'none';
        } else {
            sugerenciasBox.style.display = 'none';
        }
    });
    buscadorInput.addEventListener('keydown', (e) => {
        const opciones = sugerenciasBox.querySelectorAll('p');
        if (opciones.length === 0) return;
        if (e.key === 'ArrowDown') { focoActual++; actualizarFocoVisual(opciones); } 
        else if (e.key === 'ArrowUp') { focoActual--; actualizarFocoVisual(opciones); } 
        else if (e.key === 'Enter') {
            e.preventDefault();
            if (focoActual > -1 && opciones[focoActual]) opciones[focoActual].click(); 
        }
    });
    function actualizarFocoVisual(opciones) {
        opciones.forEach(op => { op.style.backgroundColor = ""; op.style.color = "var(--color-texto)"; });
        if (focoActual >= opciones.length) focoActual = 0;
        if (focoActual < 0) focoActual = opciones.length - 1;
        opciones[focoActual].style.backgroundColor = "var(--color-fondo)";
        opciones[focoActual].style.color = "var(--color-azul)";
    }
}
// Navegar desde Inicio y Catálogo
const tarjetasProducto = document.querySelectorAll('.producto');
tarjetasProducto.forEach(tarjeta => {
    const elementosClickeables = tarjeta.querySelectorAll('.imagen-placeholder, h3');
    elementosClickeables.forEach(elemento => {
        elemento.style.cursor = 'pointer';
        elemento.addEventListener('click', () => {
            const nombreProducto = tarjeta.querySelector('h3').innerText;
            localStorage.setItem('productoSeleccionado', nombreProducto);
            window.location.href = 'producto.html';
        });
    });
});
// Carga pagina de detalles para cada producto
const tituloPagina = document.querySelector('main h1');
if (tituloPagina && tituloPagina.innerText === 'Detalle del Juguete') {
    const jugueteGuardado = localStorage.getItem('productoSeleccionado');
    if (jugueteGuardado && baseDatosJuguetes[jugueteGuardado]) {
        const datos = baseDatosJuguetes[jugueteGuardado];
        document.querySelector('main h1').innerText = jugueteGuardado;
        document.querySelector('main p:nth-of-type(1)').innerText = "$" + datos.precio.toLocaleString('es-CL');
        document.querySelector('main p:nth-of-type(2)').innerText = datos.desc;
        document.querySelector('main div').innerText = datos.emoji;
    }
}
// Logica del Carrito
function actualizarContadorMenu() {
    let carrito = JSON.parse(localStorage.getItem('carritoHappyKids')) || [];
    let totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
    const botonesCarrito = document.querySelectorAll('.btn-carrito');
    botonesCarrito.forEach(boton => {
        let contador = boton.querySelector('.contador-carrito');
        if (!contador) {
            contador = document.createElement('span');
            contador.classList.add('contador-carrito');
            boton.appendChild(contador);
        }
        if (totalItems > 0) {
            contador.innerText = totalItems;
            contador.style.display = 'flex';
        } else {
            contador.style.display = 'none';
        }
    });
}
function agregarAlCarrito(nombreProducto) {
    let carrito = JSON.parse(localStorage.getItem('carritoHappyKids')) || [];
    let itemExistente = carrito.find(item => item.nombre === nombreProducto);
    if (itemExistente) { itemExistente.cantidad++; } 
    else { carrito.push({ nombre: nombreProducto, cantidad: 1 }); }
    localStorage.setItem('carritoHappyKids', JSON.stringify(carrito));
    
    actualizarContadorMenu();
}
const botonesAgregar = document.querySelectorAll('.btn-agregar, .btn-pagar');
botonesAgregar.forEach(boton => {
    if (boton.innerText.includes("Añadir al Carrito")) {
        boton.addEventListener('click', function(e) {
            let nombreProducto = "";
            if (document.querySelector('main h1') && document.querySelector('main h1').innerText !== 'Detalle del Juguete') {
                nombreProducto = document.querySelector('main h1').innerText;
            } else {
                const tarjeta = this.closest('.producto');
                nombreProducto = tarjeta.querySelector('h3').innerText;
            }
            if (baseDatosJuguetes[nombreProducto]) {
                agregarAlCarrito(nombreProducto);
                this.innerText = "¡Añadido!";
                this.style.backgroundColor = "#4caf50";
                setTimeout(() => {
                    this.innerText = "Añadir al Carrito";
                    this.style.backgroundColor = ""; 
                }, 1500);
            }
        });
    }
});
function renderizarCarrito() {
    const contenedorCarrito = document.querySelector('.lista-carrito');
    if (!contenedorCarrito) return; 
    contenedorCarrito.innerHTML = '<h2>Tu Carrito</h2>'; 
    let carrito = JSON.parse(localStorage.getItem('carritoHappyKids')) || [];
    let subtotal = 0;
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML += '<p style="padding: 20px; text-align: center;">Tu carrito está vacío. ¡Agrega algunos juguetes!</p>';
        actualizarBoleta(0);
        return;
    }
    carrito.forEach((item, index) => {
        const datos = baseDatosJuguetes[item.nombre];
        if (!datos) return;
        subtotal += datos.precio * item.cantidad;
        const article = document.createElement('article');
        article.classList.add('item-carrito');
        article.innerHTML = `
            <div class="imagen-mini">${datos.emoji}</div>
            <div class="detalles-item">
                <h3>${item.nombre}</h3>
                <p class="precio-item">$${datos.precio.toLocaleString('es-CL')}</p>
            </div>
            <div class="controles-cantidad">
                <button class="btn-cantidad btn-menos" data-index="${index}">-</button>
                <input type="number" value="${item.cantidad}" readonly>
                <button class="btn-cantidad btn-mas" data-index="${index}">+</button>
            </div>
            <button class="btn-eliminar" data-index="${index}"><span class="material-symbols-outlined">delete</span></button>
        `;
        contenedorCarrito.appendChild(article);
    });
    actualizarBoleta(subtotal);
    asignarEventosBotonesCarrito();
}
function actualizarBoleta(subtotal) {
    const valoresResumen = document.querySelectorAll('.fila-resumen span:nth-child(2)');
    if (valoresResumen.length > 0) {
        let costoEnvio = subtotal > 0 ? 3500 : 0;
        let totalFinal = subtotal + costoEnvio;
        
        valoresResumen[0].innerText = '$' + subtotal.toLocaleString('es-CL');
        valoresResumen[1].innerText = '$' + costoEnvio.toLocaleString('es-CL');
        document.querySelector('.total span:nth-child(2)').innerText = '$' + totalFinal.toLocaleString('es-CL');
    }
}
function asignarEventosBotonesCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carritoHappyKids')) || [];
    document.querySelectorAll('.btn-eliminar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            carrito.splice(index, 1); 
            localStorage.setItem('carritoHappyKids', JSON.stringify(carrito));
            renderizarCarrito(); 
            actualizarContadorMenu();
        });
    });
    document.querySelectorAll('.btn-mas').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            carrito[index].cantidad++;
            localStorage.setItem('carritoHappyKids', JSON.stringify(carrito));
            renderizarCarrito();
            actualizarContadorMenu();
        });
    });
    document.querySelectorAll('.btn-menos').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const index = e.currentTarget.getAttribute('data-index');
            if (carrito[index].cantidad > 1) {
                carrito[index].cantidad--;
                localStorage.setItem('carritoHappyKids', JSON.stringify(carrito));
                renderizarCarrito();
                actualizarContadorMenu();
            }
        });
    });
}
// Filtro del precio
const inputPrecio = document.getElementById('filtro-precio');
const textoPrecio = document.getElementById('valor-precio-texto');
const tarjetasCatalogo = document.querySelectorAll('.contenedor-catalogo .producto');
if (inputPrecio && textoPrecio && tarjetasCatalogo.length > 0) {
    inputPrecio.addEventListener('input', (e) => {
        const valorMaximo = parseInt(e.target.value);
        textoPrecio.innerText = '$' + valorMaximo.toLocaleString('es-CL');
        tarjetasCatalogo.forEach(tarjeta => {
            const precioTexto = tarjeta.querySelector('.precio').innerText.replace('$', '').replace(/\./g, '');
            const precioJuguete = parseInt(precioTexto);
            if (precioJuguete <= valorMaximo) {
                tarjeta.style.display = 'block'; 
            } else {
                tarjeta.style.display = 'none'; 
            }
        });
    });
}
// Inicializadores Globales
renderizarCarrito();
actualizarContadorMenu();