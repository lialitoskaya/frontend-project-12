import { Toast } from "react-bootstrap";
import { ProgressBar } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { ToastContainer } from "react-bootstrap";

const ToastRemove = ({ showToast, setShowToast }) => {
  const [progress, setProgress] = useState(100);
  const progressValue = useRef();
  progressValue.current = progress;

  const progressTimer = () => {
    setProgress(progressValue.current - 1);
    if (progressValue.current === 1) {
      setShowToast(false);
      return;
    }
    setTimeout(() => progressTimer(), 100);
  };

  useEffect(() => {
    if (showToast) {
      progressTimer();
    }
  }, [showToast]);

  return (
    <ToastContainer className="p-3" position="top-end" style={{ zIndex: 1 }}>
      <Toast show={showToast} onClose={() => setShowToast(false)}>
        <Toast.Header>Hexlet Chat</Toast.Header>
        <Toast.Body className="me-6">Канал успешно удален</Toast.Body>
        <ProgressBar className="container me-6 mb-3 p-0" style={{width: '65%'}} now={progress} />
      </Toast>
    </ToastContainer>
  );
};

export default ToastRemove;
