const url = 'http://localhost:3000';
const charUrl = `${url}/characters`;
const characterBar = document.querySelector('#character-bar');
let charInfo = document.querySelector('.characterInfo')
// console.log(charInfo);

    document.addEventListener('DOMContentLoaded', () => {

        fetch(charUrl)
            .then(function(response){
                return response.json();
            })
            .then(function(characters){
                span(characters);
            })
    })

    function span(characters) {
        charInfo.innerHTML = ""
        characters.forEach(character => {
            console.log(character)
        const span = document.createElement('span');
        span.innerHTML = (character.name);
        characterBar.append(span);

        let newDiv = document.createElement('div')
        newDiv.setAttribute('id', 'name');
        newDiv.innerHTML = `<p id='name'></p>`
        // newDiv.innerHTML = `<p id="name">${character.name}</p>`,
        // // <img id="image" src=${character.image}>

        
        // // <h4>Total Calories: <span id="calories">Character's Calories</span> </h4>
        // // <form id="calories-form">
        // //     <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
        // //     <input type="text" placeholder="Enter Calories" id="calories"/>
        // //     <input type="submit" value="Add Calories"/>
        // // </form>`

         });
    }