"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import {
  Send,
  FileText,
  CheckCircle,
  Sparkles,
  Menu,
  Moon,
  Sun,
  User,
  LogOutIcon,
} from "lucide-react";
import ChatSidebar from "@/components/chat-sidebar";
import ChatMessage from "@/components/chat-message";
import AiActionChip from "@/components/ai-action-chip";
import { useMutation, useQuery } from "@apollo/client";
import {
  CORRECT_GRAMMAR,
  GET_MESSAGES_BETWEEN_USERS,
  SEND_MESSAGE,
  SUMMARIZE_TEXT,
} from "../graphql/mutation";
import { useSelector } from "react-redux";
import { useSocket } from "@/hooks/useSocket";
import { Socket } from "socket.io-client";
import { AppState } from "@/store";
// import { useSelector } from "react-redux";

export default function ChatInterface() {
  // const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const { socket } = useSocket();
  const [darkMode, setDarkMode] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const onlineUsers = useSelector((state) => state.chat.onlineUsers);
  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Apply dark mode class to document
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const receiverId = useSelector((state: AppState) => state.chat.receiverId);

  const [sendMessage] = useMutation(SEND_MESSAGE);
  const [messages, setMessages] = useState([]);
  const [summarizeText, { loading: summarizeLoading }] =
    useMutation(SUMMARIZE_TEXT);
  const [correctGrammar, { loading: grammarLoading }] =
    useMutation(CORRECT_GRAMMAR);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?.id;

  const { data } = useQuery(GET_MESSAGES_BETWEEN_USERS, {
    variables: { userId, receiverId },
    skip: !userId || !receiverId,
  });

  useEffect(() => {
    if (data?.getMessagesBetweenUsers) {
      setMessages(data.getMessagesBetweenUsers);
    }
  }, [data]);

  useEffect(() => {
    if (!socket) return;

    const handleReceiveMessage = (message) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, [socket]);

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("handleSendMessage called");

    if (!input.trim()) return;
    if (!user || !receiverId) {
      console.error("User or receiver ID is missing!");
      return;
    }

    sendMessage({
      variables: {
        createMessageInput: { senderId: user.id, receiverId, text: input },
      },
    });

    if (socket?.connected) {
      socket.emit("sendMessage", {
        senderId: user.id,
        receiverId,
        text: input,
      });
    } else {
      console.error("Socket not connected, unable to send message.");
    }

    setInput("");
  };

  const handleAiAction = async (action) => {
    if (!input.trim()) {
      console.error("Text input is missing!");
      return;
    }

    try {
      const mutation = action === "summarize" ? summarizeText : correctGrammar;
      const { data } = await mutation({ variables: { text: input } });

      setInput(
        data?.[action === "summarize" ? "summarizeText" : "correctGrammar"] ||
          input
      );
    } catch (err) {
      console.error(`${action} error:`, err);
    }
  };

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const goToProfile = () => router.push("/profile");

  const logOut = () => {
    if (socket) {
      socket.disconnect();
      console.log("Socket disconnected");
    }
    localStorage.clear();
    router.push("/");
  };
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <ChatSidebar
        isOpen={sidebarOpen}
        isMobile={isMobile}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Header */}
        <header className="flex h-16 items-center justify-between border-b px-4 py-2">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="mr-2"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle sidebar</span>
            </Button>
            <h1 className="text-xl font-semibold">Chat</h1>
          </div>
          <div className="flex items-center space-x-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle theme</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={goToProfile}>
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Profile</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" onClick={logOut}>
                    <LogOutIcon className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>LogOut</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message._id} message={message} />
          ))}
        </div>

        {/* AI Action Chips */}
        <div className={`flex flex-wrap gap-2 px-4 py-2`}>
          <AiActionChip
            className={
              summarizeLoading
                ? "border border-blue-500"
                : "border border-transparent"
            }
            icon={FileText}
            label="Summarize"
            onClick={() => handleAiAction("summarize")}
          />
          <AiActionChip
            icon={CheckCircle}
            label="Correct Grammar"
            onClick={() => handleAiAction("grammar")}
            className={
              grammarLoading
                ? "border border-blue-500"
                : "border border-transparent"
            }
          />
          <AiActionChip
            icon={Sparkles}
            label="AI Reply Suggestion"
            onClick={() => handleAiAction("suggest")}
          />
        </div>

        {/* Message Input */}
        <form onSubmit={handleSendMessage} className="border-t p-4">
          <div className="flex items-center space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button type="submit" size="icon">
              <Send className="h-5 w-5" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
