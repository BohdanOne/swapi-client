import {
  ReactElement,
  FC,
  KeyboardEventHandler,
  useRef,
  useEffect,
} from 'react';
import styles from './Modal.module.css';

const Modal: FC<{
  children: ReactElement;
  title: string;
  closeFn: () => void;
}> = ({ children, title, closeFn }) => {
  const closeButton = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeButton && closeButton.current && closeButton.current.focus();
  }, []);

  const handleKey: KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.code === 'Tab') {
      e.preventDefault();
    }
  };

  return (
    <div className={styles.modalWrapper}>
      <button
        ref={closeButton}
        className={styles.overlay}
        aria-label='close modal'
        onClick={closeFn}
        tabIndex={-1}
      />
      <section className={styles.modal}>
        <header>
          <button
            className={styles.close}
            aria-label='close modal'
            onClick={closeFn}
            onKeyDown={handleKey}
          >
            X
          </button>
          <h2>{title}</h2>
        </header>
        <div>{children}</div>
      </section>
    </div>
  );
};

export default Modal;
