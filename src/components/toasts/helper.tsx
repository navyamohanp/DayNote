import { DeviceEventEmitter } from 'react-native';
import {
  SHOW_TOAST_MESSAGE,
  TOAST_ERROR,
  TOAST_INFO,
  TOAST_SUCCESS,
  TOAST_WARNING,
} from '../../themes/toasts';

export type ToastTypes =
  | 'successToast'
  | 'errorToast'
  | 'warningToast'
  | 'infoToast';

const Toaster = {
  showToast: (message: string, type: ToastTypes = 'successToast') => {
    let toastType = TOAST_SUCCESS;
    switch (type) {
      case 'errorToast':
        toastType = TOAST_ERROR;
        break;
      case 'warningToast':
        toastType = TOAST_WARNING;
        break;
      case 'infoToast':
        toastType = TOAST_INFO;
        break;
      default:
        toastType = TOAST_SUCCESS;
    }

    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {
      message: message,
      type: toastType,
      timeoutMilliSec: 2000,
    });
  },
};

export default Toaster;
