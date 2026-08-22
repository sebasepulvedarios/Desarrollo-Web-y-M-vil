<html>
    <head>
        <title>Contacto - Librería Épica</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"></script>        
    </head>
    <body class="d-flex flex-column min-vh-100">
        <!--Navbar -->
        <nav class="navbar navbar-expand-sm bg-primary navbar-dark shadow-sm">
            <div class="container-fluid">
                <a class="navbar-brand" href="index.php">Librería Épica</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
                    <span class="navbar-toggler-icon"></span>
                </button> 
                <div class="collapse navbar-collapse" id="collapsibleNavbar">
                    <ul class="navbar-nav me-auto">
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">La Orden</a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="empresa.php">Nuestra Historia</a></li>
                                <li><a class="dropdown-item" href="#">Los Sabios</a></li>
                                <li><a class="dropdown-item" href="#">Misión</a></li>
                            </ul>
                        </li>                        
                        <li class="nav-item"><a class="nav-link" href="servicios.php">Servicios</a></li>
                        <li class="nav-item"><a class="nav-link" href="productos.php">Libros Mágicos</a></li>
                        <li class="nav-item"><a class="nav-link active" href="contacto.php">Contacto</a></li>                     
                    </ul>
                </div>  
            </div>
        </nav>
        
        <!--Container Formulario-->
        <div class="container bg-light flex-grow-1 p-5 rounded mt-4 mb-4 shadow-sm border">
            <h3 class="text-primary mb-4 text-center">Envíanos un mensaje</h3>
            <form action="index.php">
                <div class="mb-3">
                    <label for="email" class="form-label fw-bold">Correo Electrónico:</label>
                    <input type="email" class="form-control" id="email" placeholder="tu_correo@reino.com" name="email">
                </div>                
                <div class="mb-3">
                    <label for="comment" class="form-label fw-bold">Tu mensaje o consulta:</label>
                    <textarea class="form-control" rows="5" id="comment" name="text" placeholder="Escribe aquí qué libro buscas..."></textarea>
                </div>
                <div class="d-flex justify-content-between">
                    <a href="index.php" class="btn btn-secondary">Volver</a>
                    <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
                </div>
            </form>
        </div>

        <!--Footer-->
        <div class="container-fluid bg-dark mt-auto p-3">
            <div class="row text-center">
                <div class="col-4"></div>
                <div class="col-4" style="color:white"><strong>LibreríaÉpica © 2026</strong></div>
                <div class="col-4"></div>
            </div>
        </div>
    </body>
</html>