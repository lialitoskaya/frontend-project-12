import { useSelector } from 'react-redux';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ChannelsContext } from './ChatPage';

const Messages = () => {
  const { activeChannel } = useContext(ChannelsContext);
  const messages = Object.values(useSelector((state) => state.messages.entities));
  const { t } = useTranslation();
  const activeMessages = messages.filter(({ channelId }) => channelId === activeChannel.id);

  return (
    <>
      <div className="container bg-body-tertiary ps-4 pt-3 font-monospace shadow-sm">
        <b className="mb-0">
          #
          {activeChannel.name}
        </b>
        <p>{t('chatPage.messages.messagesCount', { count: activeMessages.length })}</p>
      </div>
      {messages.length > 0 && (
      <div className="overflow-y-scroll text-break">
        <ul className="pt-1">
          {activeMessages.map(({ id, username, body }) => (
            <div id={id} key={id} className="font-monospace">
              <b>{username}</b>
              :
              {' '}
              {body}
            </div>
          ))}
        </ul>
      </div>
      )}
    </>
  );
};
export default Messages;
