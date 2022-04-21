/**
 * Description: Appel GET API
 * @returns Response API
 */
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
/**
 * description: enregistre les item dans le localestorage ( panier)
 * @param productId 
 * @param color
 * @param qty
 */

function addToCart(productId, color, qty) {
 const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
 const existing = cart.find(item => item.productId === productId && item.color === color); 

  if (existing) {
    existing.qty += qty;
  } else {
    cart.unshift({ productId: productId, color: color, qty: qty });
  }

  localStorage.setItem('cart', JSON.stringify(cart)); 
}
  

/**
 * Description: Cette fonction initialise la page
 */
async function initialize(){
    const productId = new URL(document.location.href).searchParams.get("id")
    const product = await getProduct(productId)
    displayProduct(product);
    document.querySelector('button#addToCart').addEventListener('click', function(event) {
      const color = document.querySelector('#colors option:checked').text;
      const qty = Number(document.getElementById('quantity').value);
      addToCart(productId, color, qty);
    })
    console.log (product)
}
initialize();
