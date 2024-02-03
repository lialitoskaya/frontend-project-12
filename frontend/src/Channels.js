import { useSelector } from "react-redux";
import { ChannelsContext } from "./ChatPage";
import { useContext } from "react";
import { ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";
import Channel from "./Channel";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import cn from "classnames";
import { useFormik } from "formik";
import schema from "./util/yupSchema";
import { AuthContext } from "./App";
import RemoveModal from "./RemoveModal";
import { useEffect, useRef } from "react";
import { axiosRenameChannel } from "./slices/channelsSlice";
import { channelsSelectors } from "./slices/channelsSlice";

const RemovableChannel = ({ id, name, setShowToast }) => {
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

  const formik = useFormik({
    initialValues: { name: name },
    validationSchema: schema(channelsNames),
    onSubmit: async (values) => {
      try {
        await axiosRenameChannel(values, id, token);
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
  };

  return (
    <>
      <ButtonGroup className="w-100 shadow-sm">
        <Channel id={id} name={name} />
        <DropdownButton
          title=""
          as={ButtonGroup}
          variant={`${activeChannel === id && "secondary"}`}
        >
          <Dropdown.Item
            className="font-monospace btn btn-secondary"
            eventKey="1"
            onClick={() => setShow(true)}
          >
            Переименовать
          </Dropdown.Item>
          <Dropdown.Item
            className="font-monospace btn btn-danger"
            eventKey="2"
            onClick={() => setShowModalRemove(true)}
          >
            Удалить
          </Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Переименовать канал</Modal.Title>
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
      <RemoveModal
        setShowModalRemove={setShowModalRemove}
        showModalRemove={showModalRemove}
        setShowToast={setShowToast}
        id={id}
      />
    </>
  );
};

export default RemovableChannel;
