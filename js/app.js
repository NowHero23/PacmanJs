import { Layer } from "./layer.js"
import { Loop } from "./loop.js";

import { Pacman, Pellet , RedGhost } from "./entityes.js";
import { Wall, GhostLair } from "./tiles.js";


class App { 
    #isFieldLoaded = false;
    #fullMap;
    constructor(container){
        this.scoreLabel = document.querySelector('#score');
        this.gameLayer = new Layer(container);
        this.fieldLayer = new Layer(container);

        this.currentLevel = 0;
        this.level = {
            0:{
                field:[
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,      1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 3, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,      1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 3, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,      1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,      1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,      1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,      1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,      1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,      1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4,      4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 2,      2, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,      2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                    
                    [4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 1, 2, 2, 2,      2, 2, 2, 1, 4, 0, 0, 0, 4, 4, 4, 4, 4, 4],
                    
                    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 2, 2, 2,      2, 2, 2, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 1, 1, 1, 1,      1, 1, 1, 1, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 0, 1, 1, 4, 4, 4, 4, 4,      4, 4, 4, 4, 4, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,      1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                    [1, 1, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,      1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,      1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,      1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1,      1, 0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0, 1],
                    [1, 3, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 4,      4, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 3, 1],
                    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,      1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
                    [1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1,      1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1],
                    [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,      1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1],
                    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,      1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1,      1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
                    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,      0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
                    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,      1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
                ],
                  // 0 - pac-dots
                  // 1 - wall
                  // 2 - ghost-lair
                  // 3 - power-pellet
                  // 4 - empty,
                fieldColor:'blue',
                taming:[7,20,7,20,5,20,5],
            },
        }
        this.wallTiles = []
        this.ghostLairTiles = []
        this.pellets = []
        this.blockSize = 8 * 2;
        
        this.ghostsStates = 0

        this.pacman = new Pacman({
            position:{
                x:this.blockSize / 2 + this.blockSize * 13 + this.blockSize / 2,
                y:this.blockSize / 2 + this.blockSize * 23,
            },
            velocity:{
                x:0,
                y:0
            },
            blockSize:this.blockSize,
            ctx:this.gameLayer
        });

        this.ghosts = [
            new RedGhost({
                position:{
                x: this.blockSize / 2 + this.blockSize * 13 + this.blockSize,
                y: this.blockSize * 11+ this.blockSize / 2 ,
            },
            velocity:{
                x: 0,
                y: 0
            },
            blockSize: this.blockSize,
            ctx: this.gameLayer,
            field: this.level[this.currentLevel].field,
        }),
        
        ]
        

        this.inputState = {
            UP: false,
            DOWN: false,
            LEFT: false,
            RIGHT: false,
            DEBAG: false     
        };

        this.range = this.pacman.radius + this.blockSize * 2;

        this.lastKey = "";
        this.score = 0;
        
        this.selectLevel.bind(this)
        this.selectLevel()
        
        new Loop(this.update.bind(this), this.display.bind(this))

        this.reloadField = this.reloadField.bind(this)
        addEventListener('resize',() => { this.reloadField() })
    }
    selectLevel(){
        this.wallTiles = [];
        this.ghostLairTiles = []
        this.pellets = []


        this.level[this.currentLevel].field.forEach((row, i) => {
            row.forEach((frame, j) => {
                switch (frame) {
                    case 1:
                        this.wallTiles.push(
                            new Wall({
                                position:{
                                    x:this.blockSize * j,
                                    y:this.blockSize * i
                                },
                                blockSize: this.blockSize,
                                ctx: this.fieldLayer, 
                                level: this.level[this.currentLevel]
                            })
                        )
                        break;

                    case 0:
                        //console.log("work");//252
                        this.pellets.push(
                            new Pellet({
                                position:{
                                    x:this.blockSize * j + this.blockSize / 2,
                                    y:this.blockSize * i + this.blockSize / 2
                                },
                                    blockSize: this.blockSize,
                                    ctx: this.gameLayer
                            })
                        )
                        break;

                    case 2: //2 - ghost-lair
                        this.ghostLairTiles.push(
                            new GhostLair({
                                position:{
                                    x:this.blockSize * j,
                                    y:this.blockSize * i
                                },
                                blockSize: this.blockSize,
                                ctx: this.fieldLayer, 
                                level: this.level[this.currentLevel]
                            }))
                        break;

                    default:
                        break;
                }
                
            });
        }); 
        this.#fullMap = this.wallTiles.concat(this.ghostLairTiles)
        // console.log(this.ghostLairTiles);
        // console.log(this.pellets);

    }
    reloadField(){
        this.fieldLayer.context.clearRect(0, 0, this.gameLayer.width, this.gameLayer.height);


        this.#fullMap.forEach((tile) => {
            tile.display(this.inputState.DEBAG)})
    }
    update(correction) {
        var queryMap = this.#fullMap.filter((tile)=>{
            const dist = Math.sqrt((this.pacman.position.x - tile.position.x) ** 2 + (this.pacman.position.y - tile.position.y) ** 2);
            return (dist < this.range)
        })

        if(this.inputState.UP && this.lastKey==='UP'){
            for (let i = 0; i < queryMap.length; i++) {
                const tile = queryMap[i];
                if(this.circleCollidesWithRectangle({
                    circle:{...this.pacman, velocity:{
                        x:0,
                        y:-this.pacman.speed
                    }},
                    rectangle:tile,
                    correction:correction
                })){
                    this.pacman.velocity.y = 0; 
                    break
                }else{
                    this.pacman.velocity.y = -this.pacman.speed; 
                }
            };
        } else if(this.inputState.LEFT && this.lastKey==='LEFT'){
            for (let i = 0; i < queryMap.length; i++) {
                const tile = queryMap[i];
                if(this.circleCollidesWithRectangle({
                    circle:{...this.pacman, velocity:{
                        x:-this.pacman.speed,
                        y:0
                    }},
                    rectangle:tile,
                    correction:correction
                })){
                    this.pacman.velocity.x = 0; 
                    break
                }else{
                    this.pacman.velocity.x = -this.pacman.speed; 
                }
            };
        } else if(this.inputState.DOWN && this.lastKey==='DOWN'){
            for (let i = 0; i < queryMap.length; i++) {
                const tile = queryMap[i];
                if(this.circleCollidesWithRectangle({
                    circle:{...this.pacman, velocity:{
                        x:0,
                        y:this.pacman.speed
                    }},
                    rectangle:tile,
                    correction:correction
                })){
                    this.pacman.velocity.y = 0; 
                    break
                }else{
                    this.pacman.velocity.y = this.pacman.speed; 
                }
            };
        } else if(this.inputState.RIGHT && this.lastKey==='RIGHT'){
            for (let i = 0; i < queryMap.length; i++) {
                const tile = queryMap[i];
                if(this.circleCollidesWithRectangle({
                    circle:{...this.pacman, velocity:{
                        x:this.pacman.speed,
                        y:0
                    }},
                    rectangle:tile,
                    correction:correction
                })){
                    this.pacman.velocity.x = 0; 
                    break
                }else{
                    this.pacman.velocity.x = this.pacman.speed; 
                }
            };
        }

        queryMap.forEach((tile) => {
            if(this.circleCollidesWithRectangle({
                circle:this.pacman,
                rectangle:tile,
                correction:correction
            })
            ){
                this.pacman.velocity.x = 0;
                this.pacman.velocity.y = 0;   
            }   
        });

        this.pacman.update(correction);
        

        this.ghosts.forEach((ghost)=>{

            queryMap = this.wallTiles.filter((tile)=>{
                const dist = Math.sqrt((ghost.position.x - tile.position.x) ** 2 + (ghost.position.y - tile.position.y) ** 2);
                return (dist < this.range)
            })

            // queryMap.forEach((tile) => {
            //     if(this.circleCollidesWithRectangle({
            //         circle: ghost,
            //         rectangle:tile,
            //         correction:correction
            //     })
            //     ){
            //         // ghost.position.x += -ghost.velocity.x * correction;
            //         // ghost.position.y += -ghost.velocity.y * correction; 
            //         // ghost.velocity.x = 0;
            //         // ghost.velocity.y = 0;
                         
            //     }  
            // })

            ghost.update({
                correction: correction, 
                pacman:this.pacman})
        })


        for (let i = this.pellets.length-1; 0 <= i; i--) {
            const pellet = this.pellets[i];

            if (Math.hypot(pellet.position.x - this.pacman.position.x, pellet.position.y - this.pacman.position.y) < pellet.radius + this.pacman.radius){
                this.pellets.splice(i, 1)
                this.score += 10;
                this.scoreLabel.innerHTML = this.score;
            }
        }

    }
    display(){
        if(!this.#isFieldLoaded){
            this.reloadField()
            this.#isFieldLoaded = true;
        }
        this.gameLayer.context.clearRect(0, 0, this.gameLayer.width, this.gameLayer.height);

        this.pacman.display(this.inputState.DEBAG);
        
        this.pellets.forEach(pellet => {
            pellet.display()
        });
        this.ghosts.forEach((ghost)=>{
            ghost.display(this.inputState.DEBAG)

        })

        
    }

    circleCollidesWithRectangle = ({circle, rectangle, correction}) =>{
        if(circle.position.x < 0 - this.blockSize){
            circle.position.x = this.gameLayer.width + this.blockSize;
        } else if(circle.position.x > this.gameLayer.width + this.blockSize){
            circle.position.x = 0 - this.blockSize ;
        }

        if(circle.position.y < 0 - this.blockSize){
            circle.position.y = this.gameLayer.height + this.blockSize;
        } else if(circle.position.y > this.gameLayer.height + this.blockSize){
            circle.position.y = 0 - this.blockSize;
        }


        return (circle.position.y - circle.radius + circle.velocity.y * correction <= rectangle.position.y + rectangle.h 
            &&  circle.position.x + circle.radius + circle.velocity.x * correction >= rectangle.position.x 
            &&  circle.position.y + circle.radius + circle.velocity.y * correction >= rectangle.position.y 
            &&  circle.position.x - circle.radius + circle.velocity.x * correction <= rectangle.position.x + rectangle.w)
    }

}

