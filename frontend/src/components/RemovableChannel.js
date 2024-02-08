import { useSelector } from 'react-redux';
import { ChannelsContext } from './ChatPage';
import { ButtonGroup, DropdownButton, Dropdown } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import cn from 'classnames';
import { useFormik } from 'formik';
import {
  useEffect, useRef, useContext, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { axiosRenameChannel, channelsSelectors } from '../slices/channelsSlice';
import RemoveModal from './RemoveModal';
import { AuthContext } from './App';
import schema from '../util/yupSchema';
import Channel from './Channel';

const RemovableChannel = ({ id, name }) => {
  const { t } = useTranslation();
  const { activeChannel } = useContext(ChannelsContext);
  const [show, setShow] = useState(false);
  const [showModalRemove, setShowModalRemove] = useState(false);

  const inputEl = useRef(null);

  useEffect(() => {
    show && inputEl.current.focus();
  }, [show]);

  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((c) => c.name);

  const {
    context: { token },
  } = useContext(AuthContext);

  const handleClose = () => {
    setShow(false);
  };

  const formik = useFormik({
    initialValues: { name },
    validationSchema: schema(channelsNames),
    onSubmit: async (values) => {
      try {
        await axiosRenameChannel(values, id, token);
        handleClose();
        toast(t('toast.channelRenamed'));
      } catch (e) {
        toast(t('axiosError'));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <>
      <ButtonGroup className="w-100 shadow-sm">
        <Channel id={id} name={name} />
        <DropdownButton
          title=""
          as={ButtonGroup}
          variant={`${activeChannel.id === id && 'secondary'}`}
        >
          <Dropdown.Item
            className="font-monospace btn btn-secondary"
            eventKey="1"
            onClick={() => setShow(true)}
          >
            {t('chatPage.channels.btnRename')}
          </Dropdown.Item>
          <Dropdown.Item
            className="font-monospace btn btn-danger"
            eventKey="2"
            onClick={() => setShowModalRemove(true)}
          >
            {t('chatPage.channels.btnRemove')}
          </Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('chatPage.channels.rename')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <label className="visually-hidden" htmlFor="channelNameInput">
              {t('chatPage.channels.name')}
            </label>
            <input
              type="text"
              id="channelNameInput"
              name="name"
              ref={inputEl}
              className={cn('form-control mb-3', {
                disabled: formik.isSubmitting,
                'is-invalid': formik.errors.name,
              })}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <div className="invalid-feedback">{formik.errors.name}</div>
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className={`btn btn-secondary me-2 ${
                  formik.isSubmitting && 'disabled'
                }`}
                onClick={handleClose}
              >
                {t('chatPage.channels.btnCancel')}
              </button>
              <button
                type="submit"
                className={cn('btn btn-primary', {
                  disabled: formik.isSubmitting,
                })}
                onClick={formik.handleSubmit}
              >
                {t('chatPage.channels.btnSubmit')}
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <RemoveModal
        setShowModalRemove={setShowModalRemove}
        showModalRemove={showModalRemove}
        id={id}
      />
    </>
  );
};

export default RemovableChannel;
