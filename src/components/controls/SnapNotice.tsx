import { HorizontalRule } from "@mui/icons-material";
import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { TransitionProps } from "@mui/material/transitions/transition";

export type SnapNoticeProps = {
    open: boolean,
    transition: React.ComponentType<
        TransitionProps & {
            children: React.ReactElement<any, any>;
        }
    >,
    handleClose: () => void
}

export default function SnapNotice(
    { open, transition, handleClose }: SnapNoticeProps
) {
    return (<Snackbar
        open={open}
        TransitionComponent={transition}
        message="Operation is done successfully"
        key={transition.name}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
        <Alert
            onClose={handleClose}
            severity="success"
            variant="filled"
            sx={{ width: '100%' }}
        >
            Operation is done successfully!
        </Alert>
    </Snackbar>)

}