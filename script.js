// l'événement load se déclenche lorsque la page entière a été chargée, y compris toutes les ressources dépendantes telles que les feuilles de style (stylesheets) et les images
window.addEventListener('load', function(){
    // canvas setup
    const canvas = document.getElementById("canvas1");
    // drawing context : un objet intégré qui contient toutes les méthodes et propriétés permettant de dessiner et d'animer des couleurs, des formes et d'autres graphiques sur le canvas HTML.
    const ctx = canvas.getContext("2d");
    canvas.width = 500;
    canvas.height = 500;

    class InputHandler{
        constructor(game){
            this.game = game;
            // e => Une caractéristique particulière de la fonction flèche est que ce mot-clé à l'intérieur de la fonction flèche représente toujours les objets dans lesquels la fonction flèche est définie.
            window.addEventListener("keydown", e => {
                // console.log(e.key);
                if(((e.key === "ArrowUp") ||
                    (e.key === "ArrowDown")
                ) && this.game.keys.indexOf(e.key) === -1){
                    this.game.keys.push(e.key);
                // le vide entre les guillemets c'est la touche "espace" 
                }else if(e.key === " "){
                    this.game.player.shootTop();
                }
            });

            // La méthode indexOf() renvoie le premier index auquel un élément donné peut être trouvé dans le tableau, ou renvoie -1 si l'élément n'est pas présent.
            window.addEventListener("keyup", e => {
                if(this.game.keys.indexOf(e.key) > -1){
                    // La méthode splice() modifie le contenu d'un tableau en supprimant ou en remplaçant les éléments existants.
                    this.game.keys.splice(this.game.keys.indexOf(e.keys), 1);
                }
                // console.log(this.game.keys);
            });
        }
    }

    class Projectile{
        constructor(game, x, y){
            this.game = game;
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 3;
            this.speed = 3;
            this.markedForDeletion = false;
        }
        
        update(){
            this.x += this.speed;
            if(this.x > this.game.width * 0.8) this.markedForDeletion = true;
        }
        
        draw(context){
            context.fillStyle = "yellow";
            context.fillRect(this.x, this.y, this.width, this.height);
        }
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
            this.maxSpeed = 3;
            this.projectiles = [];
        }
        
        update(){
            // La méthode includes() permet de déterminer si un tableau contient une valeur et renvoie true si c'est le cas, false sinon.
            if(this.game.keys.includes("ArrowUp")) this.speedY = -this.maxSpeed;
            else if(this.game.keys.includes("ArrowDown")) this.speedY = this.maxSpeed;
            // Sans  ce else, le perso ne s'arrête pas.
            else this.speedY = 0;
            this.y += this.speedY;
            // handle projectiles
            this.projectiles.forEach(projectile => {
                projectile.update();
            });

            // La méthode filter() crée et retourne un nouveau tableau contenant tous les éléments du tableau d'origine qui remplissent une condition déterminée par la fonction callback.
            this.projectiles = this.projectiles.filter(projectile => !projectile.markedForDeletion);
        }
        
        draw(context){
            context.fillStyle = "green";
            context.fillRect(this.x, this.y, this.width, this.height);

            this.projectiles.forEach(projectile => {
                projectile.draw(context);
            });
        }

        shootTop(){
            if(this.game.ammo > 0){
                this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
                // A chaque que je tire, je tire une munition. J'en n'ai 20 au début (voir le constructor de la class Game).
                this.game.ammo--;
            }
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
            this.input = new InputHandler(this);
            this.keys = [];
            this.ammo = 20;
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