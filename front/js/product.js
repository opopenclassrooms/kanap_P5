function getProduct(id){
    return fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .catch((error) => {
        window.alert("Une erreur");
        // Erreur 
    })
}

//getProduct('107fb5b75607497b96722bda5b504926').then((prod) => console.log(prod));

function displayProduct(product) {
    const imgElement = document.querySelector('.item__img img');
    imgElement.src = product.imageUrl;
    imgElement.alt = product.altTxt;
    
    const titleElement = document.querySelector('.item__content__titlePrice h1');
    titleElement.innerHTML = product.name;

    const priceElement = document.querySelector('.item__content__titlePrice span');
    priceElement.innerHTML = product.price;
    
    const descriptionElement = document.querySelector('.item__content__description p');
    descriptionElement.innerHTML = product.description;

    
        
}  
     //-----value optionn-----// 

     var s = document.getElementById('colors');
        var options = [ 'blue', 'white', 'black' ];
        
        options.forEach(function(element, key) {
          if (element == 'blue') {
            s[s.options.length] = new Option(element, s.options.length, false, false);
          }
          if (element == 'white') {
            s[s.options.length] = new Option(element, s.options.length, true, false); // Ajouter l'attribut "selected"
          }
          if (element == 'black') {
            s[s.options.length] = new Option(element, s.options.length, false, true); // Sélectionnera l'option
          }
          console.log (colors)

        }
        );

        //--------nombre d articles---------


        //--------metre le choix du client dans une variable-----



        //--------recupérer le choix du client----------

        

   
     //-----local storage------//
     let arrayProductId = [];

     //-------stocket la recupération du choix du client dans le local storage---

     //------declaration de la variable "productEnregistreDansLocalStorage" dans laquelle on met les key et les value qui sont dans le local storage---
     
          let productEnresgistreDansLocalStorage = JSON.parse(localStorage.getItem("product"));
     //----JSON.parse pour convertire les données au format JSON qui sont dans le local storage en objet JavaScript
          console.log(productEnresgistreDansLocalStorage)
    
//-----article deja enregistré dans le local storage----
           if(productEnresgistreDansLocalStorage){
            productEnresgistreDansLocalStorage.push();
            localStorage.setItem("product", JSON.stringify(productEnresgistreDansLocalStorage));
            console.log(productEnresgistreDansLocalStorage)
           }            

//------pas d article enregistré dans le local storage----

           else{
            productEnresgistreDansLocalStorage = [];
            productEnresgistreDansLocalStorage.push();
            localStorage.setItem("product" , JSON.stringify(productEnresgistreDansLocalStorage));
            console.log(productEnresgistreDansLocalStorage)
           }


         
    
async function initialize(){
    const productId = new URL(document.location.href).searchParams.get("id")
    const product = await getProduct(productId)
    displayProduct(product);
    console.log (product)
}

initialize();