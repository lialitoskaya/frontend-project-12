import { useState } from "react";
import { useSelector } from "react-redux";
import AddChannelModal from "./AddChanelModal";
import ToastRemove from "./ToastRemove";
import RemovableChannel from "./Channels";
import Channel from "./Channel";
import { channelsSelectors } from "./slices/channelsSlice";

const ChannelsGroup = ({ children }) => {
  const [showToast, setShowToast] = useState(false);

  const channels = useSelector(channelsSelectors.selectAll);
  
  return (
    <>
      <AddChannelModal>
        <ul className="px-0">
          {channels.map(({ id, name, removable }) => (
            <li id={id} key={id}>
              {removable ? (
                <RemovableChannel
                  id={id}
                  name={name}
                  setShowToast={setShowToast}
                />
              ) : (
                <Channel id={id} name={name} />
              )}
            </li>
          ))}
        </ul>
      </AddChannelModal>
      {children}
      {showToast && (
        <ToastRemove showToast={showToast} setShowToast={setShowToast} />
      )}
    </>
  );
};

export default ChannelsGroup;
