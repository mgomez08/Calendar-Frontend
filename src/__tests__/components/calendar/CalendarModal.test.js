import { mount } from "enzyme";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import moment from "moment";
import "@testing-library/jest-dom";
import { CalendarModal } from "../../../components/calendar/CalendarModal";
import {
  eventStartUpdate,
  eventClearActiveEvent,
  startEventAddNew,
} from "../../../actions/events";
import { act } from "@testing-library/react";
import Swal from "sweetalert2";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock("../../../actions/events", () => ({
  eventStartUpdate: jest.fn(),
  eventClearActiveEvent: jest.fn(),
  startEventAddNew: jest.fn(),
}));

jest.mock("sweetalert2", () => ({
  fire: jest.fn(),
}));

const now = moment().minutes(0).seconds(0).add(1, "hours");
const nowPlus1h = now.clone().add(1, "hours");

const initialState = {
  calendar: {
    events: [],
    activeEvent: {
      title: "Hello world",
      notes: "Some notes",
      start: now.toDate(),
      end: nowPlus1h.toDate(),
    },
  },
  auth: {
    uid: "123",
    name: "test",
  },
  ui: {
    modalOpen: true,
  },
};
let store = mockStore(initialState);
store.dispatch = jest.fn();

const wrapper = mount(
  <Provider store={store}>
    <CalendarModal />
  </Provider>
);

describe("Tests in <CalendarModal />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Should display modal", () => {
    expect(wrapper.find(".modal").exists()).toBe(true);
  });

  test("Should call Update and Close Modal Action", () => {
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    expect(eventStartUpdate).toHaveBeenCalledWith(
      initialState.calendar.activeEvent
    );
    expect(eventClearActiveEvent).toHaveBeenCalledWith();
  });

  test("Should create a new event", () => {
    const initialState = {
      calendar: {
        events: [],
        activeEvent: null,
      },
      auth: {
        uid: "123",
        name: "test",
      },
      ui: {
        modalOpen: true,
      },
    };
    let store = mockStore(initialState);
    store.dispatch = jest.fn();

    const wrapper = mount(
      <Provider store={store}>
        <CalendarModal />
      </Provider>
    );

    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hello world",
      },
    });
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    expect(startEventAddNew).toHaveBeenCalledWith({
      end: expect.anything(),
      start: expect.anything(),
      title: "Hello world",
      notes: "",
    });
  });

  test("Should valid dates", () => {
    wrapper.find('input[name="title"]').simulate("change", {
      target: {
        name: "title",
        value: "Hello world",
      },
    });
    const today = new Date();
    act(() => {
      wrapper.find("DateTimePicker").at(1).prop("onChange")(today);
    });
    wrapper.find("form").simulate("submit", {
      preventDefault() {},
    });
    expect(Swal.fire).toHaveBeenCalledWith(
      "Error",
      "La fecha fin debe ser mayor a la fecha de inicio",
      "error"
    );
  });
});
