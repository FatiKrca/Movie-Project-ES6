//projemizin ana djavascript dosyası

const form =document.getElementById("film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody =document.querySelectorAll(".card-body")[1];
const clearButton = document.getElementById("clear-films");




//tüm eventleri yükleme 
eventListeners();
function eventListeners(){
    form.addEventListener("submit",addFilm)
    cardBody.addEventListener("click",deleteFilm);
    clearButton.addEventListener("click",clearAllFilms)
    document.addEventListener("DOMContentLoaded",function(){
        let films = Storage.getFilmsFromStorage();
        UI.loadAllFilms(films);
 
    })
    
}

function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;


    if(title ==="" || director === ""|| url===""){
        //hata
        UI.displayMessages("Tüm alanları doldurunuz.","danger");
    }
    else{
        //Yeni film
        const newFilm = new Film(title,director,url);

        UI.addFilmToUI(newFilm);//arayüze ekleme
        Storage.addFilmToStorage(newFilm);//sotrageye ekleme
        UI.displayMessages("Film Başarıyla Eklendi","success");
    }

    UI.clearInputs(titleElement,directorElement,urlElement);

    e.preventDefault();
}

function deleteFilm(e){
    if(e.target.id==="delete-film"){
        UI.deleteFilmFromUI(e.target);
        Storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent)
        UI.displayMessages("Silme işlemi başarılı","success");
    }
}

function clearAllFilms(){

    if(confirm("Emin misiniz?")){
        UI.clearAllFilmsFromUI();
        Storage.clearAllFilmsFromStorage();
    }
    
}