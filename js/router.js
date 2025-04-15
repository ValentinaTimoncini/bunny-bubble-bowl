const x_repo = '/bunny-bubble-bowl'
const x_sitemap = [
    {
        x_hash: '',
        x_view: 'home.html',
        x_css: 'home.css',
        x_script: 'home.js'
    },
    {
        x_hash: 'menu',
        x_view: 'menu.html',
        x_css: 'menu.css',
        x_script: 'menu.js'
    }
]
let x_currentHash = window.location.hash.substring(1)
x_build(x_currentHash)

/*
    FUNZIONE PER COSTRUIRE LA PAGINA DINAMICAMENTE
    -facciamo partire il loader
    -CARICHIAMO LA NAVBAR SOLO SE NON E' GIA' PRESENTE
    -CARICHIAMO L'HTML DEL CONTENUTO IN BASE ALL'HASH, PRIMA DI INSERIRLO SVUOTIAMO QUELLO PRECEDENTE
    -CARICHIAMO IL FOOTER SOLO SE NON E' GIA' PRESENTE
    -CARICHIAMO IL CSS IN BASE ALL'HASH, ELIMINIAMO GLI ALTRI FILE CSS NON QUELLI CON data-default=1
    -CARICHIAMO IL SCRIPT IN BASE ALL'HASH, ELIMINIAMO GLI ALTRI FILE SCRIPT NON QUELLI CON data-default=1
    -fermiamo il loader
*/
async function x_build(x_currhash){
    await x_start_laoding()

    //NAVBAR
    if(document.getElementById("nav").innerHTML.length === 0) {
        let x_navbar_response = await fetch('/components/navbar.html')
        let x_navbar_html = await x_navbar_response.text()
        document.getElementById("nav").insertAdjacentHTML('afterbegin', x_navbar_html)
    }
    //CONTENT
    let x_site;
    x_sitemap.forEach(site=>{
        if(site.x_hash === x_currhash) {
            x_site = site
        }
    })
    let x_content_response = await fetch(x_repo+'/views/'+x_site.x_view)
    let x_content_html = await x_content_response.text()
    document.getElementById("app").innerHTML = ''
    document.getElementById("app").insertAdjacentHTML('afterbegin', x_content_html)
    //FOOTER
    if(document.getElementById("foot").innerHTML.length === 0) {
        let x_footer_response = await fetch(x_repo+'/components/footer.html')
        let x_footer_html = await x_footer_response.text()
        document.getElementById("foot").insertAdjacentHTML('afterbegin', x_footer_html)
    }
    //CSS
    const x_existingStyles = document.querySelectorAll('link[rel="stylesheet"]:not([data-default="1"])');
    x_existingStyles.forEach(x_style => x_style.remove());
    let x_link = document.createElement('link')
    x_link.rel = "stylesheet";
    x_link.href = x_repo+"/css/"+x_site.x_css;
    document.head.append(x_link);
    //SCRIPT
    const x_existingScripts = document.querySelectorAll('script:not([data-default="1"])');
    x_existingScripts.forEach(x_script => x_script.remove());
    let x_script = document.createElement('script')
    x_script.src = x_repo+"/js/"+x_site.x_script;
    document.body.append(x_script);

    x_stop_laoding()
}
async function x_start_laoding(){
    let x_loader_response = await fetch(x_repo+'/components/loader.html')
    let x_loader_html = await x_loader_response.text()
    document.body.insertAdjacentHTML('afterbegin', x_loader_html)
}
async function x_stop_laoding(){
    setTimeout(()=>{
        document.getElementById("loader").remove()
    }, 500)
}
