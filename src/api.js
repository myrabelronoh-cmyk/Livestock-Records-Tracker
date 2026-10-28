const API_URL = "https://livestock-records-tracker.onrender.com/livestock";
const LOCAL_URL = "/db.json";

export async function getLivestock() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Render sleeping");
    return await res.json();
  } catch (err) {
    console.log("Using local db.json fallback");
    try {
      const local = await fetch(LOCAL_URL);
      const data = await local.json();
      return data.livestock || [];
    } catch {
      // if both fail, check localStorage
      const saved = localStorage.getItem("livestock");
      return saved ? JSON.parse(saved) : [];
    }
  }
}

// Add new livestock
export async function addLivestock(animal) {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(animal)
    });
    if (!res.ok) throw new Error("Failed");
    return await res.json();
  } catch (err) {
    // Fallback to localStorage
    const saved = localStorage.getItem("livestock");
    const list = saved ? JSON.parse(saved) : [];
    const newAnimal = { id: Date.now(), ...animal };
    list.push(newAnimal);
    localStorage.setItem("livestock", JSON.stringify(list));
    return newAnimal;
  }
}

// Delete livestock
export async function deleteLivestock(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    return true;
  } catch (err) {
    // Fallback to localStorage
    const saved = localStorage.getItem("livestock");
    const list = saved ? JSON.parse(saved) : [];
    const filtered = list.filter(a => a.id != id);
    localStorage.setItem("livestock", JSON.stringify(filtered));
    return true;
  }
}
