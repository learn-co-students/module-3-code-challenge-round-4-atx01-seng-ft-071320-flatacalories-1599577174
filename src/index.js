const charURL = 'http://localhost:3000/characters'
const characterBar = document.querySelector('#character-bar')
const detailInfoDiv = document.querySelector('#detailed-info')
const name = document.querySelector('#name')
const img = document.querySelector('#image')
const calories = document.querySelector('#calories')

document.addEventListener('submit', addCalories)

fetchCharacters();

function fetchCharacters() {
    fetch(charURL)
        .then(r => r.json())
        .then(renderCharacters)
}

function renderCharacters(characters) {
    for (const character of characters) {
        renderCharacter(character)
    }
}

function renderCharacter(char) {
    const span = document.createElement("span")
    span.innerHTML = char.name
    span.setAttribute('data-id', char.id)
    span.addEventListener('click', showCharInfo)
    characterBar.append(span)
}

function showCharInfo(e) {
    const charId = e.target.dataset.id

    fetch(`http://localhost:3000/characters/${charId}`)
    .then(response => response.json())
    .then(char => {
        name.innerHTML = char.name
        img.src = char.image
        calories.innerHTML = char.calories
        document.querySelector('#characterId').value = charId
    })
    
}

function addCalories(e){
    e.preventDefault()
     let charId = parseInt(e.target.characterId.value)
    let addCalories = e.target.calories.value
    calories.innerHTML = parseInt(calories.innerHTML) + parseInt(addCalories)
     
    let formData = { calories: `${parseInt(calories.innerHTML)}` };


    let configObj = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(formData)
    };
  
  
    fetch(`${charURL}/${charId}`, configObj)
      .then(r => r.json())
      .then(console.log)
   
  
}
