import {projects, categories, divGallery, displayProject }  from "./script.js"


// Banner & buttons creation
let body = document.querySelector("body");

function createEditModeBanner() {

    // Black banner on the top
    let bannerEdit = document.createElement("div");
    let spanEdit = document.createElement("span");
    let iconEdit = document.createElement("i");

    iconEdit.classList.add("fa-regular", "fa-pen-to-square");
    iconEdit.style.color = "white";
    spanEdit.innerText = "Mode Edition";
    spanEdit.style.color = "white";
    bannerEdit.appendChild(iconEdit);
    bannerEdit.appendChild(spanEdit);
    bannerEdit.classList.add("banner-edit");
    body.insertBefore(bannerEdit, body.firstChild);


    // Button to edit projects
    let divPortfolio = document.getElementById("portfolio");
    let titrePortfolio = document.querySelector("#portfolio h2");
    let divTitre = document.createElement("div");
    let modalLink = document.createElement("a");
    let iconPortfolio = document.createElement("i");
    let spanPortfolio = document.createElement("span");

    iconPortfolio.classList.add("fa-regular", "fa-pen-to-square");
    iconPortfolio.style.color = "black";
    iconPortfolio.style.margin = "0 0 2em 1em";
    modalLink.appendChild(iconPortfolio);
    modalLink.href = 'modal';
    modalLink.classList.add('btnModale');
    modalLink.classList.add('modal-trigger');
    spanPortfolio.innerText = "modifier";
    spanPortfolio.style.marginBottom = "2em";
    divTitre.appendChild(titrePortfolio);
    divTitre.appendChild(modalLink);
    divTitre.appendChild(spanPortfolio);
    divTitre.classList.add("div__title");
    divPortfolio.insertBefore(divTitre, divPortfolio.firstChild);

    // Icon mousehover to change cursor
    iconPortfolio.addEventListener("mouseover", () => {
        iconPortfolio.style.cursor = "pointer";
    });
}


// Replace Login -> Logout, Logout -> Login
let headerNav = document.querySelector("header nav ul");
let linkLogin = document.querySelector("header nav ul a");

if(window.sessionStorage.getItem("userToken") != null) {

    createEditModeBanner();

    let linkLogout = document.createElement("a");
    linkLogout.setAttribute('href', "index.html");
    let liLogout = document.createElement("li");
    liLogout.innerText = "logout";
    linkLogout.appendChild(liLogout);
    headerNav.replaceChild(linkLogout, linkLogin);
    
    linkLogout.addEventListener("click", function() {
        window.sessionStorage.removeItem("userToken");
    });
}


// Option choices for the adding project form in the second modal
const inputSelect = document.querySelector("#modal2 select");
for (let i = 0; i < categories.length; i++) {
    let option = document.createElement("option");
    option.value = categories[i].id;
    option.textContent = categories[i].name;
    inputSelect.appendChild(option);
}


// Switch opened modal
const modal1 = document.getElementById('modal1');
const modal2 = document. getElementById('modal2');
const modTriggers1 = document.querySelectorAll(".modal-trigger");
modTriggers1.forEach(trigger => trigger.addEventListener("click", toggleModal1));
const modTriggers2 = document.querySelectorAll(".modal-trigger2");
modTriggers2.forEach(trigger => trigger.addEventListener("click", toggleModal2));

function toggleModal1(e) {
    e.preventDefault();
    modal1.classList.toggle("active");
}

function toggleModal2(e) {
    e.preventDefault();
    resetForm();
    modal2.classList.toggle("active");
}


// Preview of the photo choose in the form to add a project
const inputPhotoUpload = document.getElementById("photoUpload");
inputPhotoUpload.addEventListener('change', previewFile);
const photo = document.querySelector("#modal2 img");
const figIcon = document.querySelector(".fa-image");
const figBtn = document.querySelector(".btnFormAddPhoto");
const figLabel = document.querySelector(".formFig label");
const formAjoutPhoto = document.getElementById("formAjoutPhoto");


function previewFile() {
    const file = this.files[0];
    if (file.size > 4194304) {
        figLabel.style.color = "red";
        figLabel.style.fontWeight = "bold";
        figLabel.innerText = "La photo est trop volumineuse";
        return;
    }
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.addEventListener('load', (event) => displayPhoto(event));
}

