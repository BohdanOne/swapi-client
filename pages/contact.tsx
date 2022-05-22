import { FormEvent, FormEventHandler, useContext, useState } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { ToastContext } from '../providers/ToastProvider';
import { ToastActions } from '../reducers/toastReducer';
import FormField from '../components/FormField/FormField';
import styles from '../styles/Contact.module.css';

const Contact: NextPage = () => {
  const formConfig = [
    {
      type: 'text',
      id: 'firstName',
      label: 'First Name',
    },
    {
      type: 'text',
      id: 'lastName',
      label: 'Last Name',
    },
    {
      type: 'email',
      id: 'email',
      label: 'Email',
      pattern:
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      validationMessage: 'Please provide valid email',
    },
    {
      type: 'text',
      id: 'postalCode',
      label: 'Postal Code',
      pattern: /^\d{2}-\d{3}$/,
      validationMessage: 'Please provide valid postal code (ex. 00-120)',
    },
    {
      type: 'tel',
      id: 'phone',
      label: 'Phone Number',
      pattern: /^\d{9}$/,
      validationMessage: 'Please provide valid phone number (9 digits)',
    },
    {
      type: 'textarea',
      id: 'message',
      label: 'Message',
    },
  ];

  const initForm = () => {
    const initValues: { [key: string]: string } = {};
    formConfig.forEach((field) => (initValues[field.id] = ''));
    return initValues;
  };

  const initialFormValues = initForm();
  const { toastAction } = useContext(ToastContext);
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleMessage: FormEventHandler<HTMLFormElement> = (e: FormEvent) => {
    e.preventDefault();
    toastAction &&
      toastAction({
        type: ToastActions.SEND_TOAST,
        payload: {
          id: new Date(),
          type: 'success',
          message: 'Sending message..',
        },
      });
    setTimeout(() => {
      const fakeResponse = Math.random() < 0.8 ? 200 : 500;
      if (fakeResponse === 200) {
        toastAction &&
          toastAction({
            type: ToastActions.SEND_TOAST,
            payload: {
              id: new Date(),
              type: 'success',
              message: 'Message sent!',
            },
          });
      } else {
        toastAction &&
          toastAction({
            type: ToastActions.SEND_TOAST,
            payload: {
              id: new Date(),
              type: 'warning',
              message: 'Something went wrong :(',
            },
          });
      }
    }, 2000);
  };

  const handleValidInput = (fieldId: string, value: string) => {
    setFormValues({ ...formValues, [fieldId]: value });
  };

  return (
    <>
      <Head>
        <title>People of Star Wars | Contact</title>
        <meta
          name='description'
          content='Get in touch with People of Star Wars team'
        />
      </Head>
      <div className={styles.content}>
        <header>
          <h1>Contact</h1>
        </header>
        <form className={styles.form} onSubmit={handleMessage}>
          {formConfig.map((field) => (
            <FormField
              type={field.type}
              label={field.label}
              id={field.id}
              key={field.id}
              pattern={field.pattern}
              validationMessage={field.validationMessage}
              setValue={handleValidInput}
            />
          ))}
          <button
            type='submit'
            disabled={Object.values(formValues).some((value) => value === '')}
          >
            Send message
          </button>
        </form>
      </div>
    </>
  );
};

export default Contact;
