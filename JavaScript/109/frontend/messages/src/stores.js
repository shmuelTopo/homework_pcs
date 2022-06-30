import { writable } from 'svelte/store';

export const selectedConversation = writable();
export const userConversations = writable([]);
export const userInfo = writable();
export const chatUsers = writable([]);

export const resetStore = () => {
  selectedConversation.set(undefined);
  userConversations.set([]);
  userInfo.set(undefined);
  chatUsers.set([]);
}