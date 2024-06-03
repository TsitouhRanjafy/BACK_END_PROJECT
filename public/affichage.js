
// function pour affichage sur html 
let affichage = (listUtilisateurs) =>{
    let utilisateursHTML = ``
    listUtilisateurs.forEach((e) =>{
        const utilisateurHTML = `
            <div id="container-${e.id}" style="display: flex; justify-content: space-around ; font-size: 15px; margin: 10px;">
                <p id="id-${e.id}">${e.id}</p>
                <p id="nom-${e.id}">${e.nom}</p>
                <p id="age-${e.id}">${e.age}</p>
                <p id="genre-${e.id}">${e.genre}</p>
                <p id="niveau-${e.id}">${e.niveau}</p>
                <a href="modification/html"><button id="modifier-${e.id}" style="font-size: 15px;" onclick="postValue(${e.id});">modifier</button></a>    
                <button id="effacer-${e.id}" style="font-size: 15px;" onclick="suprimerId(${e.id});">effacer</button>
            </div>
        ` 
        utilisateursHTML += utilisateurHTML
    })
    document.getElementById('utilisateur').innerHTML = utilisateursHTML;
}
// get les utilisateurs et affiche
fetch('/affichage'
).then((rep) => {
    return rep.json()
}).then((listUtilisateurs) =>{
    affichage(listUtilisateurs);
}).catch((error) =>{
    console.log('Il y a un erreur sur le donnée',error);
})
// post l'utilisaeur à qui on va appliquer des modifications
let postValue = (id) =>{
    let utilisateur = {
        id : id,
        nom : document.getElementById(`nom-${id}`).textContent,
        age : document.getElementById(`age-${id}`).textContent,
        genre : document.getElementById(`genre-${id}`).textContent,
        niveau : document.getElementById(`niveau-${id}`).textContent
    }
    console.log(utilisateur);
    fetch('/modification/',{ 
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify(utilisateur)
    })
    .catch((error) => console.log(error))
}
// Supression d'un utilisateur dans base de donnée et sur html
let suprimerId = (id) =>{
    let aSuprimer = document.getElementById(`container-${id}`) // element html à suprimer
    fetch(`/affichage/suprimer?id=${id}`,{ // post le id à qui on va suprimer l'element associer
        method : "POST",
        headers : {
            "Content-type" : "application/json"
        },
        body : JSON.stringify({"status" : "id"})
    })
    .catch((errro) => console.log(errro))
    aSuprimer.remove()
}
