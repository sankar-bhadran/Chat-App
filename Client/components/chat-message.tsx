import { cn } from "@/lib/utils";

interface Message {
  id: number;
  text: string;
  senderId: string;
  receiverId: string;
  timestamp: string;
}

interface ChatMessageProps {
  message: Message;
}

export default function ChatMessage({ message }: ChatMessageProps) {
  const userString = localStorage.getItem("user");
  const user = JSON.parse(userString);
  const userId = user.id;
  const isUser = message.senderId === userId; // Check if the message is from the logged-in user

  return (
    <div className={cn("flex", isUser ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[80%] rounded-lg px-4 py-2",
          isUser ? "bg-blue-500 text-white" : "bg-blue-100 text-black"
        )}
      >
        <div className="flex flex-col">
          <p>{message.text}</p>
          <span className="mt-1 text-xs text-gray-600">
            {message.timestamp}
          </span>
        </div>
      </div>
    </div>
  );
}
