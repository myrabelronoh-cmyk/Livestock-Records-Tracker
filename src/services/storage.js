// Local fallback service if Render is down
export function saveLocal(key, data){
  try{ localStorage.setItem(key, JSON.stringify(data)); }catch{}
}
export function getLocal(key){
  try{ return JSON.parse(localStorage.getItem(key)) || []; }catch{ return []; }
}
export function clearLocal(key){
  try{ localStorage.removeItem(key); }catch{}
}
