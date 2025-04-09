import React from "react";
import useConversation from "../../zustand/useConversation";
import { extractTime } from "../../utils/extractTime";
import { useSocketContext } from "../../context/SocketContext";
const Conversation = ({ conversation, emoji, lastIdx }) => {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected =
    selectedConversation?.conversationUser._id ===
    conversation.conversationUser._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(conversation.conversationUser._id);
  return (
    <>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-2 cursor-pointer ${
          isSelected ? "bg-sky-500" : ""
        }`}
        onClick={() => setSelectedConversation(conversation)}
      >
        <div
          className={`avatar ${isOnline ? "avatar-online" : "avatar-offline"}`}
        >
          <div className="w-12 rounded-full">
            <img
              src={conversation.conversationUser.profilePic}
              alt="user avatar"
            />
          </div>
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex gap-3 justify-between">
            <div>
              <p className="font-bold text-gray-200">
                {conversation.conversationUser.fullName}
              </p>
              <p className="inline-block text-sm">
                {conversation.conversation?.lastMessageText?.length > 10
                  ? conversation.conversation?.lastMessageText?.substring(
                      0,
                      10
                    ) + "..."
                  : conversation.conversation?.lastMessageText}
              </p>
              <span className="inline-block text-xs font-thin px-2">
                {conversation.conversation?.lastMessageDate &&
                  extractTime(conversation.conversation?.lastMessageDate)}
              </span>
            </div>
            <span className="text-xl">{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIdx && <div className="divider my-0 py-0 h-1"></div>}
    </>
  );
};

export default Conversation;

//STARTER CODE
// import React from "react";
// const Conversation = () => {
//   return (
//     <>
//       <div className="flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer">
//         <div className="avatar online">
//           <div className="w-12 rounded-full">
//             <img src="avatar.jpg" alt="user avatar" />
//           </div>
//         </div>
//         <div className="flex flex-col flex-1">
//           <div className="flex gap-3 justify-between">
//             <p className="font-bold text-gray-200"> John Doe</p>
//             <span className="text-xl">I</span>
//           </div>
//         </div>
//       </div>
//       <div className="divider my-0 py-0 h-1"></div>
//     </>
//   );
// };

// export default Conversation;
