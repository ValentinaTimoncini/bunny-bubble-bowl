setTimeout(()=>{
    document.getElementById("loader").remove()
}, 500)
window.addEventListener('scroll', ()=>{
    fadeIn()
});
function fadeIn() {
    let elementsArray = document.querySelectorAll(".scroll-fade-in");
    for (let i = 0; i < elementsArray.length; i++) {
        let elem = elementsArray[i]
        let distInView = elem.getBoundingClientRect().top - window.innerHeight + 40;
        if (distInView < 0) {
            elem.classList.add("visible");
        } else {
            elem.classList.remove("visible");
        }
    }
}