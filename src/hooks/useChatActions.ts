
import { useState } from "react";
import { Message } from "./useMessages";
import { getHealthRecommendations } from "@/services/mockHealthRecommendations";
import { getGeminiResponse } from "@/utils/geminiAI";

export const useChatActions = (setMessages: (messages: Message[]) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const GEMINI_API_KEY = "AIzaSyDzLWIPFPesO-mW81myJNBdEbQGuY6dJVk";

  const processMessage = async (input: string) => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const lowerInput = input.toLowerCase();
      if (lowerInput.includes("cholesterol") || 
          lowerInput.includes("diabetes") || 
          lowerInput.includes("blood pressure") || 
          lowerInput.includes("anemia") || 
          lowerInput.includes("thyroid")) {
        let disease = "";
        if (lowerInput.includes("cholesterol")) {
          disease = "High Cholesterol";
        } else if (lowerInput.includes("diabetes")) {
          disease = "Diabetes";
        } else if (lowerInput.includes("blood pressure")) {
          disease = "Hypertension";
        } else if (lowerInput.includes("anemia")) {
          disease = "Anemia";
        } else if (lowerInput.includes("thyroid")) {
          disease = "Thyroid Disorder";
        }
        
        const recommendations = await getHealthRecommendations(disease);
        const botMessage: Message = {
          id: Date.now().toString(),
          sender: "bot",
          text: `Here are some recommendations for ${disease}:`,
          recommendations: recommendations
        };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const geminiResponse = await getGeminiResponse(input, GEMINI_API_KEY);
        const botMessage: Message = {
          id: Date.now().toString(),
          sender: "bot",
          text: geminiResponse
        };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now().toString(),
        sender: "bot",
        text: "I'm sorry, I couldn't process your request. Please try again."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, processMessage };
};