let app;
onload = () => {
    app = new App(document.querySelector('.field'));
}
onkeydown = (e) => {
    switch (e.code) {
        case 'KeyW':{
            app.inputState.UP = true
            app.lastKey = 'UP'       
        }
        break;
        case 'KeyA':{
            app.inputState.LEFT = true
            app.lastKey = 'LEFT'    
        }
        break;
        case 'KeyS':{
            app.inputState.DOWN = true
            app.lastKey = 'DOWN'                
        }
        break;
        case 'KeyD':{
            app.inputState.RIGHT = true
            app.lastKey = 'RIGHT'
        }
        break;
        case 'KeyR':{
            if (app.inputState.DEBAG) {
                app.inputState.DEBAG = false
            }
            else{
                app.inputState.DEBAG=true
            }
            app.fieldLayer.context.clearRect(0, 0, app.fieldLayer.width, app.fieldLayer.height)

            app.reloadField()
        }
        break;
        default:
            break;
    }
}

onkeyup= (e) => {
    switch (e.code) {
        case 'KeyW':{
            app.inputState.UP = false
        }
        break;
        case 'KeyA':{
            app.inputState.LEFT = false
        }
        break;
        case 'KeyS':{
            app.inputState.DOWN = false
        }
        break;
        case 'KeyD':{
            app.inputState.RIGHT = false
        }
        break;
        default:
            break;
    }
}
