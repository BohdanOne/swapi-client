export type Toast = {
  type: 'success' | 'warning';
  message: string;
  id: Date;
};

export enum ToastActions {
  SEND_TOAST = 'SEND',
  CLEAR_TOAST = 'CLEAR',
}

export type SendToastAction = 'SEND';
export type ClearToastAction = 'CLEAR';

export const toastReducer = (
  toasts: Toast[],
  action: { type: ToastActions; payload: Toast }
): Toast[] => {
  switch (action.type) {
    case ToastActions.SEND_TOAST:
      return [...toasts, action.payload];
    case ToastActions.CLEAR_TOAST:
      return toasts.filter((toast) => toast?.id !== action.payload.id);
    default:
      return toasts;
  }
};
