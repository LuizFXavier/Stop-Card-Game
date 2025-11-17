import { writable } from 'svelte/store';

// false = modal fechado, true = modal aberto

export const stopWinner = writable('Unknow winner.');
export const isStopModalOpen = writable(false);