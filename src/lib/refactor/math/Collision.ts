import Game from "../Game";

// TODO: Bloquear a colisão do jogo quando tiver com o modal do final na frente (gameRunning)

export default class Collision {
    
    public static rectangleCollision(rect1: { x: number, y: number, width: number, height: number }, rect2: { x: number, y: number, width: number, height: number }) {
        
        return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    }
}