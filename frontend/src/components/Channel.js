import cn from 'classnames';
import { useContext } from 'react';
import { ChannelsContext } from './ChatPage';

const Channel = ({ id, name }) => {
  const { setActiveChannel, activeChannel } = useContext(ChannelsContext);

  const classNames = (id) => cn(
    'w-100 rounded-0 text-start btn border-0 shadow-sm font-monospace text-truncate',
    {'btn-secondary': activeChannel.id === id}
  );

  return (
    <button
      type="button"
      onClick={() => {
        setActiveChannel({ id, name });
      }}
      className={classNames(id)}
    >
      #
      {' '}
      {name}
    </button>
  );
};

export default Channel;
