import { create } from "zustand";

const useConversation = create((set) => ({
  //think of this as state
  selectedConversation: null,
  //and below argument as setter function
  setSelectedConversation: (selectedConversation) =>
    set({ selectedConversation }),
  messages: [],
  setMessages: (messages) => set({ messages }),
}));

export default useConversation;
