
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SendHorizontal } from "lucide-react";

interface ChatInputProps {
  input: string;
  setInput: (value: string) => void;
  handleSend: () => void;
  isLoading: boolean;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const ChatInput = ({ input, setInput, handleSend, isLoading, onKeyDown }: ChatInputProps) => {
  return (
    <div className="p-4 border-t mt-auto">
      <div className="flex gap-2">
        <Input
          placeholder="Ask about health or any topic..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1"
          disabled={isLoading}
        />
        <Button onClick={handleSend} disabled={isLoading} size="icon">
          <SendHorizontal className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
