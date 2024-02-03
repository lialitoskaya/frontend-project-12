import Modal from "react-bootstrap/Modal";
import { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { AuthContext } from "./App";
import cn from "classnames";
import schema from "./util/yupSchema";
import { useRef } from "react";
import { axiosAddChannel } from "./slices/channelsSlice";
import { channelsSelectors } from "./slices/channelsSlice";

const AddChannelModal = ({ children }) => {
  const [show, setShow] = useState(false);

  const inputEl = useRef(null);
  
  useEffect(() => {
    show && inputEl.current.focus();
  }, [show])
  

  const channels = useSelector(channelsSelectors.selectAll);
  const channelsNames = channels.map((c) => c.name);

  const { context: { token } } = useContext(AuthContext);


  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: schema(channelsNames),
    onSubmit: async (values) => {
      try {
        await axiosAddChannel(values, token);
        formik.resetForm();
        handleClose();
      } catch (e) {
        formik.setErrors({ name: "Ошибка сети, попробуйте повторить позже" });
      }
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  const handleClose = () => {
    setShow(false);
    formik.resetForm();
  };
  
  const handleShow = () => {setShow(true) };

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Добавить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <label className="visually-hidden" htmlFor="channelNameInput">
              Название:
            </label>
            <input
              type="text"
              id="channelNameInput"
              name="name"
              ref={inputEl}
              className={cn("form-control mb-3", {
                disabled: formik.isSubmitting,
                "is-invalid": formik.errors.name,
              })}
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
            <div className="d-flex justify-content-end">
              <button
                type="button"
                className="btn btn-secondary me-2"
                onClick={handleClose}
              >
                Отменить
              </button>
              <button
                type="submit"
                className={cn("btn btn-primary", {
                  disabled: formik.isSubmitting,
                })}
                onClick={formik.handleSubmit}
              >
                Отправить
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
      <div className="col-4 p-0 border-end">
        <div className="shadow-sm d-flex justify-content-between py-4 px-3">
          <b className="font-monospace">Каналы</b>
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
