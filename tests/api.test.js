import { getAnimals, addAnimal, deleteAnimal } from "../src/api.js";
global.fetch = jest.fn();
describe("API", () => {
  beforeEach(() => fetch.mockClear());
  test("getAnimals success", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => [{ id: "1" }] });
    const data = await getAnimals();
    expect(data.length).toBe(1);
  });
  test("getAnimals fallback when Render down", async () => {
    fetch.mockRejectedValueOnce(new Error("fail"));
    fetch.mockResolvedValueOnce({ json: async () => ({ livestock: [{ id: "2" }] }) });
    const data = await getAnimals();
    expect(data.length).toBeGreaterThan(0);
  });
  test("addAnimal calls POST", async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({ id: "99" }) });
    await addAnimal({ id: "99", name: "Daisy" });
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ method: "POST" }));
  });
  test("deleteAnimal calls DELETE", async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    await deleteAnimal("1");
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/1"), expect.objectContaining({ method: "DELETE" }));
  });
});
