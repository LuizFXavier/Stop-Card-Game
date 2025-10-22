export class AssetManager {
  
  private static _instance:AssetManager = new AssetManager();

  public static get instance(){
    return this._instance;
  }

  private constructor(){

  }

  public cardSpriteSheet: HTMLImageElement | null = null;
  
  // Caminho para a imagem
  private spriteSheetUrl = '/assets/do_meu_avo2.png';

  /**
   * Carrega todos os assets essenciais do jogo.
   * Retorna uma Promise que resolve quando tudo estiver carregado.
   */
  public async loadAssets(): Promise<void> {
    try {
      this.cardSpriteSheet = await this.loadImage(this.spriteSheetUrl);
      console.log('Sprite sheet das cartas carregado.');
      
      
    } catch (error) {
      console.error("Falha ao carregar assets:", error);
      throw error;
    }
  }

  
  private loadImage(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = url;
      image.onload = () => resolve(image);
      image.onerror = (err) => reject(new Error(`Falha ao carregar imagem: ${url}. Erro: ${err}`));
    });
  }

}