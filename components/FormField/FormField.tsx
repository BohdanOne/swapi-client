import { ChangeEventHandler, FC, FocusEventHandler, useState } from 'react';
import styles from './FormField.module.css';

const FormField: FC<{
  type: string;
  label: string;
  id: string;
  pattern?: RegExp;
  validationMessage?: string;
  setValue: (fieldId: string, value: string) => void;
}> = ({ type, label, id, pattern, validationMessage, setValue }) => {
  const [validationError, setValidationError] = useState('');

  const validate = (value: string): boolean => {
    if (pattern && validationMessage) {
      if (pattern.test(value)) {
        setValidationError('');
        return true;
      } else {
        setValidationError(validationMessage);
        return false;
      }
    } else if (value === '') {
      setValidationError('This field is required');
      return false;
    } else {
      setValidationError('');
      return true;
    }
  };

  const handleBlur: FocusEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    validate(e.target.value);
  };

  const handleChange: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    if (validate(e.target.value)) {
      setValue(id, e.target.value);
    }
  };

  return (
    <>
      <label htmlFor={id} className={styles.label}>
        {label} {validationError && <span> - {validationError}</span>}
      </label>
      {type === 'textarea' ? (
        <textarea
          className={styles.inputField}
          name={id}
          id={id}
          rows={10}
          onBlur={handleBlur}
          onChange={handleChange}
        ></textarea>
      ) : (
        <input
          className={styles.inputField}
          type={type}
          name={id}
          id={id}
          onBlur={handleBlur}
          onChange={handleChange}
        />
      )}
    </>
  );
};

export default FormField;
