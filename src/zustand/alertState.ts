import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { SnackbarOrigin } from "@mui/material/Snackbar/Snackbar";
import { AlertColor } from "@mui/material/Alert/Alert";

type CallBack = () => void;

export interface AlertStateTypes {
  open: boolean;
  severity: AlertColor;
  message: string;
  anchorOrigin: SnackbarOrigin;
  callBack?: CallBack;
  setOpen: (arg: AlertPropTypes) => void;
  setClose: () => void;
}

export interface AlertPropTypes {
  open: boolean;
  severity: AlertColor;
  message: string;
  anchorOrigin?: SnackbarOrigin;
  callBack?: CallBack;
}

export const useAlertStore = create(
  immer<AlertStateTypes>((set) => ({
    open: false,
    severity: "success",
    message: "message",
    anchorOrigin: {
      vertical: "top",
      horizontal: "center",
    },
    setOpen: (arg: AlertPropTypes) => {
      set((state: AlertPropTypes) => {
        state.open = arg.open;
        state.severity = arg.severity;
        state.message = arg.message;
        state.anchorOrigin = arg.anchorOrigin ?? state.anchorOrigin;
        state.callBack = arg.callBack;
      });
    },
    setClose: () => {
      set((state: AlertPropTypes) => {
        state.open = false;
      });
    },
  }))
);

export default useAlertStore;
