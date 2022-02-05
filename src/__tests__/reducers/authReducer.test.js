import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";

const initialState = {
  checking: true,
};

describe("Tests for authReducer", () => {
  test("Should return the default state", () => {
    const state = authReducer(initialState, {});
    expect(state).toEqual(initialState);
  });

  test("Should return the state of authLogin", () => {
    const action = {
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "test",
      },
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      checking: false,
      uid: "123",
      name: "test",
    });
  });

  test("Should return the state of authLogout", () => {
    const action = {
      type: types.authLogout,
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      checking: false,
    });
  });

  test("Should return checking finish", () => {
    const action = {
      type: types.authChekingFinish,
    };
    const state = authReducer(initialState, action);
    expect(state).toEqual({
      checking: false,
    });
  });
});
