import { useContext } from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import { FavoritesContext } from '../providers/FavoritesProvider';
import PersonLine from '../components/PersonLine/PersonLine';

const Favorites: NextPage = () => {
  const { favorites } = useContext(FavoritesContext);
  return (
    <>
      <Head>
        <title>People of Star Wars | Favorites</title>
        <meta
          name='description'
          content='Browse your favoritr Star Wars characters'
        />
      </Head>
      <header>
        <h1>Favorite characters</h1>
      </header>
      <ul>
        {favorites?.length ? (
          favorites.map((person) => (
            <PersonLine key={person.id} person={person} />
          ))
        ) : (
          <p>You do not have any favorite character yet</p>
        )}
      </ul>
    </>
  );
};

export default Favorites;
