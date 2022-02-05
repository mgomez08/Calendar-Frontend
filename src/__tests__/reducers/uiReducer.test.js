import { uiCloseModal, uiOpenModal } from "../../actions/ui";
import { uiReducer } from "../../reducers/uiReducer";
const initialState = {
  modalOpen: false,
};

describe("Tests for uiReducer", () => {
  test("Should return the default state", () => {
    const state = uiReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("Should open and close modal", () => {
    const modalOpen = uiOpenModal();
    const state = uiReducer(initialState, modalOpen);
    expect(state.modalOpen).toBe(true);

    const modalClose = uiCloseModal();
    const state2 = uiReducer(state, modalClose);
    expect(state2.modalOpen).toBe(false);
  });
});
