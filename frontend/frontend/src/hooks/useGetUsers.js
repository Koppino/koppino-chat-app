import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import axios from "../api/axios";
import { useAuthContext } from "../context/AuthContext";

const useGetUsers = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    const useGetUsers = async () => {
      setLoading(true);
      try {
        const res = await axios.get("/users", {
          headers: { Authorization: `${authUser.token}` },
        });
        const data = await res.data;
        if (data.error) {
          throw new Error(data.error);
        }
        setUsers(data.filteredUsers);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    useGetUsers();
  }, []);
  return { loading, users };
};

export default useGetUsers;
