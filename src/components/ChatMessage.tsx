
import { Message } from "@/hooks/useMessages";

interface ChatMessageProps {
  message: Message;
}

export const ChatMessage = ({ message }: ChatMessageProps) => {
  return (
    <div className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
      <div className={`max-w-[85%] rounded-lg px-4 py-2 
        ${message.sender === "user" ? "bg-medical-500 text-white" : "bg-gray-100 text-gray-800"}`}
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
  );
};
