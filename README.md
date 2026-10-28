# Livestock Records Tracker 

Live Link: https://myrabelronoh-cmyk.github.io/Livestock-Records-Tracker/  

API: https://livestock-records-tracker.onrender.com/livestock

### 1. Problem Statement
Many small-scale farmers keep animal info in their head or on paper.
This causes:
- Forgetting age of animal
- Missing vaccinations
- Losing breeding history
- No clear record of how many animals they have

Farmers need a simple visual dashboard on a web page to see all animals in one place.

### 2. Proposed Solution
I built Livestock Records Tracker - a responsive frontend app.

It gives farmers:
- A visual gallery of their farm animals
- A form to add new animal: Name, Breed, Age, Type (Cow, Goat, Sheep)
- Dashboard with simple numbers: Total animals, Average Age, Last Added
- Works without complex backend - uses mock API on Render + local db.json if API sleeps
- Dark farm UI so it is easy on eyes at night

### 3. Minimum Viable Product (MVP) - What the App Does Now
**Farmer Features:**
- Dynamic Animal Directory (All Records cards)
- Add New Livestock
- Remove Profiles (Delete button)
- Dashboard metrics: Total, Avg Age, Last Added

**Data Operations:**
- Add New Livestock (POST)
- View All Livestock (GET)
- Remove Profiles (DELETE)

**Tech Stack:**
- HTML
- CSS - midnight dark farm theme
- JavaScript - vanilla, ES Modules
- GitHub - for code and GitHub Pages hosting
- Render - to host json-server API

### 4. How to Use
1. Open live link
2. Fill Name, Breed, Age, Type
3. Click Add Animal
4. See it appear in All Records
5. Dashboard updates automatically: Total +1, Avg Age recalculates, Last Added shows name
6. Click Delete to remove

```bash
npm install
npm test
npx serve .
