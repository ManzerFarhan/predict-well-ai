
import { useState, useEffect } from "react";
import { HealthRecommendation } from "@/types/health";

export interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  recommendations?: HealthRecommendation | null;
}

export const useMessages = (isOpen: boolean) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Hi! I'm your AI health assistant powered by Gemini. I can help with health recommendations and answer general questions!"
    }
  ]);

  useEffect(() => {
    if (isOpen) {
      const helpMessage: Message = {
        id: "help-prompt",
        sender: "bot",
        text: "How may I help you today?"
      };
      
      setMessages(prevMessages => {
        const hasHelpMessage = prevMessages.some(msg => msg.id === "help-prompt");
        return hasHelpMessage ? prevMessages : [...prevMessages, helpMessage];
      });
    }
  }, [isOpen]);

  return { messages, setMessages };
};
