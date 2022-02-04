import { types } from "../../types/types";

describe("Tests Types", () => {
  test("types should be equal", () => {
    expect(types).toEqual({
      //UI
      uiOpenModal: "[UI]Open Modal",
      uiCloseModal: "[UI]Close Modal",

      //Events calendar
      eventStartAddNew: "[EVENTS]Start Add New",
      eventAddNew: "[EVENTS]Add New",
      eventSetActive: "[EVENTS]Set Active",
      eventClearNoteActive: "[EVENTS]Clear Note Active",
      eventUpdated: "[EVENTS]Updated Event",
      eventDeleted: "[EVENTS]Deleted Event",
      eventLoaded: "[EVENTS]Events Loaded",
      eventLogout: "[EVENTS]Event Logout",

      //Auth
      authChekingFinish: "[AUTH]Finish Cheking Login State",
      authStartLogin: "[AUTH]Start Login",
      authLogin: "[AUTH]Login",
      authStartRegister: "[AUTH]Start Register",
      authStartTokenRefresh: "[AUTH]Start Token Refresh",
      authLogout: "[AUTH]Logout",
    });
  });
});
