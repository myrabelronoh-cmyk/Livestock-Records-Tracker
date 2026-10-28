import { getAnimals, addAnimal, deleteAnimal } from "./api.js";
import { calculateAverageAge, validateAnimal, showFeedback } from "./utils.js";
import { createCard } from "./components/livestockCard.js";

const list = document.getElementById("livestock-list");
const btn = document.getElementById("submit-btn");

async function load(){
  list.innerHTML = "Loading...";
  try{
    const animals = await getAnimals();
    document.getElementById("total-count").textContent = animals.length;
    document.getElementById("avg-age").textContent = calculateAverageAge(animals).toFixed(1);
    if(!animals.length){ list.innerHTML = "<p>No records yet</p>"; return; }
    list.innerHTML = "";
    animals.forEach(a => {
      const card = createCard(a, async (id)=>{
        await deleteAnimal(id);
        showFeedback("Deleted","success");
        load();
      });
      list.appendChild(card);
    });
  }catch(e){
    list.innerHTML = `<p style="color:#ef5350">Error: ${e.message}</p>`;
  }
}

window.del = async (id)=>{ await deleteAnimal(id); load(); };

btn.addEventListener("click", async ()=>{
  const animal = {
    id: Date.now().toString(),
    name: document.getElementById("name").value.trim(),
    breed: document.getElementById("breed").value.trim(),
    age: document.getElementById("age").value,
    type: document.getElementById("type").value
  };
  if(!validateAnimal(animal)){
    showFeedback("Fill name, breed, valid age","error");
    return;
  }
  await addAnimal(animal);
  document.getElementById("last-added").textContent = animal.name;
  showFeedback(`Added ${animal.name}!`,"success");
  document.getElementById("name").value="";
  document.getElementById("breed").value="";
  document.getElementById("age").value="";
  load();
});

load();
