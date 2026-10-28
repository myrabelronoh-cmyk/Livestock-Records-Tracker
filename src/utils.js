export function formatAnimal(a){
  if(!a) return "";
  return `${a.name} - ${a.breed} (${a.type}, ${a.age} yrs)`;
}
export function validateAnimal(a){
  if(!a || !a.name || !a.breed) return false;
  if(!a.age || isNaN(Number(a.age)) || Number(a.age) < 0) return false;
  if(!a.type) return false;
  return true;
}
export function calculateAverageAge(arr){
  if(!arr || !arr.length) return 0;
  const total = arr.reduce((s,x)=>s+Number(x.age||0),0);
  return total/arr.length;
}
export function getTotalCount(arr){ return arr ? arr.length : 0; }
export function filterByType(arr, type){
  if(!type || type === "All") return arr;
  return arr.filter(a => a.type === type);
}
export function sortByName(arr){
  return [...arr].sort((a,b)=>a.name.localeCompare(b.name));
}
export function showFeedback(msg, type="success"){
  const el = document.getElementById("feedback-message");
  if(!el) return;
  el.textContent = msg;
  el.className = type;
  el.classList.remove("hidden");
  setTimeout(()=>el.classList.add("hidden"), 3000);
}
