export class AssetManager {
  
  private static _instance:AssetManager = new AssetManager();

  public static get instance(){
    return this._instance;
  }

  private constructor(){

  }
  private assets: Map<string, HTMLImageElement> = new Map();

  // Caminhoa para aa imagens
  private toLoad = [
    { key: 'cards', url: '/assets/do_meu_avo_final.png' }, 
    { key: 'stack',  url: '/assets/stack.png' },
    { key: 'downCard',    url: '/assets/vermelhovirado.png' }
  ];

  /**
   * Carrega todos os assets essenciais do jogo.
   * Retorna uma Promise que resolve quando tudo estiver carregado.
   */
  public async loadAssets(): Promise<void> {
    try {
      // Carrega tudo em paralelo
      const promises = this.toLoad.map(async (item) => {
        const image = await this.loadImage(item.url);
        this.assets.set(item.key, image);
      });

      await Promise.all(promises);
      console.log('Todos os assets foram carregados.');

    } catch (error) {
      console.error("Erro fatal no carregamento:", error);
      throw error;
    }
  }

  public get(key: string): HTMLImageElement {
    const asset = this.assets.get(key);
    if (!asset) {
      throw new Error(`Erro Crítico: Tentativa de acessar asset '${key}' antes de carregá-lo ou chave incorreta.`);
    }
    return asset;
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