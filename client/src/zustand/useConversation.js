import { create } from "zustand";

const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  selectFriends: true,
  setSelectFriends: () =>
    set((state) => ({ selectFriends: !state.selectFriends })),
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
