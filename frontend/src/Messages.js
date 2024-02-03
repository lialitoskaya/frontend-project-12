import { useSelector } from "react-redux";
import { useContext } from "react";
import { ChannelsContext } from "./ChatPage";

const Messages = () => {
  const { activeChannel } = useContext(ChannelsContext);
  const messages = Object.values(useSelector((state) => state.messages.entities));

  const activeMessages = messages.filter(({channelId}) => channelId === activeChannel);

  return (
    messages.length > 0 && <div className="overflow-y-scroll">
      <ul className="pt-1">
        {activeMessages.map(({id, username, body}) => (
          <div id={id} key={id} className="font-monospace"><b>{username}</b>: {body}</div>
        ))}
      </ul>
    </div>
  );
};
export default Messages;
