// l'événement load se déclenche lorsque la page entière a été chargée, y compris toutes les ressources dépendantes telles que les feuilles de style (stylesheets) et les images
window.addEventListener('load', function(){
    // canvas setup
    const canvas = document.getElementById("canvas1");
    // drawing context : un objet intégré qui contient toutes les méthodes et propriétés permettant de dessiner et d'animer des couleurs, des formes et d'autres graphiques sur le canvas HTML.
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    class InputHandler{

    }

    class Projectile{

    }

    class Particle{

    }

    class Player{
        // CONSTRUCTOR est une méthode spéciale de la class JS. Lorsque j'appelle la classe JS en utilisant le mot-clé new, le constructeur crée un objet JS vierge et lui attribue des propriétés et des valeurs dans le blueprint qu'il contient.
        constructor(game){
            this.game = game;
            this.width = 120;
            this.height = 190;
            this.x = 20;
            this.y = 100;
            this.speedY = 0;
        }
        update(){
            this.y += this.speedY;
        }
        draw(context){
            context.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    class Enemy{

    }

    class Layer{

    }

    class Background{

    }

    class UI{

    }

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            // crée une nouvelle instance de la class Player
            this.player = new Player(this);
        }
        update(){
            this.player.update();
        }
        draw(context){
            this.player.draw(context);
        }
    }

    const game = new Game(canvas.width, canvas.height);

    // animation loop
    function animate(){
        // permet d'éviter au rectangle noir (futur perso) de s'étirer
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update();
        game.draw(ctx);
        // requestAnimationFrame indique au navigateur que nous souhaitons réaliser une animation et lui demande d'appeler une fonction spécifique pour mettre à jour l'animation avant la prochaine répétition.
        requestAnimationFrame(animate);
    }
    animate();
});