import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../api/axios";
import { useAuthContext } from "../context/AuthContext";
import useConversation from "../zustand/useConversation";
import { useSocketContext } from "../context/SocketContext";
const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const { conversations, setConversations, messages } = useConversation();
  const { socket } = useSocketContext();
  const { authUser } = useAuthContext();

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/messages", {
          headers: { Authorization: `${authUser.token}` },
        });
        const data = await res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        let conversationsArray = [];
        for (const i in data) {
          const conversation = data[i];
          const conversationUser = conversation.participants.filter(
            (participant) => participant._id !== authUser._id
          );
          const conversationArray = {
            conversation: conversation,
            conversationUser: conversationUser[0],
          };

          conversationsArray.push(conversationArray);
          setConversations(conversationsArray);
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    socket?.on("newMessage", (newMessage, senderId) => {
      getConversations();
      return () => socket?.off("newMessage");
    });
    getConversations();
  }, [messages, socket]);

  return { loading, conversations };
};

export default useGetConversations;
