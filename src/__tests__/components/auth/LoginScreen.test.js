import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import Swal from "sweetalert2";
import { startLogin, startRegister } from "../../../actions/auth";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock("../../../actions/auth", () => ({
  startLogin: jest.fn(),
  startRegister: jest.fn(),
}));
jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <LoginScreen />
  </Provider>
);

describe("Tests <LoginScreen />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Should call dispatch of login", () => {
    wrapper.find('input[name="lEmail"]').simulate("change", {
      target: {
        name: "lEmail",
        value: "test@gmail.com",
      },
    });
    wrapper.find('input[name="lPassword"]').simulate("change", {
      target: {
        name: "lPassword",
        value: "123456",
      },
    });
    wrapper.find("form").at(0).prop("onSubmit")({
      preventDefault() {},
    });
    expect(startLogin).toHaveBeenCalledWith("test@gmail.com", "123456");
  });

  test("Shouldnt call startRegister", () => {
    wrapper.find('input[name="rName"]').simulate("change", {
      target: {
        name: "rName",
        value: "testing",
      },
    });
    wrapper.find('input[name="rEmail"]').simulate("change", {
      target: {
        name: "rEmail",
        value: "testing@gmail.com",
      },
    });
    wrapper.find('input[name="rPassword1"]').simulate("change", {
      target: {
        name: "rPassword1",
        value: "123456",
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "1234567",
      },
    });
    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });
    expect(startRegister).not.toHaveBeenCalled();
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "Las contraseñas deben ser iguales",
      "error"
    );
  });

  test("Should call startRegister", () => {
    wrapper.find('input[name="rPassword1"]').simulate("change", {
      target: {
        name: "rPassword1",
        value: "123456",
      },
    });
    wrapper.find('input[name="rPassword2"]').simulate("change", {
      target: {
        name: "rPassword2",
        value: "123456",
      },
    });
    wrapper.find("form").at(1).prop("onSubmit")({
      preventDefault() {},
    });
    expect(Swal.fire).not.toHaveBeenCalled();
    expect(startRegister).toHaveBeenCalledWith(
      "testing@gmail.com",
      "123456",
      "testing"
    );
  });

  test("Test with Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