function displayPhoto(event) {    
    photo.src = event.target.result;
    photo.classList.add("imgUpload");
    figIcon.style.display = "none";
    figBtn.style.display = "none";
    figLabel.style.display = "none";
}

// Clean add project form
function resetForm() {
    formAjoutPhoto.reset();
    photo.src = "";
    photo.classList.remove("imgUpload");
    inputPhotoUpload.style.display = "block";
    figIcon.style.display = "block";
    figBtn.style.display = "block";
    figLabel.style.display = "block";
    figLabel.style.color = "black";
    figLabel.style.fontWeight = "normal";
    figLabel.innerText = "jpg, jpeg, png : 4mo max";
}



const modGallery = document.querySelector(".modal__gallery");

// Function to display one project in the modal gallery
function displayModalProject(id, imageUrl, title) {
    let figPhoto = document.createElement("figure");
    let img = document.createElement("img");
    let btnSuppr = document.createElement("button");
    let btnIcon = document.createElement("i");

    img.src = imageUrl;
    img.alt = title;

    btnIcon.classList.add("fa-regular", "fa-trash-can");
    btnIcon.dataset.id = id;
    btnSuppr.appendChild(btnIcon);
    btnSuppr.dataset.id = id;

    figPhoto.classList.add("modal__card");

    figPhoto.appendChild(btnSuppr);
    figPhoto.appendChild(img);
    modGallery.appendChild(figPhoto);

    // Event to remove a project on click
    btnSuppr.addEventListener("click", async function (event) {
        event.preventDefault();
        suppressionPhoto(id, btnSuppr);
    });
}

// Display all project in the modal gallery
for (let i = 0; i < projects.length; i++) {
    displayModalProject( projects[i].id, projects[i].imageUrl, projects[i].title);
}


// Going to the second modal from the first
const btnAjout = document.querySelector(".modal__content input");
btnAjout.addEventListener("click", function(e) {
    toggleModal1(e);
    toggleModal2(e);
    
});


// Go back to the first modal via the arrow lef in the second
const iconRetour = document.querySelector("#modal2 i");
iconRetour.addEventListener("click", function(e) {
    toggleModal2(e);
    toggleModal1(e);
});


// Function to remove a project
async function suppressionPhoto(id, btn) {
    const suppResponse = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${sessionStorage.getItem("userToken")}`}
    });

    if (suppResponse.status != 200) {
        console.error(suppResponse.status);
    }

    // Remove items in the two gallery (projects and first modal) without reloading
    btn.parentElement.remove();
    let figToSupp = document.querySelector(`.gallery [data-id="${id}"]`);
    figToSupp.remove();
}


// Form submit to add a project
document.getElementById("formAjoutPhoto").addEventListener('submit', async function(event){
    event.preventDefault();

    try {

        const img = document.getElementById("photoUpload").files[0];
        const titre = document.getElementById("titre").value;
        const idCategorie = parseInt(document.getElementById("categorie").value);

        const formData = new FormData();
        formData.append("image", img);
        formData.append("title", titre);
        formData.append("category", idCategorie);

        const fetchResponseAjout = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers : { Authorization: `Bearer ${sessionStorage.getItem("userToken")}`},
            body: formData,
        });

        if (fetchResponseAjout.status != 201) {
            throw new Error("Erreur lors de l'upload !!" + fetchResponseAjout.status);
        }

        const objectFetch = await fetchResponseAjout.json();

        previewFileGalleries( objectFetch.id, objectFetch.imageUrl, objectFetch.title);

        toggleModal2(event);
        toggleModal1(event);
        
    } catch(error) {
        console.error(error);
    }
});


// Gestion de l'affichage de l'image ajoutée dans les galleries
function  previewFileGalleries(id, imageUrl, title) {    

    // First gallery
    displayProject(id, imageUrl, title);

    // Second Gallery
    displayModalProject(id, imageUrl, title);
}


// Accessibilité bouton validation formulaire d'ajout
const img = document.getElementById("photoUpload");
const titre = document.getElementById("titre");
const btnValidate = document.querySelector(".btnValidate");
btnValidate.disabled = true;

img.onblur = () => {
    if ((img.files[0] == null) || (titre.value.trim() == "")) {
        btnValidate.disabled = true;
    }
    else {
        btnValidate.disabled = false;
    }
}
titre.onblur = () => {
    if ((img.files[0] == null) || (titre.value.trim() == "")) {
        btnValidate.disabled = true;
    }
    else {
        btnValidate.disabled = false;
    }
}