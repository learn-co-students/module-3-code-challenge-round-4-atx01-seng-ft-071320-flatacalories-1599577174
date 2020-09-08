document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/characters")
    .then(res => res.json())
    .then(renderCharacters)

})

function renderCharacters(characters){
    characters.forEach(renderCharacter)
}

function renderCharacter(data){
let div = document.querySelector("#character-bar")
let characterSpan = document.createElement('span')    
characterSpan.innerHTML = data.name;
characterSpan.setAttribute("id", data.id)
characterSpan.setAttribute("src", data.image)
characterSpan.setAttribute("calories", data.calories)
div.append(characterSpan)
characterSpan.addEventListener("click", detailDiv)

}


function detailDiv(e){
    
let div = document.querySelector("#detailed-info")
let character = e.target
div.querySelector("#name").innerText = character.innerText
div.querySelector("#image").src = character.getAttribute("src")
div.querySelector("#calories").innerText = character.getAttribute("calories")
div.setAttribute("character-id", character.id)
const calorieForm = document.querySelector("#calories-form")
calorieForm.addEventListener("submit", addCalories)
document.querySelector("#reset-btn").addEventListener("click", clearCalories)
}

function addCalories(e){
    e.preventDefault()
    let calories = e.target.parentElement.querySelector("#calories").innerText
    let id = e.target.parentElement.getAttribute("character-id")
    

    
    let newCalories = e.target.querySelector("#calories").value
    let idAssignment = e.target.querySelector("#characterId")
    idAssignment = id
    let finalCalories = parseInt(newCalories) + parseInt(calories)
  
   
   
    let configObject = {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "calories": finalCalories,
        })
    }
    fetch(`http://localhost:3000/characters/${id}`, configObject) 
.then(res => res.json())
.then(() => {
 e.target.parentElement.querySelector("#calories").innerText = finalCalories
})
}

function clearCalories(e){
let objId = e.target.parentElement.getAttribute("character-id")
e.target.parentElement.querySelector("#calories").innerText = 0
let configObject = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Accept: "application/json"
    },
    body: JSON.stringify({
        "calories": 0,
    })
}
fetch(`http://localhost:3000/characters/${objId}`, configObject) 

}