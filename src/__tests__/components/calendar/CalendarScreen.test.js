import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import "@testing-library/jest-dom";
import { act } from "@testing-library/react";
import { CalendarScreen } from "../../../components/calendar/CalendarScreen";
import { messages } from "../../../helpers/calendar-messages-es";
import { types } from "../../../types/types";
import { eventSetActive } from "../../../actions/events";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const initialState = {
  calendar: {
    events: [],
  },
  auth: {
    uid: "123",
    name: "test",
  },
  ui: {
    openModal: false,
  },
};
let store = mockStore(initialState);
store.dispatch = jest.fn();

jest.mock("../../../actions/events", () => ({
  eventSetActive: jest.fn(),
  eventStartLoading: jest.fn(),
}));

Storage.prototype.setItem = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarScreen />
  </Provider>
);

describe("Tests in <CalendarScreen />", () => {
  test("Test with snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  test("Tests with interactions calender", () => {
    const calendar = wrapper.find("Calendar");

    const calendarMessages = calendar.prop("messages");
    expect(calendarMessages).toEqual(messages);

    calendar.prop("onDoubleClickEvent")();
    expect(store.dispatch).toHaveBeenCalledWith({
      type: types.uiOpenModal,
    });

    calendar.prop("onSelectEvent")({ start: "Hola" });
    expect(eventSetActive).toHaveBeenCalledWith({ start: "Hola" });

    act(() => {
      calendar.prop("onView")("week");
      expect(localStorage.setItem).toHaveBeenCalledWith("lastView", "week");
    });
  });
});
