import { fetchWithToken } from "../../helpers/fetch";

describe("Test for Helpers", () => {
  let token = "";

  test("fetchWithoutToken should be work", async () => {
    const resp = await fetchWithToken(
      "auth",
      { email: "marlon@gmail.com", password: "marlon2013" },
      "POST"
    );
    expect(resp instanceof Response).toBe(true);
    const body = await resp.json();
    expect(body.ok).toBe(true);
    token = body.token;
  });

  test("fetchWithToken should be work", async () => {
    localStorage.setItem("token", token);
    const resp = await fetchWithToken(
      "events/5ee25d21c25cce32af01a3f3",
      {},
      "DELETE"
    );
    const body = await resp.json();
    expect(body.msg).toBe(
      "El id del evento a eliminar es incorrecto, inténtelo de nuevo."
    );
  });
});
