const inputEl = document.getElementById("input")
const infoTextE1 = document.getElementById("info-text")
const meaningContainerEl = document.getElementById("meaning-container")
const titleEl = document.getElementById("title")
const meaningEl = document.getElementById("meaning")
const audioEl = document.getElementById("audio")

async function fetchAPI(word){

 try {
    infoTextE1.style.display = "block";
    meaningContainerEl.style.display = "none";
    infoTextE1.innerText = `Searching the meaning of the word "${word}`;
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
    const result = await fetch(url).then((res)=> res.json());
    
    if(result.title){
        meaningContainerEl.style.display = "block";
        titleEl.innerText = word;
        meaningEl.innerText = "N/A";
        audioEl.style.display = "none"; 
    }
    else {
        infoTextE1.style.display = "none";
        meaningContainerEl.style.display = "block";
        titleEl.innerText = result[0].word;
        meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
    
        const phonetics = result[0].phonetics;
        const audioSource = phonetics.find(p => p.audio);
    
        if (audioSource) {
            audioEl.src = audioSource.audio;
            audioEl.style.display = "inline-flex";
        } else {
            audioEl.style.display = "none";
        }
    }
    
 } catch (error) {
    console.log(error);
 }
 
}


inputEl.addEventListener("keyup", (e)=>{
    // console.log(e.target.value)
    if(e.target.value && e.key === "Enter"){
        fetchAPI(e.target.value)
    }
});