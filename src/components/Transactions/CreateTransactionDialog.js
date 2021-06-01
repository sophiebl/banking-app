import PropTypes from "prop-types";
import "react-toastify/dist/ReactToastify.css";
import {
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@material-ui/core";

import CreateTransactionForm from "./CreateTransactionForm";

export default function CreateTransactionDialog({
  openDialog,
  uniqueOthersUser,
  userData,
  handleCloseDialog,
}) {
  return (
    <div>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <CreateTransactionForm
            uniqueOthersUser={uniqueOthersUser}
            userData={userData}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

CreateTransactionDialog.propTypes = {
  openDialog: PropTypes.bool.isRequired,
  uniqueOthersUser: PropTypes.object.isRequired,
  userData: PropTypes.object.isRequired,
  handleCloseDialog: PropTypes.func.isRequired,
};
