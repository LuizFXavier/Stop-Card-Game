import Card from '../gameObjects/Card';
import { AssetManager } from '../core/AssetManager';
import type Player from '../gameObjects/Player';
import Pile from '../gameObjects/Pile';
import type Button from '../UI/Button';
import type Discard from '../gameObjects/Discard';

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

    if(!card.valid){
      return;
    }

    let sx, sy;

    if(card.isUp){
      sx = card.srcCoord.x;
      sy = card.srcCoord.y;
    }
    else{
      sx = Card.faceDownCoord.x;
      sy = Card.faceDownCoord.y;
    }
    
    if(card.rotation === 0){
      this.ctx.drawImage(
        this.cardSheet, // 1. A imagem *inteira* (sprite sheet)
        sx,             // 2. Source X (de onde recortar)
        sy,             // 3. Source Y (de onde recortar)
        Card.WIDTH_SPR,    // 4. Source Width (largura do recorte)
        Card.HEIGHT_SPR,   // 5. Source Height (altura do recorte)
        card.x,            // 6. Destination X (onde desenhar)
        card.y,            // 7. Destination Y (onde desenhar)
        card.width,     // 8. Destination Width (tamanho final)
        card.height     // 9. Destination Height (tamanho final)
      );
      this.ctx.fillStyle = "#00F";
    this.ctx.fillRect(card.x, card.y, 4,4)
      return;
    }
    

    const centerX = card.x + card.width / 2;
    const centerY = card.y + card.height / 2;
    
    this.ctx.save();

    this.ctx.translate(centerX, centerY);
    this.ctx.rotate(card.rotation);

    this.ctx.drawImage(
      this.cardSheet,
      card.srcCoord.x,
      card.srcCoord.y,
      Card.WIDTH_SPR, 
      Card.HEIGHT_SPR,
      -Card.width / 2, // Posição X relativa ao novo centro
      -Card.height / 2, // Posição Y relativa ao novo centro
      Card.width,
      Card.height
    );

    this.ctx.restore();

    this.ctx.fillStyle = "#00F";
    this.ctx.fillRect(card.x, card.y, 4,4)
  }
  
  //Método para desenhar um conjunto de cartas
  public drawDeck(cards: Card[]): void {
    cards.forEach((card) => {
      this.drawCard(card);
    });
  }

  public drawPlayer(player:Player){
    this.drawDeck(player.hand)
    this.drawCard(player.drawnCard)
    this.ctx.fillStyle = "#F00";
    this.ctx.fillRect(player.x, player.y, 2,2)
    
  }

  public drawPile(pile:Pile){
    
    this.ctx.drawImage(
      this.pileSprite, // 1. A imagem *inteira* (sprite sheet)
      0,             // 2. Source X (de onde recortar)
      0,             // 3. Source Y (de onde recortar)
      Pile.WIDTH_SPR,    // 4. Source Width (largura do recorte)
      Pile.HEIGHT_SPR,   // 5. Source Height (altura do recorte)
      pile.x,            // 6. Destination X (onde desenhar)
      pile.y,            // 7. Destination Y (onde desenhar)
      Card.width,     // 8. Destination Width (tamanho final)
      Card.height     // 9. Destination Height (tamanho final)
    );
  }

  public drawDiscard(discard:Discard){
    
    this.drawCard(discard.getTop()!);
  }

  public drawButton(button:Button){
    if(!button.visible){
      return;
    }

    this.ctx.fillStyle = button.color;
    this.ctx.fillRect(button.x, button.y, button.width, button.height);

  }

  public clear(): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }
}