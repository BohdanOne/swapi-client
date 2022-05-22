import { FC, useContext } from 'react';
import { FavoritesContext } from '../../providers/FavoritesProvider';
import { FavoritesActions } from '../../reducers/favoritesReducer';
import { ToastContext } from '../../providers/ToastProvider';
import { ToastActions } from '../../reducers/toastReducer';
import { Person } from '../../generated/graphql';

const FavoritesButton: FC<{ person: Person; compact?: boolean }> = ({
  person,
  compact = true,
}) => {
  const { favorites, modifyFavorites } = useContext(FavoritesContext);
  const { toastAction } = useContext(ToastContext);
  const isPersonAlreadyFavorited = favorites.find(
    (favoritePerson) => favoritePerson.id === person.id
  );

  const addPerson = () => {
    modifyFavorites &&
      modifyFavorites({
        type: FavoritesActions.ADD_TO_FAVORITES,
        payload: person,
      });
    toastAction &&
      toastAction({
        type: ToastActions.SEND_TOAST,
        payload: {
          id: new Date(),
          type: 'success',
          message: `${person.name} was added to your Favorites`,
        },
      });
  };

  const removePerson = () => {
    modifyFavorites &&
      modifyFavorites({
        type: FavoritesActions.REMOVE_FROM_FAVORITES,
        payload: person,
      });
    toastAction &&
      toastAction({
        type: ToastActions.SEND_TOAST,
        payload: {
          id: new Date(),
          type: 'warning',
          message: `${person.name} was removed from your Favorites`,
        },
      });
  };

  return (
    <>
      {isPersonAlreadyFavorited ? (
        <button
          type='button'
          aria-label='remove from your favorites'
          onClick={removePerson}
        >
          {compact ? '-' : 'Remove from Favorites'}
        </button>
      ) : (
        <button
          type='button'
          aria-label='add to your favorites'
          onClick={addPerson}
        >
          {compact ? '+' : 'Add to Favorites'}
        </button>
      )}
    </>
  );
};

export default FavoritesButton;
