import { createContext, FC, ReactElement, useEffect, useReducer } from 'react';
import { Toast, ToastActions, toastReducer } from '../reducers/toastReducer';

interface ToastContext {
  toasts: Toast[];
  toastAction: React.Dispatch<{
    type: ToastActions;
    payload: Toast;
  }> | null;
}

const DEFAULT_TOASTS: Toast[] = [
  { type: 'success', message: 'Welcome Young Padawan!', id: new Date() },
];

export const ToastContext = createContext<ToastContext>({
  toasts: DEFAULT_TOASTS,
  toastAction: null,
});

const ToastProvider: FC<{ children: ReactElement }> = ({ children }) => {
  const [toasts, toastAction] = useReducer(toastReducer, DEFAULT_TOASTS);

  useEffect(() => {
    if (toasts.length) {
      setTimeout(
        () =>
          toastAction({ type: ToastActions.CLEAR_TOAST, payload: toasts[0] }),
        5000
      );
    }
  });

  return (
    <ToastContext.Provider value={{ toasts, toastAction }}>
      {children}
    </ToastContext.Provider>
  );
};

export default ToastProvider;