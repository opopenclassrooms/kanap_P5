function getProduct(id){
    return fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .catch((error) => {
        window.alert("Une erreur");
        // Erreur 
    })
}
/**
 * description: Fonction qui affiche les info du produit dans la page produit
 * @param product
 */
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
    checkColors(product)
}
/**
 * description: Fonction qui check les options de couleurs
 * @param product
 */
function checkColors(product)
{
  const element = document.getElementById('colors')
  let options = product.colors
  for (let i = 0; i < options.length; i++) {
    let option = document.createElement("option")
    option.textContent = options[i]
    option.value = i
    element.appendChild(option)
  }
}
/**
 * description: Enregistre dans le loccal storage les item selectioner
 */
let save = function () {
  console.log('Cliquer !')
  recupererInput()
}
function recupererInput()
{
  const productId = new URL(document.location.href).searchParams.get("id")
  let colorsSelected = document.getElementById('colors')
  let quantitySelected = document.getElementById('quantity')
  let itemSelect = {
    id: productId,
    quantity: quantitySelected.value,
    color: colorsSelected.value
  }
  localStorage.setItem('products', JSON.stringify(itemSelect))
}
  let btn = document.getElementById('addToCart')

  btn.addEventListener('click', save)
    
//local storage
     
     let arrayProductId = [];
     let productEnresgistreDansLocalStorage = JSON.parse(localStorage.getItem("product"));

//article deja enregistré dans le local storage
           
            if(productEnresgistreDansLocalStorage){
            productEnresgistreDansLocalStorage.push();
            localStorage.setItem("product", JSON.stringify(productEnresgistreDansLocalStorage));
            console.log(productEnresgistreDansLocalStorage)
           }            

//pas d article enregistré dans le local storage

           else{
            productEnresgistreDansLocalStorage = [];
            productEnresgistreDansLocalStorage.push();
            localStorage.setItem("product" , JSON.stringify(productEnresgistreDansLocalStorage));
            console.log(productEnresgistreDansLocalStorage)
           }

/**
 * Description: Cette fonction initialise la page
 */
async function initialize(){
    const productId = new URL(document.location.href).searchParams.get("id")
    const product = await getProduct(productId)
    displayProduct(product);
    console.log (product)
}
initialize();
