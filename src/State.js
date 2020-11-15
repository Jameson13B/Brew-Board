export const initialState = {
  batches: [],
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_BATCHES:
      return {
        ...state,
        batches: action.payload,
      }
    default:
      return state
  }
}

export const ACTIONS = {
  LOAD_BATCHES: 'brew/load_batches',
}
