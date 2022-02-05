import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import Swal from "sweetalert2";

import "@testing-library/jest-dom";
import { startChecking, startLogin, startRegister } from "../../actions/auth";
import { types } from "../../types/types";
import * as fetchModule from "../../helpers/fetch";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

Storage.prototype.setItem = jest.fn();

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const initialState = {};
let store = mockStore(initialState);

describe("Tests in auth actions", () => {
  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  test("startLogin correct", async () => {
    Storage.prototype.setItem = jest.fn();
    await store.dispatch(startLogin("test@gmail.com", "123456"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: expect.any(String),
        name: expect.any(String),
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      expect.any(String)
    );
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startLogin incorrect", async () => {
    await store.dispatch(startLogin("test@gmail.com", "test"));
    const actions = store.getActions();
    expect(actions).toEqual([]);
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Email o contraseña incorrectos",
      "error"
    );
  });

  test("startRegister correct", async () => {
    fetchModule.fetchWithoutToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "test",
          token: "ABC123",
        };
      },
    }));
    await store.dispatch(startRegister("test2@gmail.com", "123456", "test2"));
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "test",
      },
    });
    expect(localStorage.setItem).toHaveBeenCalledWith("token", "ABC123");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token-init-date",
      expect.any(Number)
    );
  });

  test("startChecking correct", async () => {
    fetchModule.fetchWithToken = jest.fn(() => ({
      json() {
        return {
          ok: true,
          uid: "123",
          name: "test",
          token: "ABC123",
        };
      },
    }));
    await store.dispatch(startChecking());
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.authLogin,
      payload: {
        uid: "123",
        name: "test",
      },
    });
    expect(localStorage.setItem).toBeCalledWith("token", expect.any(String));
  });
});
