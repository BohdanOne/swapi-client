import { getFromStorage, saveToStorage } from '../utils/storage';
import { Person } from '../generated/graphql';

export enum FavoritesActions {
  ADD_TO_FAVORITES = 'ADD',
  REMOVE_FROM_FAVORITES = 'REMOVE',
  FETCH_FAVORITES = 'FETCH_ALL',
}

const STORAGE_KEY = 'SWAPI-FAV';

export const favoritesReducer = (
  favorites: Person[],
  action: { type: FavoritesActions; payload?: Person }
): Person[] => {
  switch (action.type) {
    case FavoritesActions.ADD_TO_FAVORITES:
      const isAlreadyFavorited = favorites.find(
        (person) => person.id === action.payload!.id
      );
      const newFavorites = isAlreadyFavorited
        ? favorites
        : ([...favorites, action.payload] as Person[]);
      saveToStorage(STORAGE_KEY, newFavorites);
      return newFavorites;
    case FavoritesActions.REMOVE_FROM_FAVORITES:
      const filtredFavorites = favorites.filter(
        (person) => person.id !== action.payload!.id
      );
      saveToStorage(STORAGE_KEY, filtredFavorites);
      return filtredFavorites;
    case FavoritesActions.FETCH_FAVORITES:
      return getFromStorage(STORAGE_KEY);
    default:
      return favorites;
  }
};
