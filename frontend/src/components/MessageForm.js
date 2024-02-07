import axios from 'axios';
import { useContext, useState } from 'react';
import { AuthContext } from './App';
import cn from 'classnames';
import { ChannelsContext } from './ChatPage';
import { useTranslation } from 'react-i18next';
import filterProfanity from '../util/filterProfanity';

const MessageForm = () => {
  const { t } = useTranslation();
  const { context } = useContext(AuthContext);
  const { activeChannel } = useContext(ChannelsContext);
  const username = context.getItem('username');

  const [currentText, setText] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (message) => async (e) => {
    e.preventDefault();

    const newMessage = {
      body: filterProfanity.clean(message),
      channelId: activeChannel.id,
      username,
    };
    setDisabled(true);

    await axios
      .post('/api/v1/messages', newMessage, {
        headers: { Authorization: `Bearer ${context.getItem('token')}` },
      })
      .catch((e) => setError(e));

    setDisabled(false);
    setText('');
  };

  return (
    <form className="pb-3 mx-3" onSubmit={handleSubmit(currentText)}>
      {error && <p className="text-danger mb-1 fw-light">{t('axiosError')}</p>}
      <div className="input-group">
        <input
          className="form-control px-3"
          placeholder={t('chatPage.messages.input')}
          aria-label={t('chatPage.messages.input')}
          type="input"
          value={currentText}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className={cn('btn btn-outline-primary font-monospace', {
            disabled,
          })}
          type="submit"
        >
          {t('btnSubmit')}
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
