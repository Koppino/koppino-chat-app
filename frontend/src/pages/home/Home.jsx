import React from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import MessageContainer from "../../components/messages/MessageContainer";

const Home = () => {
  return (
    <div className="flex sm:h-[550px] md:h-[550px] rounded-lg overflow-hidden  p-6  rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};

export default Home;
