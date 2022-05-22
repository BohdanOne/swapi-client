import { FC } from 'react';
import Link from 'next/link';
import AddToFavoritesButton from '../FavoritesButton/FavoritesButton';
import { Person } from '../../generated/graphql';

const PersonLine: FC<{ person: Person }> = ({ person }) => (
  <li>
    <Link href={`/person/${person.id}`}>{person?.name}</Link>
    <AddToFavoritesButton person={person} />
  </li>
);

export default PersonLine;
