const API_URL = "https://livestock-records-tracker.onrender.com/livestock";
export async function getAnimals(){
  try{
    const res = await fetch(API_URL);
    if(!res.ok) throw new Error("API fail");
    return await res.json();
  }catch(e){
    console.log("Render asleep, using local", e.message);
    const local = await fetch("./db.json").then(r=>r.json()).catch(()=>({livestock:[], animals:[]}));
    return local.livestock || local.animals || [];
  }
}
export async function getAnimalById(id){
  const animals = await getAnimals();
  return animals.find(a => a.id === id);
}
export async function addAnimal(animal){
  try{
    const res = await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(animal)});
    return await res.json();
  }catch{ return animal; }
}
export async function deleteAnimal(id){
  try{ await fetch(`${API_URL}/${id}`,{method:"DELETE"}); return true; }
  catch{ return true; }
}
export async function updateAnimal(id, data){
  try{
    const res = await fetch(`${API_URL}/${id}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(data)});
    return await res.json();
  }catch{ return data; }
}
