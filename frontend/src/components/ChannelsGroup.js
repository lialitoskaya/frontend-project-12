import { useSelector } from 'react-redux';
import AddChannelModal from './AddChannelModal';
import RemovableChannel from './RemovableChannel';
import Channel from './Channel';
import { channelsSelectors } from '../slices/channelsSlice';

const ChannelsGroup = ({ children }) => {
  const channels = useSelector(channelsSelectors.selectAll);

  return (
    <>
      <AddChannelModal>
        <ul className="px-0">
          {channels.map(({ id, name, removable }) => (
            <li id={id} key={id}>
              {removable ? (
                <RemovableChannel id={id} name={name} />
              ) : (
                <Channel id={id} name={name} />
              )}
            </li>
          ))}
        </ul>
      </AddChannelModal>
      {children}
    </>
  );
};

export default ChannelsGroup;
