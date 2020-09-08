document.addEventListener("DOMContentLoaded", () => {
    const characterBar = document.getElementById("character-bar")
    const url = `http://localhost:3000/characters`
    document.addEventListener("submit", addCalories)


    fetchCharacters().then(renderCharactersBar)

    function fetchCharacters(){
        return fetch(url)
        .then(r => r.json())
    }

    function renderCharactersBar(character){
        character.forEach(addCharacterToBar)
    }

    function addCharacterToBar(character){
        const span = document.createElement("span")
        span.innerText = character.name
        span.setAttribute("data-id", character.id)
        span.addEventListener("click", showInfo)
        characterBar.append(span)
    }

    function showInfo(event) {
        const characterId = event.target.dataset.id
        const detailedInfoDiv = document.getElementById("detailed-info")
        const p = document.getElementById("name")
        const img = document.getElementById("image")
        const h4Calories = document.getElementById("calories")
        const characterIdInput = document.getElementById("characterId")
        characterIdInput.innerText = event.target.dataset.id
        // console.log(characterIdInput)
        detailedInfoDiv.setAttribute("data-character-id", characterId)
        const resetButton = detailedInfoDiv.querySelector("button")
        resetButton.setAttribute("data-character-id", characterId)

        fetch(`http://localhost:3000/characters/${characterId}`)
        .then(response => response.json())
        .then(character => {
            p.innerText = `${character.name}`
            img.src = `${character.image}`
            h4Calories.innerText = `${character.calories}`
        })
        
        const editNameButton = document.createElement("button")
        editNameButton.innerText = "Edit name"
        detailedInfoDiv.appendChild(editNameButton)
        resetButton.addEventListener("click", resetCalories)

    }

    function addCalories(e) {
        e.preventDefault()
        const calories = document.getElementById("calories")
        const startingCalories = parseInt(calories.innerText)
        const caloriesToAdd = parseInt(e.target.calories.value)
        const newCalories = (startingCalories + caloriesToAdd)
        calories.innerText = newCalories
        // console.log(newCalorie)
        const characterId = e.target.parentElement.dataset.characterId
        let formData = { calories: newCalories };
        let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        };
        fetch(`${url}/${characterId}`, configObj)
          .then(r => r.json())
          .then(console.log)
    }
    
    function resetCalories(e){
        console.log("Reseting...")
        const calories = document.getElementById("calories")
        const startingCalories = parseInt(calories.innerText)
        const resetCalorieValue = startingCalories - startingCalories
        const characterId = e.target.dataset.characterId
        calories.innerText = resetCalorieValue
        
        let formData = { calories: resetCalorieValue };
        let configObj = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify(formData)
        };
        fetch(`${url}/${characterId}`, configObj)
          .then(r => r.json())
          .then(console.log)
    }

    function editNameButton(){
        const detailedInfoDiv = document.getElementById("detailed-info")
        const nameForm = document.createElement("form")
        nameForm.setAttribute('method',"post");
        nameForm.setAttribute('action',"submit.php");
        const nameInput = document.createElement("input")
        nameInput.setAttribute("type", "text")
        nameInput.setAttribute("name", "name")
        nameForm.appendChild(nameImput)
        detailedInfoDiv.appendChild(nameForm)

    }
})