import { getAnimals, addAnimal, deleteAnimal } from "./api.js";

const recordsDiv = document.getElementById("records");
const addBtn = document.getElementById("addBtn");

async function loadRecords(){
 recordsDiv.innerHTML = "Loading...";
 try{
  const animals = await getAnimals();
  if(!animals || animals.length === 0){
   recordsDiv.innerHTML = "<p>No records yet. Add one!</p>";
   return;
  }
  recordsDiv.innerHTML = animals.map(a=>`
   <div class="record">
    <span><strong>${a.name}</strong> - ${a.breed} (${a.type}, ${a.age} yrs)</span>
    <button class="delete" onclick="window.deleteRecord('${a.id}')">Delete</button>
   </div>
  `).join("");
 }catch(err){
  recordsDiv.innerHTML = `<p style="color:red">Failed to load: ${err.message}</p>`;
 }
}

window.deleteRecord = async (id)=>{
 await deleteAnimal(id);
 loadRecords();
};

addBtn.addEventListener("click", async ()=>{
 const animal = {
  id: Date.now().toString(),
  name: document.getElementById("name").value,
  breed: document.getElementById("breed").value,
  age: document.getElementById("age").value,
  type: document.getElementById("type").value
 };
 if(!animal.name || !animal.breed) return alert("Fill name and breed");
 await addAnimal(animal);
 document.getElementById("name").value="";
 document.getElementById("breed").value="";
 document.getElementById("age").value="";
 loadRecords();
});

loadRecords();
