export const initialState = {
  batches: [],
  selectedBatch: null,
  showModal: false,
}

export const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOAD_BATCHES:
      return {
        ...state,
        batches: action.payload,
      }
    case ACTIONS.SELECT_BATCH:
      return {
        ...state,
        selectedBatch: action.payload,
        showModal: true,
      }
    case ACTIONS.CLOSE_MODAL:
      return {
        ...state,
        selectedBatch: initialState.selectedBatch,
        showModal: false,
      }
    default:
      return state
  }
}

export const ACTIONS = {
  LOAD_BATCHES: 'brew/load_batches',
  SELECT_BATCH: 'brew/select_batch',
  CLOSE_MODAL: 'brew/close_modal',
}
