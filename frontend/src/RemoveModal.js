import { Modal } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "./App";

const RemoveModal = ({ showModalRemove, setShowModalRemove, setShowToast, id }) => {
  
  const { context: { token } } = useContext(AuthContext);

  const handleRemove = async () => {
    try {
      await axios.delete(`/api/v1/channels/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setShowToast(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Modal
        show={showModalRemove}
        onHide={() => setShowModalRemove(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Удалить канал</Modal.Title>
        </Modal.Header>
        <Modal.Body className="h3 fw-light">Уверены?
        <div className="d-flex justify-content-end m-2">
          <button
            className="btn btn-primary me-2"
            onClick={() => setShowModalRemove(false)}
          >
            Отменить
          </button>
          <button className="btn btn-danger" onClick={handleRemove}>
            Удалить
          </button>
        </div>
        </Modal.Body>
      </Modal>
      
    </>
  );
};
export default RemoveModal;
