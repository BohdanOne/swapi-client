import { useContext, FC } from 'react';
import { ToastContext } from '../../providers/ToastProvider';
import { Toast, ToastActions } from '../../reducers/toastReducer';
import styles from './Toast.module.css';

const Toast: FC = () => {
  const { toasts, toastAction } = useContext(ToastContext);

  const hideToast = (toast: Toast) => {
    toastAction &&
      toastAction({ type: ToastActions.CLEAR_TOAST, payload: toast });
  };

  return (
    <>
      {toasts?.length ? (
        <div className={styles.toastWrapper}>
          <div className={styles[toasts[toasts.length - 1].type]}>
            <p>{toasts[toasts.length - 1].message}</p>
            <button
              type='button'
              onClick={() => hideToast(toasts[toasts.length - 1])}
              aria-label='hide message'
              className={styles.close}
            >
              X
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Toast;
