import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import useConversation from "../zustand/useConversation";
import axios from "../api/axios";
import { useAuthContext } from "../context/AuthContext";
const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { authUser } = useAuthContext();
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);

      try {
        const res = await axios.get(
          `/messages/${selectedConversation.conversationUser._id}`,
          {
            headers: { Authorization: authUser.token },
          }
        );
        const data = await res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setMessages(data);
      } catch (error) {
        toast.error(error.response.data.error);
      } finally {
        setLoading(false);
      }
    };
    if (selectedConversation?.conversationUser._id) getMessages();
  }, [selectedConversation?.conversationUser._id, setMessages]);

  return { loading, messages };
};

export default useGetMessages;
