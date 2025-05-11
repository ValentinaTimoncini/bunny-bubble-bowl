//timeout di 500 millisecondi per rimuover il loader e far partire la prima volta fadeIn (che poi partira ogni volta che scrolliamo la pagina)
setTimeout(()=>{
    document.getElementById("loader").remove()
    fadeIn()
}, 500)
window.addEventListener('scroll', ()=>{
    fadeIn()
});
function fadeIn() {
    //prendo tutti gli elementi con classe scroll-fade-in
    let elementsArray = document.querySelectorAll(".scroll-fade-in");
    //per ognuno
    for (let i = 0; i < elementsArray.length; i++) {
        let elem = elementsArray[i]
        //prendo la distanza dell'elemento dalla parte visibile dello schermo
        let distInView = elem.getBoundingClientRect().top - window.innerHeight + 40;
        //se la distanza è minore di 0 significa che l'elemento è visibile nello schermo e gli aggiungo la classe visible per farlo apparire
        if (distInView < 0) {
            elem.classList.add("visible");
        //altrimenti tolgo la classe visible per farlo scomparire
        } else {
            elem.classList.remove("visible");
        }
    }
}