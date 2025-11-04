import Card from '../gameObjects/Card';
import { AssetManager } from '../core/AssetManager';
import type Player from '../gameObjects/Player';
import type Pile from '../gameObjects/Pile';

// todo: Renderizar pilhas e botões

export class GameRenderer {
  private ctx: CanvasRenderingContext2D;
  private cardSheet: HTMLImageElement; // A REFERÊNCIA para a imagem única
  private pileSprite: HTMLImageElement;

  constructor(context: CanvasRenderingContext2D) {
    this.ctx = context;
    
    const assetManager = AssetManager.instance;
    // Pega a imagem já carregada do AssetManager
    if (!assetManager.cardSpriteSheet || !assetManager.pileSpriteSheet) {
      throw new Error("GameRenderer criado antes do AssetManager carregar os assets!");
    }
    this.cardSheet = assetManager.cardSpriteSheet;
    this.pileSprite = assetManager.pileSpriteSheet;
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

  public drawPile(pile:Pile){
    this.ctx.drawImage(
      this.pileSprite, // 1. A imagem *inteira* (sprite sheet)
      0,             // 2. Source X (de onde recortar)
      0,             // 3. Source Y (de onde recortar)
      Card.WIDTH_SPR,    // 4. Source Width (largura do recorte)
      Card.HEIGHT_SPR,   // 5. Source Height (altura do recorte)
      pile.x,            // 6. Destination X (onde desenhar)
      pile.y,            // 7. Destination Y (onde desenhar)
      Card.width,     // 8. Destination Width (tamanho final)
      Card.height     // 9. Destination Height (tamanho final)
    );
  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}