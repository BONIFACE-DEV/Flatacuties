const URL = "http://localhost:3000/characters"

//Fetching  flatacuties Names 
function flatacuties(){
     return fetch(URL)
    .then(result => result.json())
}

//rendering names of flatacuties
function displayNames(character){
    const characterBar = document.getElementById('character-bar');
    const span = document.createElement('span')
    span.innerHTML = character.name;
    characterBar.appendChild(span);
    span.dataset.id = character.id;
    span.addEventListener('click',  clickFlatacutie)
}

flatacuties().then(characters => {
    characters.forEach(characters => {
        displayNames(characters)
        
    });
})

//Fetching character details
function displayDetails(id){
    return fetch(URL + `/${id}`)
    .then(result => result.json())
}

//function to show when flatacuties are  clicked to be displayed  in the box
function clickFlatacutie(event){
    displayDetails(event.target.dataset.id)
    .then(showFlatacutiesDetails)
}

// show flatacuties details
function showFlatacutiesDetails(character){
    const characterInfo = document.getElementById("detailed-info");
    const name = document.getElementById("name")
    name.innerText = character.name
    
//declaring image  and geting the specified image
    const img = document.getElementById('image')
    img.src = character.image

// declaring votes  and rendering text content
    const votes = document.getElementById('vote-count');
    votes.innerText = character.votes
}

//submission of the form
document.getElementById("votes-form").addEventListener("submit", (event) =>{
    event.preventDefault()
    const form = event.target;

//adding votes and reseting 
    const votes = document.getElementById("vote-count")
    votes.innerText = parseInt(form.votes.value) + parseInt(votes.innerText)
    form.reset()
})

//returning element by specified value and resetting button 
document.getElementById('reset-btn').addEventListener("click", () =>{
    document.getElementById("vote-count").innerText = 0;
})

//call of event listners
document.addEventListener("DOMContentLoaded", function(){
    flatacuties()
    displayDetails()
})
