var canvas = document.querySelector("canvas");
canvas.width = innerWidth;
canvas.height = innerHeight;

var ctx = canvas.getContext("2d");
var mouse={
    x:undefined,
    y:undefined
}


addEventListener("resize",function(){
    canvas.width = innerWidth;
    canvas.height = innerHeight;
});

function getRandomColor(){
    var colors =['#f21170','#72147e','#fa9905',"#ff5200"];
    return colors[Math.floor(Math.random()*colors.length)]; 
}


var gravity = 0.03;
var friction = .99;

class Particle{
    constructor(x,y,radius,color,velocity){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.velocity = {
            x:velocity.x,
            y:velocity.y
        }
        this.opacity = 1;
    }

    draw(){
        ctx.save()
        ctx.globalAlpha =this.opacity;

        ctx.beginPath();
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI,false);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    update(){
        this.draw();
        this.velocity.x *= friction;
        this.velocity.y *= friction;
        this.velocity.y += gravity;
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.opacity-=0.003;
        
    }
}

var particles;

function init(){
    particles=[];
}


var particleSpeed = 12;
addEventListener("click",(event)=>{
    mouse.x = event.clientX;
    mouse.y = event.clientY;
    var particleCount = 500;
    var angleIncrement = Math.PI * 2 / particleCount;
    var color = getRandomColor();
    for(var i=0;i<particleCount;i++){
        particles.push( new Particle(mouse.x,mouse.y,5,color,{
            x:  Math.cos(angleIncrement*i) *Math.random()*particleSpeed,
            y: Math.sin(angleIncrement*i)*Math.random()*particleSpeed
                }
            )
        );
    }
})

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle='rgba(0,0,0,.05)'
    ctx.fillRect(0,0,canvas.width,canvas.height);
    particles.forEach((particle, i) => {
        if (particle.opacity > 0) {
          particle.update()
        } else {
          particles.splice(i, 1)
        }
      })
}


init();
animate();
