import { writable } from 'svelte/store';

export const selectedConversation = writable();
export const userConversations = writable([]);
export const userInfo = writable();
export const chatUsers = writable([]);
export const newConversationS = writable();