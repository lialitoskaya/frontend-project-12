import Modal from 'react-bootstrap/Modal';
import {
  useContext, useEffect, useState, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { AuthContext } from './App';
import { axiosAddChannel, channelsSelectors } from '../slices/channelsSlice';
import channelNameSchema from '../util/yupSchema';
import filterProfanity from '../util/filterProfanity';

const AddChannelModal = ({ children }) => {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();
  const inputEl = useRef(null);

  useEffect(() => {
    show && inputEl.current.focus();
  }, [show]);

  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((c) => c.name);

  const {
    context: { token },
  } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: { name: '' },
    validationSchema: channelNameSchema(channelsNames),
    onSubmit: async (values) => {
      try {
        const filtredVal = filterProfanity.clean(values.name);
        await axiosAddChannel({ name: filtredVal }, token);
        formik.resetForm();
        handleClose();
        toast(t('toast.channelCreated'));
      } catch (e) {
        toast(t('axiosError'));
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  function handleClose() {
    setShow(false);
    formik.resetForm();
  }
  const handleShow = () => {
    setShow(true);
  };

  return (
    <>
      <Modal show={show} onHide={() => handleClose()} centered>
        <Modal.Header closeButton>
          <Modal.Title>{t('chatPage.channels.add')}</Modal.Title>
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
                className="btn btn-secondary me-2"
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
      <div className="col-4 border-end bg-body-tertiary overflow-y-scroll h-100 p-0">
        <div className="shadow-sm d-flex justify-content-between py-4 px-3">
          <b className="font-monospace ">{t('chatPage.channels.header')}</b>
          <button type="button" className="button1" onClick={handleShow}>
            +
          </button>
        </div>
        {children}
      </div>
    </>
  );
};

export default AddChannelModal;
