import { useDispatch } from "react-redux";
import { useContext, useEffect, useState, createContext } from "react";
import { io } from "socket.io-client";
import { ToastContainer } from "react-toastify";
import Messages from "./Messages";
import { AuthContext } from "./App";
import MessageForm from "./MessageForm";
import {
  addMessages,
  addMessage,
  axiosMessages,
  updateMessages,
} from "../slices/messagesSlice";
import {
  addChannels,
  axiosChannels,
  addChannel,
  renameChannel,
  removeChannel,
} from "../slices/channelsSlice";
import ChannelsGroup from "./ChannelsGroup";
import { channelsSelectors } from "../slices/channelsSlice";
import { useSelector } from "react-redux";
import ClipLoader from "react-spinners/ClipLoader";


export const ChannelsContext = createContext({});
const socket = io();

const Chat = () => {
  const dispatch = useDispatch();
  const { context } = useContext(AuthContext);
  const token = context.getItem("token");
  const [activeChannel, setActiveChannel] = useState(null);
  const [fulfilled, setState] = useState(false);
  const channels = useSelector(channelsSelectors.selectAll);

  useEffect(() => {
    const axiosData = async () => {
      const channels = await axiosChannels(token);
      const messages = await axiosMessages(token);

      dispatch(addChannels(channels));
      dispatch(addMessages(messages));

      setActiveChannel(channels[0]);
      setState(true);
    };

    axiosData();
  }, []);

  if (fulfilled) {
    socket.on("removeChannel", async ({ id }) => {
      activeChannel.id === id && setActiveChannel(channels[0]);
      dispatch(removeChannel(id));
    });

    socket.on("newMessage", (message) => {
      dispatch(addMessage(message));
    });

    socket.on("newChannel", (channel) => {
      dispatch(addChannel(channel));
    });

    socket.on("renameChannel", ({ id, name }) => {
      dispatch(renameChannel({ id, changes: { name } }));
    });
  }


  return fulfilled ? (
    <ChannelsContext.Provider value={{ setActiveChannel, activeChannel }}>
      <div className="container h-100 my-3 overflow-hidden shadow">
        <div className="row flex-md-row h-100">
          <ChannelsGroup>
            <div className="col d-flex flex-column  h-100 p-0">
              <Messages />
              <div className="mt-auto w-100">
                <MessageForm />
              </div>
            </div>
          </ChannelsGroup>
        </div>
      </div>
      <ToastContainer />
    </ChannelsContext.Provider>
  ) : (
    <div className="spinner m-auto text-center">
      <ClipLoader color='#1297e5' size={120} cssOverride={{display: "block"}} className="mb-3 mx-auto" />
      <span>Загружаем каналы...</span>
    </div>
  );
};

export default Chat;
