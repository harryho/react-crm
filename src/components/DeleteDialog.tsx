import React from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab } from '@material-ui/core';

type DeleteDialogProps = {
  closeDialog: (confirm: boolean) => void;
  open: boolean;
  dialogTitle?:string;
  dialogText?:string;
};

const DeleteDialog: React.FC<DeleteDialogProps> = ({ open, closeDialog, dialogTitle, dialogText }) => {
  const title = dialogTitle && dialogTitle.length >0  ? dialogTitle: 'Action Alter';
  const text =  dialogText && dialogText.length >0  ? dialogText:'Are you sure to delete this data?';

  const dialogButtons = [
    <Fab key="cancel-btn" color="primary" variant="extended" onClick={() => closeDialog(false)}>
      Cancel
    </Fab>,
    <Fab key="confirm-btn" color="secondary" variant="extended" onClick={() => closeDialog(true)}>
      Confirm
    </Fab>,
  ];

  return (
    <Dialog key="alert-dialog" title="Confirm Dialog " fullWidth maxWidth="xs" open={open} onClick={() => closeDialog(false)}>
      <DialogTitle key="alert-dialog-title">{title}</DialogTitle>
      <DialogContent key="alert-dialog-content">
        <DialogContentText key="alert-dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions key="alert-dialog-action">{dialogButtons}</DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
