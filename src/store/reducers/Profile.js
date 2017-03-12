import assignAll from 'lodash/fp/assignAll';
import get from 'lodash/fp/get';

const initialState = {
  error: null,
  isPending: false,
  userProfile: {},
  cache: {},
};

export function getFromCache(username: string): Function {
  return get(`profile.cache.${username}`);
}

export default function profileReducer(state: Object = initialState, action: Object) {
  switch (action.type) {

    case 'PROFILE_REQUEST':
      return assignAll([
        state,
        {isPending: true},
      ]);

    case 'PROFILE_SUCCESS': {
      const {profile} = action;
      const cacheKey = profile.login;
      const newState = assignAll([
        state,
        {
          isPending: false,
          error: null,
          userProfile: profile,
        },
      ]);

      if (!state.cache[cacheKey]) {
        newState.cache[cacheKey] = profile;
      }

      return newState;
    }

    case 'PROFILE_FAILURE': {
      const {response, message} = action;
      return assignAll([
        state,
        {
          isPending: false,
          error: {
            response,
            message,
          },
        },
      ]);
    }

    default:
      return state;

  }
}