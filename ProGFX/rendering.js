
/** @type {HTMLCanvasElement} */
const cvs = document.getElementById("cvs")


/** @type {CanvasRenderingContext2D} */
const ctx = cvs.getContext("2d")

let pixelPercentage = 0.8
let clearColor = "#000000"
let fillColor  = "#ffffff"
let zoom = 1

// TODO: Finish this object:
const render = {

    /**
     * Sets the percentage of window pixes that will be rendered on screen.
     * @param {number} newPixelPercantage 
     * */
    setPixelPercentage(newPixelPercantage) {
        pixelPercentage = newPixelPercantage
    },

    /**
     * Gets the percentage of window pixes that are rendered on screen.
     * */
    getPixelPercentage() {
        return pixelPercentage 
    },
    
    /**
     * Sets the color that will clear the screen when calling renderer.clear()
     * @param {String} color 
     * */
    setClearColor(color) {
        clearColor = color
    },

    /** @returns {String} */
    getClearColor() {
        return clearColor
    },

    /**
     * Sets the color that will be used to fill rectangles.
     * @param {String} color 
     * */
    setFillColor(color) {
        fillColor = color
    },

    /** @returns {String} */
    getFillColor() {
        return fillColor
    },


    setZoom(zoomAmount) {
        zoom = zoomAmount
    },

    /** @returns {number} */
    getZoom() {
        return zoom
    },

    /**
     * @description Clears the screen.
     */
    clear() {
        ctx.fillStyle = clearColor
        ctx.fillRect(-cvs.width * 0.5, -cvs.height * 0.5, cvs.width, cvs.height)
    },

    

    /** 
     * @description Draws images using position, width, height, offset, and rotation.
     * @param {HTMLImageElement} image  
     * @param {number} x
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {number} oX 
     * @param {number} oY 
     * @param {number} rot
    */
    drawImage(image, x, y, w, h, oX, oY, rot) {

        switch (arguments.length) {
            // Draw normal.
            case 3:
                ctx.drawImage(image, x, y)
                break
            
            // Draw with w, and h.
            case 5:
                x *= zoom
                y *= zoom
                w *= zoom
                h *= zoom
                ctx.drawImage(image, x, y, w, h)

            // Draw with offset.
            case 7:
                x += oX
                y += oY
                x *= zoom
                y *= zoom
                w *= zoom
                h *= zoom
                ctx.drawImage(image, x, y, w, h)
                break

            // Draw with rotation.
            case 8:
                x *= zoom
                y *= zoom
                w *= zoom
                h *= zoom
                oX *= zoom
                oY *= zoom
                ctx.save()
                ctx.translate(x, y)
                ctx.rotate(rot)
                ctx.drawImage(image, oX, oY, w, h)
                ctx.restore()
                break

            
            // Warn.
            default:
                console.log("WARN: drawImage() incorrect number of arguments: " + arguments.length)
        }

    },


    /**
     * @description Draws rectangles using position, width, height, offset, and rotation.
     * @param {number} x 
     * @param {number} y 
     * @param {number} w 
     * @param {number} h 
     * @param {number} oX
     * @param {number} oY 
     * @param {number} rot 
     */
    fillRect(x, y, w, h, oX, oY, rot) {
        ctx.fillStyle = fillColor

        switch (arguments.length) {
            // Draw normal.
            case 4:
                x *= zoom
                y *= zoom
                w *= zoom
                h *= zoom
                ctx.fillRect(x, y, w, h)
                break


            // Draw with offset.
            case 6:
                x += oX
                y += oY
                x *= zoom
                y *= zoom
                w *= zoom
                h *= zoom
                ctx.fillRect(x, y, w, h)
                break

            // Draw with rotation.
            case 7:
                x *= zoom
                y *= zoom
                w *= zoom
                h *= zoom
                oX *= zoom
                oY *= zoom
                ctx.save()
                ctx.translate(x, y)
                ctx.rotate(rot)
                ctx.fillRect(oX, oY, w, h)
                ctx.restore()
                break

            
            // Warn.
            default:
                console.log("WARN: drawRect() incorrect number of arguments: " + arguments.length)
        }
    }
}

// Setup
cvs.width  = window.innerWidth  * pixelPercentage
cvs.height = window.innerHeight * pixelPercentage
cvs.style.width  = "100%"
cvs.style.height = "100%"
ctx.translate(cvs.width * 0.5, cvs.height * 0.5)


// Events
window.addEventListener("resize", function() {
    cvs.width  = window.innerWidth  * pixelPercentage
    cvs.height = window.innerHeight * pixelPercentage
    ctx.translate(cvs.width * 0.5, cvs.height * 0.5)
    render.clear()
})


export { render, cvs, ctx }