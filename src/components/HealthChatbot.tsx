import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { MessageCircle, SendHorizontal } from "lucide-react";
import { getHealthRecommendations } from "@/services/mockHealthRecommendations";
import { HealthRecommendation } from "@/types/health";
import { getGeminiResponse } from "@/utils/geminiAI";
import { toast } from "sonner";

interface Message {
  id: string;
  sender: "user" | "bot";
  text: string;
  recommendations?: HealthRecommendation | null;
}

const HealthChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "👋 Hi! I'm your AI health assistant powered by Gemini. I can help with health recommendations and answer general questions!"
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const GEMINI_API_KEY = "AIzaSyDzLWIPFPesO-mW81myJNBdEbQGuY6dJVk";

  useEffect(() => {
    if (open) {
      const helpMessage: Message = {
        id: "help-prompt",
        sender: "bot",
        text: "How may I help you today?"
      };
      
      setMessages(prevMessages => {
        const hasHelpMessage = prevMessages.some(msg => msg.id === "help-prompt");
        return hasHelpMessage 
          ? prevMessages 
          : [...prevMessages, helpMessage];
      });
    }
  }, [open]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: input
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput("");
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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    handleSend();
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-medical-500 hover:bg-medical-600 shadow-lg"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-md p-0 flex flex-col h-full">
        <SheetHeader className="px-4 py-3 border-b">
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-medical-500">
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
                <path d="M3.22 12H9.5l.5-1 .5 1h6.28"></path>
              </svg>
              Health Assistant + Gemini AI
            </div>
          </SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto px-4 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div 
                  className={`max-w-[85%] rounded-lg px-4 py-2 
                    ${message.sender === "user" 
                      ? "bg-medical-500 text-white" 
                      : "bg-gray-100 text-gray-800"}`}
                >
                  <p>{message.text}</p>
                  
                  {message.recommendations && (
                    <div className="mt-3 space-y-3">
                      {message.recommendations.medications.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm">Medications:</h4>
                          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                            {message.recommendations.medications.map((med, idx) => (
                              <li key={idx}>
                                <span className="font-medium">{med.name}</span> ({med.dosage})
                                <p className="text-xs ml-5">{med.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {message.recommendations.exercises.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm">Exercises:</h4>
                          <ul className="list-disc list-inside text-sm mt-1 space-y-1">
                            {message.recommendations.exercises.map((ex, idx) => (
                              <li key={idx}>
                                <span className="font-medium">{ex.name}</span> ({ex.frequency})
                                <p className="text-xs ml-5">{ex.description}</p>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {message.recommendations.lifestyle.length > 0 && (
                        <div>
                          <h4 className="font-medium text-sm">Lifestyle Changes:</h4>
                          <ul className="list-disc list-inside text-sm mt-1">
                            {message.recommendations.lifestyle.map((item, idx) => (
                              <li key={idx}>{item}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg px-4 py-2 max-w-[85%]">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
        
        <div className="p-4 border-t mt-auto">
          <div className="flex gap-2">
            <Input
              placeholder="Ask about health or any topic..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1"
              disabled={isLoading}
            />
            <Button onClick={handleSend} disabled={isLoading} size="icon">
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default HealthChatbot;
