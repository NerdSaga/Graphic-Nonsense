import { render, ctx, cvs } from "./ProGFX/rendering.js"



let images = []

images.push(new Image())
images[0].src = "./Images/Buddy.png"

images.push(new Image())
images[1].src = "./Images/Caramel.png"

images.push(new Image())
images[2].src = "./Images/Dexter.png"

images.push(new Image())
images[3].src = "./Images/Grumpo.png"

images.push(new Image())
images[4].src = "./Images/Radish.png"

// images.push(new Image())
// images[5].src = "./Images/Buddy-Boxed.png"


render.setClearColor("#330033")

let currentImage = 0
let rot = 0
let requiredFrames = 12
let frames = 0
let zoom = 1

function update() {


    render.clear()

    if (frames >= requiredFrames) {
        currentImage++
        if (currentImage > images.length - 1) {
            currentImage = 0
        }
        frames = 0
    }

    render.setZoom(cvs.height / 950)
    render.setFillColor("#ffffff22")
    render.fillRect(0, 0, 700, 700, -350, -350, rot)

    zoom = (Math.cos(Date.now() * 0.002) + 4) * 0.2
    render.setZoom(cvs.height / 350 * zoom)

    render.setFillColor("#29002288")
    render.fillRect(0, 0, 200, 200, -100, -100, -rot * 0.5)

    render.setFillColor("#22002855")
    render.fillRect(-250, 0, 200, 200, -100, -100, -rot * 0.5)

    render.setFillColor("#22002855")
    render.fillRect(250, 0, 200, 200, -100, -100, -rot * 0.5)


    render.drawImage(images[currentImage], 0, 0, 150, 150, -75, -75, rot)
    render.drawImage(images[currentImage], -250, 0, 150, 150, -75, -75, rot)
    render.drawImage(images[currentImage], 250, 0, 150, 150, -75, -75, rot)

    ctx.beginPath()
    ctx.fillStyle = "#4444aa"
    ctx.arc(cirLoc[0], cirLoc[1], 25, 0, Math.PI * 2, false)
    ctx.fill()
    ctx.closePath()
    

    rot += 0.05





    frames++

}

var cirLoc = []
cvs.addEventListener("mousemove", (ev) => {
    cirLoc[0] = ev.clientX + -cvs.width * 0.5
    cirLoc[1] = ev.clientY + -cvs.height * 0.5
})


let fps = 45
let requiredElapsed = 1000 / fps
let elapsed = 0
let now = 0
let then = Date.now()


function loop() {
    now = Date.now()
    elapsed = now - then
    if (elapsed > requiredElapsed) {
        update()
        
        then = now
    }
    requestAnimationFrame(loop)
}

// ctx.scale(cvs.height / 350, cvs.height / 350)
window.addEventListener("resize", function() {
    // ctx.scale(cvs.height / 350, cvs.height / 350)
})
requestAnimationFrame(loop)