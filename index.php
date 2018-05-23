<!DOCTYPE html>
<html lang="hu">
<head>
    <meta charset="UTF-8">
    <title>Menta Events</title>
    <link rel="stylesheet" href="css/picnic.min.css">
    <link rel="stylesheet" href="css/plugins.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" >
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <nav>
        <a href="index.php" class="brand">
            <img class="logo" src="data/images/logo.png" />
            <span>Menta programok</span>
        </a>

        <input id="bmenub" type="checkbox" class="show">
        <label for="bmenub" class="burger pseudo button">menu</label>
        
        <div class="menu">
            <label for="modalNewEvent" class="button success"><i class="material-icons">add_box</i> Új esemény</label>
        </div>
    </nav>
    
    <main>
        <section id="app" class="content">
            <event-list v-bind:events=events></event-list>            
            <new-event v-bind:events=events></new-event>
            <toast></toast>
        </section>
    </main>
    
    <script src="dist/bundle.js"></script>
</body>
</html>