import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { DeleteEventFab } from "../../../components/ui/DeleteEventFab";
import { eventStartDelete } from "../../../actions/events";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {};
let store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock("../../../actions/events", () => ({
  eventStartDelete: jest.fn(),
}));

const wrapper = mount(
  <Provider store={store}>
    <DeleteEventFab />
  </Provider>
);

describe("Tests in <DeleteEventFab />", () => {
  test("Test with Snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });
  test("Should call eventStartDelete with click", () => {
    wrapper.find("button").simulate("click");
    expect(eventStartDelete).toHaveBeenCalledWith();
  });
});
