const charactersURL = "http://localhost:3000/characters"
const characterBar = document.querySelector("#character-bar")
const detailedInfo = document.querySelector("#detailed-info")


document.addEventListener("DOMContentLoaded", () => {

    fetch(charactersURL)
        .then(function (response) {
            return response.json()
        })
        .then(function (json) {
            renderCharactersBar(json)
        })

})

function renderCharactersBar(characters) {
    characters.forEach(character => {
        let span = document.createElement("span")
        span.innerText = character.name
        span.setAttribute("data-id", character.id)
        span.addEventListener("click", showCharacterInfo)
        characterBar.append(span)
    })
}

function showCharacterInfo(character) {
    const characterId = event.target.dataset.id

    // const name = detailedInfo.querySelector("#name")
    // name.innerText 
    fetch(`http://localhost:3000/characters/${characterId}`)
        .then(response => response.json())
        .then(character => {
            detailedInfo.innerHTML =
                `<p id="name">${character.name}</p>
            <img id="image" src=${character.image}>
            <h4>Total Calories: <span id="calories">${character.calories}</span> </h4><form id="calories-form">
            <input type="hidden" value="Character's id" id="characterId"/> <!-- Assign character id as a value here -->
            <input type="text" placeholder="Enter Calories" id="calories"/>
            <input type="submit" value="Add Calories"/>
        </form>
        <button id="reset-btn">Reset Calories</button>`

            const caloriesForm = document.querySelector("#calories-form")
            const spanCalories = document.querySelector("#calories")
            caloriesForm.addEventListener("submit", event => {
                let newCalories = caloriesForm.querySelector("#calories")
                spanCalories.innerText = newCalories.value
                event.preventDefault()
                caloriesForm.reset()
                fetch(`http://localhost:3000/characters/${characterId}`, {
                    method: 'POST',
                    headers:
                    {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    },
                    body: JSON.stringify({
                        "calories": spanCalories.innerText
                    })
                })
            })

        })

    // })


}