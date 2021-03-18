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
    this.setX = () => this.element.style.left = `${x}px`
    this.getBreadth = () => this.element.clientWidth

    this.raffleOpening()
    this.setX(x)
}

const b = new pairHurdling(700, 200, 800)
document.querySelector('[wm-flappy]').appendChild(b.element)
