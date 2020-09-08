const CHARACTERS_URL = "http://localhost:3000/characters"
let charCalories = 0;

document.addEventListener('DOMContentLoaded', () => {
    fetch(CHARACTERS_URL).then(r=>r.json()).then(json=>forEachChars(json));

    function forEachChars(chars){
        chars.forEach(char=>renderChar(char));
    };

    function renderChar(char){
            const characterBar = document.querySelector('#character-bar');
            const span = document.createElement('span');
            span.innerHTML = char.name;
            span.addEventListener('click', () => showChar(char));

            const caloriesForm = document.querySelector('#calories-form');
            caloriesForm.addEventListener('submit', addCalories);

            const resetButton = document.querySelector('#reset-btn');
            resetButton.addEventListener('click', resetCalories);
            characterBar.append(span);
    }; // function renderChars

    function showChar(char){
        charCalories = char.calories;

        const charName = document.querySelector('#name');
        charName.innerHTML = char.name;

        const charImage = document.querySelector('#image');
        charImage.src = char.image;

        const charId = document.querySelector('#characterId');
        charId.setAttribute('value', `${char.id}`);

        renderCalories(char);
    }; // function showChar

    function renderCalories(){
        const charCaloriess = document.querySelector('#calories');
        charCaloriess.innerHTML = charCalories;
    };

    function addCalories(e){
        e.preventDefault();

        const caloriesInput = e.target.children[1].value
        const addedCalories = parseInt(charCalories)+parseInt(caloriesInput);
        charCalories = addedCalories

        const id = e.target.children[0].value

        fetch(`http://localhost:3000/characters/${id}`, {
            method: 'PATCH',
            headers: 
            {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify ({ calories: addedCalories })
        }); // fetch
        e.target.children[1].value = "";
        renderCalories();
    }; // function submitForm

    function resetCalories(e){
        e.preventDefault();

        charCalories = 0;

        const id = e.target.parentNode.children[3].children[0].value
       
        fetch(`http://localhost:3000/characters/${id}`, {
            method: 'PATCH',
            headers: 
            {
            "Content-Type": "application/json",
            "Accept": "application/json"
            },
            body: JSON.stringify ({ calories: 0 })
        }); // fetch
        renderCalories();
    }; // function resetCalories

}); // DOM