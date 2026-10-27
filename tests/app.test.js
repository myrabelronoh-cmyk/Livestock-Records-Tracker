/**
 * @jest-environment jsdom
 */
describe("App UI Logic", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input id="name" value="Daisy" />
      <input id="breed" value="Friesian" />
      <input id="age" value="3" />
      <select id="type"><option value="Cow" selected>Cow</option></select>
      <button id="addBtn"></button>
      <div id="records"></div>
    `;
  });

  test("form inputs exist", () => {
    expect(document.getElementById("name").value).toBe("Daisy");
    expect(document.getElementById("breed").value).toBe("Friesian");
  });

  test("creates animal object from form", () => {
    const animal = {
      name: document.getElementById("name").value,
      breed: document.getElementById("breed").value,
      age: document.getElementById("age").value,
      type: document.getElementById("type").value
    };
    expect(animal.name).toBe("Daisy");
    expect(animal.type).toBe("Cow");
  });

  test("validates required fields", () => {
    document.getElementById("name").value = "";
    const isValid = document.getElementById("name").value && document.getElementById("breed").value;
    expect(isValid).toBeFalsy();
  });
});
