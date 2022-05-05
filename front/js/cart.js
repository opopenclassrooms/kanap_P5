/**
 * Description: Appel GET API
 * @returns Response API
 */
 function getProduct(id){
  return fetch("http://localhost:3000/api/products/"+ id )
  .then((res) => res.json())
  .catch((error) => {
      window.alert("Une erreur est survenu.");
  })
}
/**
 * description: recuperer les poduits dans le locale storage
 */
function getLocaleStorage(){
  let color  = localeStorage.getItem("color, qty");
}
/**
 * description: Creer une seul carte panier
 * @param {*} product
 * @returns carte
 */

function createArticle(product, qty, color) {
  const article = document.createElement('article');
  article.innerHTML = `
  <div class="cart__item__img">
    <img src="${product.imageUrl}" alt="${product.description}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${product.name}</h2>
      <p>${color}</p>
      <p>${product.price} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${qty}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>`;
  article.className = "cart__item";
  article.dataset = { id: product.id, color: color };
  return article;
}

/**
* description: afficher les produits dans le panier
* @param product
*/
async function displayCart(cart){
  const itemsSection = document.querySelector('#cart__items');

  for (const item of cart) {
      const product = await getProduct(item.productId);
      const card = createArticle(product, item.qty, item.color);
      itemsSection.appendChild(card);
  }
}
/**
* description: prix total panier
* @param product
*/
function priceTotal() {
  document.querySelector("#totalQuantity").innerHTML = qty;
  document.querySelector("#totalPrice").innerHTML = product.price;
}
//priceTotal()




function getRandomArbitrary() {
    return Math.ceil(Math.random() * (200 - 100) + 100);
}

function validationForm() {
    
  // Recup tous les elements

    let valid = true
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");
     
    //Création des expressions régulières
    
    let firstNameRegExp = new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$");
    let lastNameRegExp = new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let cityRegExp = new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$");
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    
    // Veririfier tous les elements du formulaire
    
    if(!firstNameRegExp.test(firstName.value)) {
      valid = false
      let firstNameErrorMsg = firstName.nextElementSibling;
      firstNameErrorMsg.innerHTML = 'Veuillez entrer un nom valide.';
  } 

    if(!lastNameRegExp.test(lastName.value)) {
      valid = false
      let lastNameErrorMsg = lastName.nextElementSibling;
      lastNameErrorMsg.innerHTML = 'Veuillez entrer un prenom valide.';
  } 
    if(!addressRegExp.test(address.value)) {
      valid = false
      let addressErrorMsg = address.nextElementSibling;
      addressErrorMsg.innerHTML = 'Veuillez entrer une adresse valide.';
  }
  if(!cityRegExp.test(city.value)) {
    valid = false
    let cityErrorMsg = city.nextElementSibling;
    cityErrorMsg.innerHTML = 'Veuillez entrer une ville valide.';
}
    
  if(!emailRegExp.test(email.value)) {
      valid = false
      let emailErrorMsg = email.nextElementSibling;
      emailErrorMsg.innerHTML = 'Veuillez entrer une adresse email valide.';
  }

  return valid
}
     
  


/**
* description: creation d un formulaire
* @param product
*/
function getForm() {

    let form = document.getElementById("order");

    form.addEventListener("click" , (event) => {
        event.preventDefault();

        //Validater les infos
        // Message erreur
        if(validationForm()) {
            // Creer un numero de commande
            const order = getRandomArbitrary()

            // Redirigerer vers la page correspondante
            // Avec un numero de commande
            document.location.href="confirmation.html?order=" + order;
        }
    })

  
}

getForm();

/**
 * Suprimer item dans localstorage
 *
 */
function deleteItems(position) {
    // Recuperer le tab items dans local storage
    let tabItems = JSON.parse(localStorage.getItem('cart'));
    // Supprimer cette ellement
    tabItems.splice(position, 1)
    // remetre dans le localstorage le nouveau tableau
    localStorage.setItem('cart', JSON.stringify(tabItems));
    // reload la page changement soit visible
    document.location.reload()
}
 
/**
 * Description: Cette fonction initialise la page
 */
async function initialize() {
  //const products = await getProducts();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
 await displayCart(cart);

    let btn = document.querySelectorAll('.deleteItem')
    for (let l = 0; l < btn.length; l++){
        //Ecouter evenenent
        btn[l].addEventListener("click" , () => {
            deleteItems(l)
        })
    }
}


initialize();
