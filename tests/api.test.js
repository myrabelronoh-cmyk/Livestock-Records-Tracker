import { getAnimals, addAnimal, deleteAnimal } from "../src/api.js";

global.fetch = jest.fn();

describe("Livestock API", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("getAnimals returns data from API", async () => {
    const mockData = [{id:"1", name:"Daisy"}];
    fetch.mockResolvedValueOnce({ ok: true, json: async () => mockData });
    const result = await getAnimals();
    expect(result).toEqual(mockData);
    expect(fetch).toHaveBeenCalled();
  });

  test("getAnimals fallback to db.json on failure", async () => {
    fetch.mockRejectedValueOnce(new Error("fail"));
    const mockLocal = { json: async () => ({ animals: [{id:"2", name:"Molly"}] }) };
    fetch.mockResolvedValueOnce(mockLocal);
    const result = await getAnimals();
    expect(result.length).toBeGreaterThan(0);
  });

  test("addAnimal calls POST", async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    const animal = { id:"99", name:"Test", breed:"Friesian", age:"2", type:"Cow" };
    const result = await addAnimal(animal);
    expect(fetch).toHaveBeenCalledWith(expect.any(String), expect.objectContaining({ method:"POST" }));
  });

  test("deleteAnimal calls DELETE", async () => {
    fetch.mockResolvedValueOnce({ ok: true });
    await deleteAnimal("1");
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining("/1"), expect.objectContaining({ method:"DELETE" }));
  });
});
