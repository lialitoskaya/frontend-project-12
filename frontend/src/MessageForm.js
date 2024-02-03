import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "./App";
import cn from "classnames";
import { ChannelsContext } from "./ChatPage";

const MessageForm = () => {
  const { context } = useContext(AuthContext);
  const { activeChannel } = useContext(ChannelsContext);
  const username = context.getItem('username');

  const [currentText, setText] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(null);
 

  const handleSubmit = (message) => async (e) => {
    e.preventDefault();

    const newMessage = {body: message, channelId: activeChannel, username};
    setDisabled(true);

    await axios.post("/api/v1/messages", newMessage, {
        headers: {Authorization: `Bearer ${context.getItem('token')}`}
    }).catch((e) => setError(e));

    setDisabled(false);
    setText('');
  };

  return (
    <form className="pb-3 mx-3" onSubmit={handleSubmit(currentText)}>
      {error && <p className="text-danger mb-1 fw-light">Ошибка сети</p>}
      <div className="input-group">
        <input
          className="form-control px-3"
          placeholder="введите сообщение"
          aria-label="введите сообщение"
          type="input"
          value={currentText}
          onChange={(e) => setText(e.target.value)}
        ></input>
        <button
          className={cn('btn btn-outline-primary font-monospace', {'disabled': disabled})}
          type="submit"
        >
          отправить
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
