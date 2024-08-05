// Récupération des projets depuis l'API
const projectsResponse = await fetch('http://localhost:5678/api/works');
const projects = await projectsResponse.json();

// Récupération des catégories depuis l'API
const categoriesResponse = await fetch('http://localhost:5678/api/categories');
const categories = await categoriesResponse.json();


/* VARIABLES */

const divGallery = document.querySelector(".gallery"); 
const divFilters = document.querySelector(".filters");

/* FUNCTIONS */

/* Function to display projects */
function displayProjects(projects) {
    for (let i = 0; i < projects.length; i++) {
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        img.src = projects[i].imageUrl;
        img.alt = projects[i].title;
        let figcaption = document.createElement("figcaption");
        figcaption.textContent = projects[i].title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        divGallery.appendChild(figure);
    }
}

/* Function to display filters buttons */
function displayFilterButton (categories) {
    for (let i = 0; i < categories.length; i++) {
        let button = document.createElement("button");
        button.textContent = categories[i].name;
        let buttonClass = categories[i].name.toLowerCase();
        const tabClass = buttonClass.split(" ");
        button.classList.add("btn",`btn-${tabClass[0]}`);
        divFilters.appendChild(button);
    }
}

/* Function to update projects display */
function upadteDisplayProjects (projects, btn) {
    document.querySelector(".gallery").innerHTML = "";
    let btnSelected = document.querySelector(".btn-selected");
    btnSelected.classList.remove("btn-selected");
    btn.classList.add("btn-selected");
    displayProjects(projects);
}


/* METHOD */

/* First display projects & buttons */
displayProjects(projects);
displayFilterButton(categories);


// Listener for a click on btn All
const btnAll = document.querySelector(".btn-all");
btnAll.addEventListener("click", function() {
    upadteDisplayProjects(projects, btnAll);
});


// Listener for a click on btn Objects
const btnObjects = document.querySelector(".btn-objets");
btnObjects.addEventListener("click", function() {
    const projectsObjets = projects.filter(function (project) {
        if (project.categoryId == 1) {
            return project;
        }
    });
    // Update display
    upadteDisplayProjects(projectsObjets, btnObjects);
});


// Listener for a click on btn Appartements
const btnAppartements = document.querySelector(".btn-appartements");
btnAppartements.addEventListener("click", function() {
    const projetsAppartements = projects.filter(function (project) {
        if (project.categoryId == 2) {
            return project;
        }
    });
    // Update display
    upadteDisplayProjects(projetsAppartements, btnAppartements);
});


// Listener for a click on btn Hotels & Restaurants
const btnHotels = document.querySelector(".btn-hotels");
btnHotels.addEventListener("click", function() {
    const projectsHotels = projects.filter(function (project) {
        if (project.categoryId == 3) {
            return project;
        }
    });
    // Update display
    upadteDisplayProjects(projectsHotels, btnHotels);
});
