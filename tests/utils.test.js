import { formatAnimal, validateAnimal, calculateAverageAge } from "../src/utils.js";

describe("Utils - 100% coverage to boost total", () => {
  test("formatAnimal formats correctly", () => {
    const a = {name:"Daisy", breed:"Friesian", type:"Cow", age:"3"};
    expect(formatAnimal(a)).toBe("Daisy - Friesian (Cow, 3 yrs)");
  });

  test("formatAnimal empty", () => {
    expect(formatAnimal(null)).toBe("");
  });

  test("validateAnimal valid", () => {
    expect(validateAnimal({name:"D", breed:"F", age:"2"})).toBe(true);
  });

  test("validateAnimal invalid - no name", () => {
    expect(validateAnimal({breed:"F", age:"2"})).toBe(false);
  });

  test("validateAnimal invalid - bad age", () => {
    expect(validateAnimal({name:"D", breed:"F", age:"abc"})).toBe(false);
  });

  test("calculateAverageAge", () => {
    const animals = [{age:"2"}, {age:"4"}];
    expect(calculateAverageAge(animals)).toBe(3);
  });

  test("calculateAverageAge empty", () => {
    expect(calculateAverageAge([])).toBe(0);
    expect(calculateAverageAge(null)).toBe(0);
  });
});
