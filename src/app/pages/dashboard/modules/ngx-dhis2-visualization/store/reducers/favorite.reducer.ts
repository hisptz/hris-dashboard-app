import {
  initialFavoriteState,
  favoriteAdapter,
  FavoriteState
} from '../states/favorite.state';
import { on, createReducer } from '@ngrx/store';
import {
  updateFavorite,
  loadFavoriteFail,
  loadFavorite,
  updateFavoriteSelections
} from '../actions/favorite.actions';
import {
  loadingBaseState,
  errorBaseState,
  loadedBaseState
} from 'src/app/store/states/base.state';

const reducer = createReducer(
  initialFavoriteState,
  on(loadFavorite, (state, { favorite }) =>
    favoriteAdapter.addOne(
      {
        ...favorite,
        notification: loadingBaseState
      },
      state
    )
  ),
  on(loadFavoriteFail, (state, { error, id }) =>
    favoriteAdapter.updateOne(
      {
        id,
        changes: {
          notification: {
            ...errorBaseState,
            error
          }
        }
      },
      state
    )
  ),
  on(updateFavorite, (state, { favorite }) =>
    favoriteAdapter.updateOne(
      {
        id: favorite.id,
        changes: { ...favorite, notification: loadedBaseState }
      },
      state
    )
  ),

  on(updateFavoriteSelections, (state, { id, changes }) =>
    favoriteAdapter.updateOne(
      {
        id,
        changes
      },
      state
    )
  )
);

export function favoriteReducer(state, action): FavoriteState {
  return reducer(state, action);
}
