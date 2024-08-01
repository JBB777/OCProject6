// Récupération des projets
const reponse = await fetch('http://localhost:5678/api/works');
const projets = await reponse.json();


// for(let i = 0; i < projets.length; i++) {
//     console.log(projets[i].title);
// }

/* VARIABLES */

const divGallery = document.querySelector(".gallery");
let index = 0;


/* FUNCTIONS */
    

/* METHOD */

/* Affichage des projets dans la section 'Mes Projets' */
for (index = 0; index < projets.length; index++) {
    let figure = document.createElement("figure");
    let img = document.createElement("img");
    img.src = projets[index].imageUrl;
    img.alt = projets[index].title;
    let figcaption = document.createElement("figcaption");
    figcaption.textContent = projets[index].title;
    figure.appendChild(img);
    figure.appendChild(figcaption);
    divGallery.appendChild(figure);
}