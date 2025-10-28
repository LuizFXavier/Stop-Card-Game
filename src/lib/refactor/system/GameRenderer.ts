import Card from '../gameObjects/Card';
import { AssetManager } from '../core/AssetManager';
import type Player from '../gameObjects/Player';

export class GameRenderer {
  private ctx: CanvasRenderingContext2D;
  private cardSheet: HTMLImageElement; // A REFERÊNCIA para a imagem única

  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
    
    const assetManager = AssetManager.instance;
    // Pega a imagem já carregada do AssetManager
    if (!assetManager.cardSpriteSheet) {
      throw new Error("GameRenderer criado antes do AssetManager carregar os assets!");
    }
    this.cardSheet = assetManager.cardSpriteSheet;
  }

  /**
   * Desenha uma única carta no canvas.
   * @param card O objeto Card que será desenhado
   */
  public drawCard(card: Card): void {

    let sx, sy;

    if(card.isUp){
      sx = card.srcCoord.x;
      sy = card.srcCoord.y;
    }
    else{
      sx = Card.faceDownCoord.x;
      sy = Card.faceDownCoord.y;
    }
    
    this.ctx.drawImage(
      this.cardSheet, // 1. A imagem *inteira* (sprite sheet)
      sx,             // 2. Source X (de onde recortar)
      sy,             // 3. Source Y (de onde recortar)
      Card.WIDTH_SPR,    // 4. Source Width (largura do recorte)
      Card.HEIGHT_SPR,   // 5. Source Height (altura do recorte)
      card.x,            // 6. Destination X (onde desenhar)
      card.y,            // 7. Destination Y (onde desenhar)
      Card.width,     // 8. Destination Width (tamanho final)
      Card.height     // 9. Destination Height (tamanho final)
    );
  }
  
  //Método para desenhar um conjunto de cartas
  public drawDeck(cards: Card[]): void {
    cards.forEach((card) => {
      this.drawCard(card);
    });
  }

  public drawPlayer(player:Player){
    this.drawDeck(player.hand)
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}