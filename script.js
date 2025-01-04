const handleClick = async () => {
    const inputValue = document.querySelector('.inputValue').value.trim();
    
    // Check if the input value is empty
    if (!inputValue) {
        alert("Please enter a word to search.");
        return;
    }
    
    // Show loading spinner and hide search button
    document.querySelector('.fa.fa-spinner.fa-spin').style.display = "block";
    document.querySelector('.search-btn').style.display = 'none';
    
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/" + inputValue;
    
    try {
        const response = await fetch(url);
        
        // Check if the word is found (status 200)
        if (!response.ok) {
            throw new Error('Word not found');
        }

        const responseObject = await response.json();
        
        // Display the result section
        document.querySelector('.section2').style.display = "block";
        document.querySelector('.value').innerText = inputValue;
        
        // Part of speech
        const partOfSpeech = responseObject[0].meanings[0].partOfSpeech;
        document.querySelector('.partOfSpeech').innerText = partOfSpeech;

        // Definition
        const definition = responseObject[0].meanings[0].definitions[0].definition;
        document.querySelector('.definition').innerText = definition;

        // Display example if available
        const example = responseObject[0].meanings[0].definitions[0].example;
        if (example) {
            document.querySelector('.example').innerText = example;
            document.querySelector('.example-container').style.display = "block";
        } else {
            document.querySelector('.example-container').style.display = "none";
        }
    } catch (error) {
        console.error(error);
        alert("Word not found. Please check your spelling and try again.");
        document.querySelector('.section2').style.display = "none";
    }
    
    // Hide the loading spinner and show the search button again
    document.querySelector('.fa.fa-spinner.fa-spin').style.display = "none";
    document.querySelector('.search-btn').style.display = 'block';
}

function logout() {
    localStorage.removeItem("loggedIn");
    window.location.href = "../login/login.html";
}


// Input validation: Only alphanumeric characters are allowed
const inputElement = document.querySelector('.inputValue');
inputElement.addEventListener('input', function () {
    const inputValue = inputElement.value;
    if (/[^a-zA-Z0-9]/.test(inputValue)) {
        alert("Only alphanumeric characters are allowed.");
        inputElement.value = inputValue.replace(/[^a-zA-Z0-9]/g, '');
    }
});
