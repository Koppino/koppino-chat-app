import React, { useState } from "react";
import useConversation from "../zustand/useConversation";
import { toast } from "react-hot-toast";
import axios from "../api/axios";
import { useAuthContext } from "../context/AuthContext";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const {
    messages,
    setMessages,
    selectedConversation,
    conversations,
    setConversations,
  } = useConversation();
  const { authUser } = useAuthContext();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const res = await axios.post(
        `/messages/send/${selectedConversation.conversationUser._id}`,
        { message },
        {
          headers: { Authorization: `${authUser.token}` },
        }
      );
      const data = await res.data;

      if (data.error) {
        throw new Error(data.error);
      }
      setMessages([...messages, data]);
    } catch (error) {
      toast.error(error.response.data.error);
    } finally {
      setLoading(false);
    }
  };
  return { loading, sendMessage };
};

export default useSendMessage;
