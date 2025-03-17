import { setOnlineUsers } from "@/lib/redux/chatSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000"; // Your backend URL

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null); //  Properly typed socket state
  const dispatch = useDispatch();

  useEffect(() => {
    const storedUserString = localStorage.getItem("user"); //  Ensure it's a string or null

    if (!storedUserString) return; //  Prevent JSON parsing on null

    try {
      const parsedUser: { id: string } = JSON.parse(storedUserString); //  Ensure correct structure
      if (!parsedUser?.id) return; //  Ensure user ID exists

      const newSocket: Socket = io(SOCKET_SERVER_URL, {
        query: { userId: parsedUser.id }, //  Send user ID to backend
      });

      setSocket(newSocket);

      newSocket.on("connect", () => {
        console.log(`Connected: ${newSocket.id}`);
      });

      newSocket.on("onlineUsers", (users) => {
        console.log("Online users:", users);
        dispatch(setOnlineUsers(users));
      });

      return () => {
        newSocket.disconnect();
        console.log("Socket Disconnected");
      };
    } catch (error) {
      console.error("Error parsing user data:", error);
    }
  }, [dispatch]); // ✅ Run only once on mount

  return { socket };
};
