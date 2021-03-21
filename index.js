function newElement(tagName, className){
    const elem = document.createElement(tagName)
    elem.className = className
    return elem
}

function hurdling(reverseH = false) {
    this.element = newElement('div', 'hurdling')

    const borderH = newElement('div', 'borderHurdling')
    const bodyH = newElement('div', 'bodyHurdling')
    this.element.appendChild(reverseH ? bodyH : borderH)
    this.element.appendChild(reverseH ? borderH : bodyH)

    this.setHeightH = heightH => bodyH.style.height = `${heightH}px`
}

//const b = new hurdling(true)
//b.setHeightH(200)
//document.querySelector('[wm-flappy]').appendChild(b.element)

function pairHurdling(heightH, opening, x){
    this.element = newElement('div', 'pairHurdling')

    this.upp = new hurdling(true)
    this.les = new hurdling(false)

    this.element.appendChild(this.upp.element)
    this.element.appendChild(this.les.element)

    this.raffleOpening = () => {
        const heightUpp = Math.random() * (heightH - opening)
        const heightLes = heightH - opening - heightUpp
        this.upp.setHeightH(heightUpp)
        this.les.setHeightH(heightLes)
    }
    this.getX = () => parseInt(this.element.style.left.split('px')[0])
    this.setX = x => this.element.style.left = `${x}px`
    this.getBreadth = () => this.element.clientWidth

    this.raffleOpening()
    this.setX(x)
}

//const b = new pairHurdling(700, 200, 800)
//document.querySelector('[wm-flappy]').appendChild(b.element)

function hurdlings(heightH, Breadth, opening, spaceH, notifyPoint) {
    this.pairs = [
        new pairHurdling(heightH, opening, Breadth),
        new pairHurdling(heightH, opening, Breadth + spaceH),
        new pairHurdling(heightH, opening, Breadth + spaceH * 2),
        new pairHurdling(heightH, opening, Breadth + spaceH * 3)
    ]
    const displacement  = 3
    this.animateH = () => {
        this.pairs.forEach(pair => {
            pair.setX(pair.getX() - displacement)

            // when element get out game area
            if  (pair.getX() < -pair.getBreadth()){
                pair.setX(pair.getX() + spaceH * this.pairs.length)
                pair.raffleOpening()
            }
            const middleH = Breadth / 2
            const crossMiddle = pair.getX( ) + displacement >= middleH
                && pair.getX( ) < middleH
                if(crossMiddle)  notifyPoint( )
        })
    }
}

function bird(heightGame) {
    let flayH = false

    this.element = newElement('img', 'bird')
    this.element.src = 'imgs/Bird.png'

    this.getY = () => parseInt(this.element.style.bottom.split('px')[0])
    this.setY = y => this.element.style.bottom = `${y}px`

    window.onkeydown = e => flayH = true
    window.onkeyup = e => flayH = false

    this.animateH = () => {
        const newY = this.getY() + (flayH ? 8 : -5)
        const heightMax = heightGame - this.element.clientHeight

        if (newY <= 0) {
            this.setY(0)
        } else if (newY >= heightMax){
            this.setY(heightMax)
        } else {
            this.setY(newY)
        }
    }
    this.setY(heightGame / 2)
}


const hurdlingsH = new hurdlings(700, 1200, 200, 400)
const birdH = new bird(700)
const areaGame =  document.querySelector('[wm-flappy]')

areaGame.appendChild(birdH.element)
hurdlingsH.pairs.forEach( pair => areaGame.appendChild(pair.element))
setInterval( () => {
    hurdlingsH.animateH( )
    birdH.animateH()
}, 20)