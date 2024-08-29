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

// Function to display one project
function displayProject(id, imageUrl, title) {
    let figure = document.createElement("figure");
        figure.dataset.id = id;
        let img = document.createElement("img");
        img.src = imageUrl;
        img.alt = title;
        let figcaption = document.createElement("figcaption");
        figcaption.textContent = title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        divGallery.appendChild(figure);
}

/* Function to display all projects */
function displayProjects(projects) {
    for (let i = 0; i < projects.length; i++) {
        displayProject(projects[i].id, projects[i].imageUrl, projects[i].title);
    }
}

/* Function to display filters buttons */
function displayFilterButton (categories) {
    for (let i = 0; i < categories.length; i++) {
        let button = document.createElement("button");
        button.textContent = categories[i].name;
        button.dataset.categoryId = categories[i].id;
        button.classList.add("btn");
        divFilters.appendChild(button);
    }
}

/* Function to update projects display */
function updateDisplayProjects (projects, btn) {
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

// Hidding the filter buttons when connected
if (window.sessionStorage.getItem("userToken") != null) {
    divFilters.style.display = "none";
}



/* Click on buttons */
/* array of all buttons from filter div to use forEach (can use Array.from))*/
[...divFilters.children].forEach(btn => {
     btn.addEventListener("click", function() {
         const projectsToDisplay = projects.filter(function (project) {
            if (btn.dataset.categoryId == 0) {
                return project
            }
            if (project.categoryId == btn.dataset.categoryId) {
                return project;
            }
         });
         
         // Update display
         updateDisplayProjects(projectsToDisplay, btn);
     });
 });


 export {
    projects, categories, divGallery, displayProject
 }