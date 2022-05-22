import { ChangeEventHandler, FC } from 'react';
import PersonLine from '../PersonLine/PersonLine';
import { Person } from '../../generated/graphql';
import styles from './Search.module.css';

const Search: FC<{
  searchTerm: string;
  handleSearch: ChangeEventHandler<HTMLInputElement>;
  searchResults: Person[];
}> = ({ searchTerm, handleSearch, searchResults }) => {
  return (
    <section className={styles.search}>
      <h2>Find character</h2>
      <input
        type='search'
        name='search'
        id='search'
        value={searchTerm}
        onChange={handleSearch}
        placeholder='type character name'
      />
      <ul>
        {searchResults &&
          searchResults.map((person) => (
            <PersonLine key={person.id} person={person} />
          ))}
      </ul>
    </section>
  );
};

export default Search;
