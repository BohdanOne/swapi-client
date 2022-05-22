import React, { createContext, FC, ReactElement, useEffect, useReducer } from 'react';
import {
  favoritesReducer,
  FavoritesActions,
} from '../reducers/favoritesReducer';
import { Person } from '../generated/graphql';

interface FavoritesContext {
  favorites: Person[];
  modifyFavorites: React.Dispatch<{
    type: FavoritesActions;
    payload?: Person;
  }> | null;
}

const DEFAULT_FAVORTIES: Person[] = [];

export const FavoritesContext = createContext<FavoritesContext>({
  favorites: DEFAULT_FAVORTIES,
  modifyFavorites: null,
});

const FavoritesProvider: FC<{ children: ReactElement }> = ({
  children,
}) => {
  const [favorites, modifyFavorites] = useReducer(
    favoritesReducer,
    DEFAULT_FAVORTIES
  );

  useEffect(() => {
    !favorites?.length &&
      modifyFavorites &&
      modifyFavorites({ type: FavoritesActions.FETCH_FAVORITES });
  }, []);

  return (
    <FavoritesContext.Provider value={{ favorites, modifyFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
