import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { Button } from "../../common";

import "./Modal.scss";

interface ModalProps {
  children: React.ReactNode;
  isOpenModal: boolean;
  handleCloseModal(): void;
  handleChange(): void;
  title: string;
  changeButtonText: string;
}

const Modal = ({
  children,
  isOpenModal,
  handleCloseModal,
  handleChange,
  title,
  changeButtonText,
}: ModalProps) => (
  <Dialog open={isOpenModal} className="modal">
    <DialogTitle className="modal__heading">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText className="modal-content modal-content__delete">
        {children}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button title="Cancel" onClick={handleCloseModal} type="button__cancel" />
      <Button
        title={changeButtonText}
        onClick={handleChange}
        type="contained button__modal"
      />
    </DialogActions>
  </Dialog>
);

export default Modal;
