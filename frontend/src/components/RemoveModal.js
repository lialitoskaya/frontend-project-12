import { Modal } from 'react-bootstrap';
import axios from 'axios';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AuthContext } from './App';

const RemoveModal = ({ showModalRemove, setShowModalRemove, id }) => {
  const { t } = useTranslation();
  const { context: { token } } = useContext(AuthContext);

  const handleRemove = async () => {
    try {
      await axios.delete(`/api/v1/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowModalRemove(false);
      toast(t('toast.channelRemoved'));
    } catch (e) {
      toast(t('axiosError'));
    }
  };

  return (
    <Modal
      show={showModalRemove}
      onHide={() => setShowModalRemove(false)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{t('chatPage.channels.removeChannel.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="h3 fw-light">
        {t('chatPage.channels.removeChannel.body')}
        <div className="d-flex justify-content-end m-2">
          <button
            type="button"
            className="btn btn-primary me-2"
            onClick={() => setShowModalRemove(false)}
          >
            {t('chatPage.channels.btnCancel')}
          </button>
          <button type="button" className="btn btn-danger" onClick={handleRemove}>
            {t('chatPage.channels.btnRemove')}
          </button>
        </div>
      </Modal.Body>
    </Modal>
  );
};
export default RemoveModal;
