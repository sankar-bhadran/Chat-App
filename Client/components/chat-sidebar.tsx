"use client";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Search, Plus } from "lucide-react";
import { GET_ALL_USERS_EXCEPT_CURRENT } from "../graphql/mutation";
import { useQuery } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";
import { setReceiverId } from "../lib/redux/chatSlice";
import { AppState } from "@/store";

interface ChatSidebarProps {
  isOpen: boolean;
  isMobile: boolean;
  onClose: () => void;
}

export default function ChatSidebar({
  isOpen,
  isMobile,
  onClose,
}: ChatSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const [activeContact, setActiveContact] = useState<string | null>(null);

  const userString = localStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;
  const userId = user?.id || "";

  const { loading, error, data } = useQuery(GET_ALL_USERS_EXCEPT_CURRENT, {
    variables: { userId },
    skip: !userId,
  });
  const onlineUsers = useSelector((state: AppState) => state.chat.onlineUsers); // Get online users from Redux
  // const isOnline = onlineUsers.includes(activeContact);
  //  First useEffect: Set activeContact from data
  useEffect(() => {
    if (data?.getAllUsersExceptCurrent.length > 0 && !activeContact) {
      setActiveContact(data.getAllUsersExceptCurrent[0].id);
    }
  }, [data]);

  //  Second useEffect: Dispatch when activeContact updates
  useEffect(() => {
    if (activeContact) {
      dispatch(setReceiverId(activeContact));
    }
  }, [activeContact, dispatch]); // Ensure dispatch is included in dependencies

  // console.log(activeContact);
  if (!isOpen) return null;
  return (
    <div
      className={`
      ${isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"}
      w-80 border-r bg-background flex flex-col
    `}
    >
      <div className="p-4 border-b flex items-center justify-between">
        <h2 className="text-xl font-semibold">Chats</h2>
        {isMobile && (
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        )}
      </div>

      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search conversations..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-2">
          {data?.getAllUsersExceptCurrent.map((contact) => (
            <button
              key={contact.id}
              className={`
                w-full flex items-center p-3 rounded-lg mb-1 transition-colors
                ${
                  activeContact === contact.id
                    ? "bg-secondary"
                    : "hover:bg-secondary/50"
                }
              `}
              onClick={() => setActiveContact(contact.id)}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={contact.avatar || "/placeholder.svg"}
                  alt={contact.username}
                  className="h-10 w-10 rounded-full"
                />
                {contact.unread > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {contact.unread}
                  </span>
                )}
                {onlineUsers.includes(contact.id) && (
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></span>
                )}
              </div>
              <div className="ml-3 flex-1 overflow-hidden text-left">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{contact.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {contact.time}
                  </p>
                </div>
                <p className="text-sm text-muted-foreground truncate">
                  {contact.lastMessage}
                </p>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>

      <div className="p-4 border-t">
        <Button className="w-full" variant="outline">
          {/* <Plus className="mr-2 h-4 w-4" /> */}
          {/* New Chat */}
        </Button>
      </div>
    </div>
  );
}
