import { useDispatch } from 'react-redux';
import Messages from './Messages';
import {
  useContext, useEffect, useRef, useState,
} from 'react';
import { AuthContext } from './App';
import MessageForm from './MessageForm';

import {
  addMessages,
  addMessage,
  axiosMessages,
  updateMessages,
} from '../slices/messagesSlice';
import { io } from 'socket.io-client';
import {
  addChannels,
  axiosChannels,
  addChannel,
  renameChannel,
  removeChannel,
} from '../slices/channelsSlice';
import ChannelsGroup from './ChannelsGroup';
import { createContext } from 'react';
import { ToastContainer } from 'react-toastify';

const socket = io();

export const ChannelsContext = createContext({});

const Chat = () => {
  const dispatch = useDispatch();
  const { context } = useContext(AuthContext);
  const token = context.getItem('token');
  const [activeChannel, setActiveChannel] = useState(null);
  const [fulfilled, setState] = useState(false);

  useEffect(() => {
    const f = async () => {
      const channels = await axiosChannels(token);
      const messages = await axiosMessages(token);

      dispatch(addChannels(channels));
      dispatch(addMessages(messages));

      setActiveChannel(channels[0]);
      setState(true);

      socket.on('removeChannel', async ({ id }) => {
        const currentMessages = await axiosMessages(token);
        dispatch(removeChannel(id));
        dispatch(updateMessages(currentMessages));
        setActiveChannel(channels[0]);
      });
    };

    f();

    socket.on('newMessage', (message) => {
      dispatch(addMessage(message));
    });

    socket.on('newChannel', (channel) => {
      dispatch(addChannel(channel));
    });

    socket.on('renameChannel', ({ id, name }) => {
      dispatch(renameChannel({ id, changes: { name } }));
    });
  }, []);

  return (
    fulfilled && (
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
    )
  );
};

export default Chat;
