import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import useConversation from "../../zustand/useConversation";
import useGetUsers from "../../hooks/useGetUsers";
import toast from "react-hot-toast";
const SearchInput = () => {
  const [search, setSearch] = useState("");
  const { setSelectedConversation, setConversations, conversations } =
    useConversation();
  const { users } = useGetUsers();
  const handleSearch = (e) => {
    e.preventDefault();

    if (!search) return;
    if (search.length < 3) {
      return toast.error("Search term must be at least 3 characters long.");
    }

    const conversationUser = users.find((u) =>
      u.fullName.toLowerCase().includes(search.toLowerCase())
    );
    if (conversationUser) {
      const conversation = { conversation: {}, conversationUser };
      setSelectedConversation(conversation);
      setTimeout(() => {
        const found = conversations.find(
          (c) => c.conversationUser._id === conversation.conversationUser._id
        );
        if (!found) {
          setConversations([conversation, ...conversations]);
        }
      }, 500);
    } else {
      toast.error("No user found.");
    }
    setSearch("");
  };
  return (
    <form className="flex items-center gap-2" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Search..."
        className="input input-bordered rounded-full"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit" className="btn btn-circle bg-sky-500 text-white">
        <IoSearchSharp className="w-6 h-6 outline-none" />
      </button>
    </form>
  );
};

export default SearchInput;

//STARTER CODE
// import React from "react";
// import { IoSearchSharp } from "react-icons/io5";
// const SearchInput = () => {
//   return (
//     <form className="flex items-center gap-2">
//       <input
//         type="text"
//         placeholder="Search..."
//         className="input input-bordered rounded-full"
//       />
//       <button type="submit" className="btn btn-circle bg-sky-500 text-white">
//         <IoSearchSharp className="w-6 h-6 outline-none" />
//       </button>
//     </form>
//   );
// };

// export default SearchInput;
