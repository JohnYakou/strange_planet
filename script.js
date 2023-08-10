// l'événement load se déclenche lorsque la page entière a été chargée, y compris toutes les ressources dépendantes telles que les feuilles de style (stylesheets) et les images
window.addEventListener('load', function(){
    // canvas setup
    const canvas = document.getElementById("canvas1");
    // drawing context : un objet intégré qui contient toutes les méthodes et propriétés permettant de dessiner et d'animer des couleurs, des formes et d'autres graphiques sur le canvas HTML.
    const ctx = canvas.getContext("2d");
    canvas.width = 700;
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
                }else if(e.key === "d"){
                    this.game.debug = !this.game.debug;
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
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
            this.speedY = 0;
            this.maxSpeed = 3;
            this.projectiles = [];
            this.image = document.getElementById("player");
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

            // sprite animation
            if(this.frameX < this.maxFrame){
                this.frameX++;
            }else{
                this.frameX = 0;
            }
        }
        
        draw(context){
            if(this.game.debug)context.strokeRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);

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
        constructor(game){
            this.game = game;
            this.x = this.game.width;
            this.speedX = Math.random() * -1.5 - 0.5;
            this.frameX = 0;
            this.frameY = 0;
            this.maxFrame = 37;
        }

        update(){
            this.x += this.speedX - this.game.speed;
            if(this.x + this.width < 0) this.markedForDeletion = true;

            // sprite animation
            if(this.frameX < this.maxFrame){
                this.frameX++;
            }else{
                this.frameX = 0;
            }
        }

        draw(context){
            if(this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height);
            context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
            context.front = "20px Helvetica";
            context.fillText(this.lives, this.x, this.y);
        }
    }

    class Angler1 extends Enemy{
        constructor(game){
            // super fait réf. à la super class (ou class parent)
            super(game);
            this.width = 228;
            this.height = 169;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
            this.image = document.getElementById("angler1");
            this.frameY = Math.floor(Math.random() * 3);
            this.lives = 2;
            this.score = this.lives;
        }
    }

    class Angler2 extends Enemy{
        constructor(game){
            // super fait réf. à la super class (ou class parent)
            super(game);
            this.width = 213;
            this.height = 165;
            this.y = Math.random() * (this.game.height * 0.9 - this.height);
            this.image = document.getElementById("angler2");
            this.frameY = Math.floor(Math.random() * 2);
            this.lives = 3;
            this.score = this.lives;
        }
    }

    class Layer{
        constructor(game, image, speedModifier){
            this.game = game;
            this.image = image;
            this.speedModifier = speedModifier;
            this.width = 1768;
            this.height = 500;
            this.x = 0;
            this.y = 0;
        }

        update(){
            if(this.x <= -this.width) this.x = 0;
            this.x -= this.game.speed * this.speedModifier;
        }

        draw(context){
            context.drawImage(this.image, this.x, this.y);
            // pour ajouter une image identique à la suite d'une même image pour donner l'illusion qu'il n'y a qu'une seule image.
            context.drawImage(this.image, this.x + this.width, this.y);
        }
    }

    class Background{
        constructor(game){
            this.game = game;
            this.image1 = document.getElementById("layer1");
            this.image2 = document.getElementById("layer2");
            this.image3 = document.getElementById("layer3");
            this.image4 = document.getElementById("layer4");
            this.layer1 = new Layer(this.game, this.image1, 1);
            this.layer2 = new Layer(this.game, this.image2, 1);
            this.layer3 = new Layer(this.game, this.image3, 1);
            this.layer4 = new Layer(this.game, this.image4, 1);
            this.layers = [this.layer1, this.layer2, this.layer3];
        }

        update(){
            this.layers.forEach(layer => layer.update());
        }

        draw(context){
            this.layers.forEach(layer => layer.draw(context));
        }
    }

    class UI{
        constructor(game){
            this.game = game;
            this.fontSize = 25;
            this.fontFamily = "Helvitica";
            this.color = "white";
        }

        draw(context){
            context.save();
            context.fillStyle = this.color;
            context.shadowOffsetX = 2;
            context.shadowOffsetY = 2;
            context.shadowColor ="black";
            context.font = this.fontSize + "px " + this.fontFamily;
            // score
            context.fillText("score : " + this.game.score, 20, 40);
            // ammo
            for(let i = 0; i < this.game.ammo; i++){
                context.fillRect(20 + 5 * i, 50, 3, 20);
            }
            // timer
            const formattedTime = (this.game.gameTime * 0.001).toFixed(1);
            context.fillText("Timer : " + formattedTime, 20, 100);
            // game over messages
            if(this.game.gameOver){
                context.textAlign = "center";
                let message1;
                let message2;

                if(this.game.score > this.game.winningScore){
                    message1 = "You Win";
                    message2 = "Well done !";
                }else{
                    message1 = "You lose";
                    message2 = "Try again !";
                }
                context.font = "50px " + this.fontFamily;
                context.fillText(message1, this.game.width * 0.5, this.game.height * 0.5 - 40);
                context.font = "25px " + this.fontFamily;
                context.fillText(message2, this.game.width * 0.5, this.game.height * 0.5 + 40);
            }

            context.restore();
        }
    }

    class Game{
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.background = new Background(this);
            // crée une nouvelle instance de la class Player
            this.player = new Player(this);
            this.input = new InputHandler(this);
            this.ui = new UI(this);
            this.keys = [];
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.ammo = 20;
            this.maxAmmo = 50;
            this.ammoTimer = 0;
            this.ammoInterval = 500;
            this.gameOver = false;
            this.score = 0;
            this.winningScore = 10;
            this.gameTime = 0;
            this.timeLimit = 15000;
            this.speed = 1;
            this.debug = true;
        }
        
        update(deltaTime){
           if(!this.gameOver) this.gameTime += deltaTime;
           if(this.gameTime > this.timeLimit) this.gameOver = true;

            this.background.update();
            this.background.layer4.update();
            this.player.update();

            if(this.ammoTimer > this.ammoInterval){
                if(this.ammo < this.maxAmmo) this.ammo++;
                this.ammoTimer = 0;
            }else{
                this.ammoTimer += deltaTime;
            }

            this.enemies.forEach(enemy => {
                enemy.update();
                // player = rect1 & enemy = rect2
                if(this.checkCollision(this.player, enemy)){
                    enemy.markedForDeletion = true;
                }
                // la collision avec les projectiles. projectile = rect1 & enemy = rect2
                this.player.projectiles.forEach(projectile => {
                    if(this.checkCollision(projectile, enemy)){
                        enemy.lives--;
                        projectile.markedForDeletion = true;
                        if(enemy.lives < 0){
                            enemy.markedForDeletion = true;
                            // pour empêcher de gagner du score après la fin du timer
                            if(!this.gameOver) this.score += enemy.score;
                            if(this.score > this.winningScore) this.gameOver = true;
                        }
                    }
                })
            });
            this.enemies = this.enemies.filter(enemy => !enemy.markedForDeletion);
            if(this.enemyTimer > this.enemyInterval && !this.gameOver){
                this.addEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }
        }
      
        draw(context){
            this.background.draw(context);
            this.player.draw(context);
            this.ui.draw(context);
            this.enemies.forEach(enemy => {
                enemy.draw(context);
            });

            this.background.layer4.draw(context);
        }

        addEnemy(){
            // Math.random génère un nb aléatoire entre 0 et 1
            const randomize = Math.random();
            if(randomize < 0.5) this.enemies.push(new Angler1(this));
            else this.enemies.push(new Angler2(this));
            this.enemies.push(new Angler1(this));
        }

        // rect = rectangle
        checkCollision(rect1, rect2){
            return(
                rect1.x < rect2.x + rect2.width &&
                rect1.x + rect1.width > rect2.x &&
                rect1.y < rect2.y + rect2.height &&
                rect1.height + rect1.y > rect2.y
            )
        }
    }

    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;

    // animation loop
    function animate(timeStamp){
        // Le deltaTime est le temps qui s’est écoulé entre chaque frame.
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        // permet d'éviter au rectangle noir (futur perso) de s'étirer
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        // requestAnimationFrame indique au navigateur que nous souhaitons réaliser une animation et lui demande d'appeler une fonction spécifique pour mettre à jour l'animation avant la prochaine répétition.
        requestAnimationFrame(animate);
    }
    
    animate(0);
});