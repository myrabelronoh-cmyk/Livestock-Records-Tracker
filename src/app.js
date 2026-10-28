const form = document.getElementById('animalForm');
const recordsEl = document.getElementById('records');
const totalCountEl = document.getElementById('totalCount');
const avgAgeEl = document.getElementById('avgAge');
const lastAddedEl = document.getElementById('lastAdded');

let animals = JSON.parse(localStorage.getItem('livestock')) || [
  { id:1, name:'Daisy', breed:'Friesian', age:3, type:'Cow' },
  { id:2, name:'Molly', breed:'Boer', age:2, type:'Goat' }
];

function render() {
  recordsEl.innerHTML = '';
  animals.forEach(a => {
    const div = document.createElement('div');
    div.className = 'record';
    div.innerHTML = `
      <h4>${a.name}</h4>
      <p>Breed: ${a.breed}</p>
      <p>${a.type} • ${a.age} yrs</p>
      <button class="btn-delete" onclick="deleteAnimal(${a.id})">Delete</button>
    `;
    recordsEl.appendChild(div);
  });

  totalCountEl.textContent = animals.length;
  const avg = animals.length ? (animals.reduce((s,a)=>s+Number(a.age),0)/animals.length).toFixed(1) : 0;
  avgAgeEl.textContent = avg;
  lastAddedEl.textContent = animals.length ? animals[animals.length-1].name : 'None';
  
  localStorage.setItem('livestock', JSON.stringify(animals));
}

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  const newAnimal = {
    id: Date.now(),
    name: document.getElementById('name').value,
    breed: document.getElementById('breed').value,
    age: document.getElementById('age').value,
    type: document.getElementById('type').value
  };
  animals.push(newAnimal);
  form.reset();
  render();
});

window.deleteAnimal = (id) => {
  animals = animals.filter(a=>a.id!==id);
  render();
};

render();
