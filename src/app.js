// Always show Daisy & Molly even if API sleeps
const defaultAnimals = [
  { id: 1, name: "Daisy", breed: "Friesian", age: 3, type: "Cow" },
  { id: 2, name: "Molly", breed: "Jersey", age: 2, type: "Cow" }
];

let animals = JSON.parse(localStorage.getItem("livestock")) || JSON.stringify(defaultAnimals));
if (typeof animals === 'string') animals = JSON.parse(animals);
if (animals.length === 0) animals = defaultAnimals;

const recordsEl = document.getElementById("records");
const totalEl = document.getElementById("total");
const avgEl = document.getElementById("avg");
const lastEl = document.getElementById("last");

function render() {
  recordsEl.innerHTML = "";
  animals.forEach(a => {
    const div = document.createElement("div");
    div.className = "animal-card";
    div.innerHTML = `
      <h4>${a.name}</h4>
      <p>Breed: ${a.breed}</p>
      <p>Age: ${a.age} years</p>
      <p>Type: ${a.type}</p>
      <button onclick="deleteAnimal(${a.id})">Delete</button>
    `;
    recordsEl.appendChild(div);
  });
  totalEl.textContent = animals.length;
  const avg = animals.length ? (animals.reduce((s,x)=>s+Number(x.age),0)/animals.length).toFixed(1) : 0;
  avgEl.textContent = avg;
  lastEl.textContent = animals.length ? animals[animals.length-1].name : "None";
  localStorage.setItem("livestock", JSON.stringify(animals));
}

window.deleteAnimal = (id) => {
  animals = animals.filter(a => a.id != id);
  render();
};

document.getElementById("addBtn").onclick = () => {
  const name = document.getElementById("name").value;
  const breed = document.getElementById("breed").value;
  const age = document.getElementById("age").value;
  const type = document.getElementById("type").value;
  if(!name || !breed || !age) return alert("Fill all");
  animals.push({ id: Date.now(), name, breed, age, type });
  render();
  document.getElementById("name").value = "";
  document.getElementById("breed").value = "";
  document.getElementById("age").value = "";
};

render();

// Try to fetch from Render in background
fetch("https://livestock-records-tracker.onrender.com/livestock")
  .then(r=>r.json()).then(data=>{
    if(data && data.length>0){ animals = data; render(); }
  }).catch(()=>{});
