import { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useRef, useState } from 'react';
import AddToFavoritesButton from '../../components/FavoritesButton/FavoritesButton';
import Modal from '../../components/Modal/Modal';
import PlanetDetails from '../../components/PlanetDetails/PlanetDetails';
import { usePersonQuery } from '../../generated/graphql';
import styles from '../../styles/Person.module.css';

const Person: NextPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const { data } = usePersonQuery({ variables: { id: id as string } });
  const planetName = data?.person?.homeworld?.name || '';
  const openModalButton = useRef<HTMLButtonElement | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    openModalButton?.current?.focus();
    setIsModalOpen(false);
  };

  return (
    <>
      <Head>
        <title>People of Star Wars | {data?.person?.name}</title>
        <meta
          name='description'
          content={`All you want to know about ${data?.person?.name}`}
        />
      </Head>
      <header>
        <h1>{data?.person?.name}</h1>
      </header>
      <div className={styles.personData}>
        {data?.person?.gender && <p>gender: {data.person.gender}</p>}
        {data?.person?.birthYear && <p>birth year: {data.person.birthYear}</p>}
        {data?.person?.height && <p>height: {data.person.height}</p>}
        {data?.person?.mass && <p>mass: {data.person.mass}</p>}
        {data?.person?.eyeColor && <p>eye color: {data.person.eyeColor}</p>}
        {data?.person?.hairColor && <p>hair color: {data.person.hairColor}</p>}
        {planetName && (
          <p>
            homeworld:{' '}
            <button ref={openModalButton} onClick={openModal} >
              {planetName}
            </button>
          </p>
        )}
      </div>
      {data?.person && (
        <AddToFavoritesButton person={data.person} compact={false} />
      )}

      {isModalOpen && (
        <Modal title={planetName} closeFn={closeModal}>
          <PlanetDetails planetId={data?.person?.homeworld?.id!} />
        </Modal>
      )}
    </>
  );
};

export default Person;
