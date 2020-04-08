import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ErrorModal = ({ title, description, refetch }) => {
  const [open, setOpen] = useState(true)
  const handleClose = () => setOpen(false)
  const handleTryAgain = () => !!refetch ? refetch() : window.location.reload();

  return (
    <Modal show={open} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{description}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {!!handleTryAgain &&
          <Button variant="primary" onClick={handleTryAgain}>
            Try Again
          </Button>
        }
      </Modal.Footer>
    </Modal>
  )
}

export default ErrorModal;
