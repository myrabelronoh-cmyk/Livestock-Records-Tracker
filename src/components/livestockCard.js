export function createCard(animal, onDelete){
  const div = document.createElement("div");
  div.className = "livestock-card";
  div.innerHTML = `
    <h4>${animal.name}</h4>
    <p><strong>Breed:</strong> ${animal.breed}</p>
    <p>${animal.type} • ${animal.age} yrs</p>
    <button class="delete-btn">Delete</button>
  `;
  const btn = div.querySelector(".delete-btn");
  btn.style.cssText = "background:#ef5350;border:none;padding:6px 10px;border-radius:6px;color:white;cursor:pointer;margin-top:8px;width:100%";
  btn.addEventListener("click", ()=>onDelete(animal.id));
  return div;
}
