export function formatAnimal(animal){
  if(!animal) return "";
  return `${animal.name} - ${animal.breed} (${animal.type}, ${animal.age} yrs)`;
}

export function validateAnimal(animal){
  if(!animal.name || !animal.breed) return false;
  if(!animal.age || isNaN(animal.age)) return false;
  return true;
}

export function calculateAverageAge(animals){
  if(!animals || animals.length === 0) return 0;
  const total = animals.reduce((sum, a) => sum + Number(a.age || 0), 0);
  return total / animals.length;
}
