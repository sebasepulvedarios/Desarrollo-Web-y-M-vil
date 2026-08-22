<html>
    <head>
        <title>Inicio - Librería Épica</title>
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
                        <li class="nav-item"><a class="nav-link" href="contacto.php">Contacto</a></li>                           
                    </ul>
                    <button type="button" class="btn btn-light text-primary fw-bold" data-bs-toggle="modal" data-bs-target="#myModal">Entrar al Gremio</button>                             
                </div>  
            </div>
        </nav>
        
        <!--Container Principal-->
        <div class="container-fluid bg-light flex-grow-1 p-5 text-center">
            <h1 class="mb-4 text-primary">Bienvenidos a la Librería Épica</h1>
            <p class="lead">Explora mapas antiguos, sagas heroicas y grimorios legendarios.</p>
            <div class="mt-4">
                <a href="empresa.php" class="btn btn-outline-primary m-2">Sobre Nosotros</a>
                <a href="servicios.php" class="btn btn-outline-primary m-2">Nuestros Servicios</a>
                <a href="productos.php" class="btn btn-outline-primary m-2">Ver Catálogo</a>
                <a href="contacto.php" class="btn btn-outline-primary m-2">Enviar Mensaje</a>
            </div>
        </div>

        <!--Footer-->
        <div class="container-fluid bg-dark mt-auto p-3">
            <div class="row text-center">
                <div class="col-4"></div>
                <div class="col-4" style="color:white"><strong>LibreríaÉpica © 2026</strong></div>
                <div class="col-4"></div>
            </div>
        </div>

        <!--Modal (Autenticación)-->
        <div class="modal fade" id="myModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header bg-primary text-white">
                        <h4 class="modal-title">Identifícate, viajero</h4>
                        <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <form action="empresa.php">
                            <div class="mb-3 mt-3">
                                <label for="email" class="form-label">Correo (Papiro Mágico):</label>
                                <input type="email" class="form-control" id="email" placeholder="Ingresa tu correo" name="email">
                            </div>
                            <div class="mb-3">
                                <label for="pwd" class="form-label">Palabra Secreta:</label>
                                <input type="password" class="form-control" id="pwd" placeholder="Tu contraseña" name="pswd">
                            </div>
                            <button type="submit" class="btn btn-primary w-100">Ingresar</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>        
    </body>
</html>