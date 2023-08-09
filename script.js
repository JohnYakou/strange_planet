// l'événement load se déclenche lorsque la page entière a été chargée, y compris toutes les ressources dépendantes telles que les feuilles de style (stylesheets) et les images
window.addEventListener('load', function(){
    // canvas setup
    const canvas = document.getElementById("canvas1");
    // drawing context : un objet intégré qui contient toutes les méthodes et propriétés permettant de dessiner et d'animer des couleurs, des formes et d'autres graphiques sur le canvas HTML.
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;
});