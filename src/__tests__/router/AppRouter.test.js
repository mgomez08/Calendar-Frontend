import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { AppRouter } from "../../router/AppRouter";
import { Loading } from "../../components/ui/Loading";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
// store.dispatch = jest.fn();

describe("Tests in <AppRouter />", () => {
  test("Should display <Loading />", () => {
    const initialState = {
      auth: {
        checking: true,
      },
    };
    let store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper.find(Loading).exists()).toBe(true);
  });

  test("Should display PublicRoute", () => {
    const initialState = {
      auth: {
        checking: false,
        uid: null,
      },
    };
    let store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".login-container").exists()).toBe(true);
  });

  test("Should display PrivateRoute", () => {
    const initialState = {
      calendar: {
        events: [],
      },
      auth: {
        checking: false,
        uid: "123",
        name: "Test",
      },
      ui: {
        modalOpen: false,
      },
    };
    let store = mockStore(initialState);
    const wrapper = mount(
      <Provider store={store}>
        <AppRouter />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(".calendar-screen").exists()).toBe(true);
  });
});
