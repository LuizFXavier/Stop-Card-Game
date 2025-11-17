
enum Positions{
    bottom,
    right,
    top,
    left
}

export class LayoutSystem{
    cardWidht:number;
    cardHeight:number;
    windowW:number;
    windowH:number;

    constructor(windowW:number, windowH:number, cardW:number, cardH:number){
        this.cardWidht = cardW;
        this.cardHeight = cardH;
        this.windowW = windowW;
        this.windowH = windowH
    }

    pilePos():{x:number, y:number}{
        let x!:number, y!:number;
        
        x = this.windowW - this.cardWidht * 2;
        y = this.windowH - this.cardHeight * 1.6;

        return {x:x, y:y};
    }

    playerPos(pos:number):{x:number, y:number}{
        let x!:number, y!:number;

        switch (pos) {
            case Positions.bottom:
                x = this.windowW * 1/2;
                y = this.windowH -this.cardHeight *1.3;
                break;
        
            case Positions.right:
                x = this.windowW -this.cardHeight *1.4;
                y = this.windowH * 1/2;
                break;
            
            case Positions.top:
                x = this.windowW * 1/2;
                y = this.cardHeight *1.3;
                break;

            case Positions.left:
                x = this.cardHeight *1.4;
                y = this.windowH * 1/2;
                break;
        }
        return {x:x, y:y};
    }
}