import { writable } from 'svelte/store';

// O estado que diz se o modal está visível ou não
export const isErrorOpen = writable(false);

// O estado que guarda a mensagem de erro atual
export const errorMessage = writable('An unknow error happened.');

/**
 * Função global para disparar um erro de qualquer lugar da aplicação.
 * @param message A mensagem a ser exibida no modal.
 */
export function showError(message: string) {
    errorMessage.set(message); // Define a nova mensagem
    isErrorOpen.set(true);      // Abre o modal
}