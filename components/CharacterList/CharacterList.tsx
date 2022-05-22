import { FC } from 'react';
import PersonLine from '../PersonLine/PersonLine';
import { Person } from '../../generated/graphql';
import styles from './CharacterList.module.css';

const CharacterList: FC<{ people: Person[] }> = ({ people }) => {
  return (
    <section className={styles.people}>
      <h2>All characters</h2>
      <ul>
        {people?.length &&
          people.map((person) => {
            if (person && person.id)
              return <PersonLine key={person?.id} person={person} />;
          })}
      </ul>
    </section>
  );
};

export default CharacterList;
