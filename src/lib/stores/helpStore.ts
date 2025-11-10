import { writable } from 'svelte/store';

// false = modal fechado, true = modal aberto

export const isHelpModalOpen = writable(true);