import { formatAnimal, validateAnimal, calculateAverageAge, getTotalCount } from "../src/utils.js";
describe("Utils", () => {
  test("formatAnimal", () => {
    expect(formatAnimal({ name: "Daisy", breed: "Friesian", type: "Cow", age: "3" })).toBe("Daisy - Friesian (Cow, 3 yrs)");
  });
  test("validateAnimal passes", () => {
    expect(validateAnimal({ name: "D", breed: "F", age: "2", type: "Cow" })).toBe(true);
  });
  test("validateAnimal fails", () => {
    expect(validateAnimal({ name: "", breed: "F", age: "2" })).toBe(false);
  });
  test("calculateAverageAge", () => {
    expect(calculateAverageAge([{ age: "2" }, { age: "4" }])).toBe(3);
  });
  test("getTotalCount", () => {
    expect(getTotalCount([{}, {}])).toBe(2);
  });
});
