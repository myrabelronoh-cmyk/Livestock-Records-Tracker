const API_URL = "https://my-json-server.typicode.com/myrabelronoh-cmyk/Livestock-Records-Tracker/animals";

export async function getAnimals(){
 try{
  const res = await fetch(API_URL);
  if(!res.ok) throw new Error("Network error");
  return await res.json();
 }catch(e){
  console.log("Using local data", e);
  const local = await fetch("./db.json").then(r=>r.json()).catch(()=>({animals:[]}));
  return local.animals || [];
 }
}

export async function addAnimal(animal){
 try{
  await fetch(API_URL,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(animal)});
 }catch(e){ console.log("Mock add", e); }
 return animal;
}

export async function deleteAnimal(id){
 try{
  await fetch(`${API_URL}/${id}`,{method:"DELETE"});
 }catch(e){ console.log("Mock delete", e); }
}
