// Uma função que retorna uma Promise que resolve após ms milissegundos
export function wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
}