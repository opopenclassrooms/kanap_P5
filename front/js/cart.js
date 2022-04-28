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
* description: afficher les prosuits dans le panier
* @param product
*/
async function displayCart(cart){
  const itemsSection = document.querySelector('#cart__items');

  for (const item of cart) {
      const product = await getProduct(item.productId);
      const card = createArticle(product, item.qty, item.color);
      itemsSection.appendChild(card);
  }

  // addEventlistener sur chaque document.querySelectorAll
}
/**
* description: prix total panier
* @param product
*/
function priceTotal() {
  document.querySelector("#totalQuantity").innerHTML = qty;
  document.querySelector("#totalPrice").innerHTML = product.price;
}

/**
* description: suprimer les produits dans le panier
* @param product
*/
function deleteItem(){
    let btnSupprimer = document.querySelectorAll("deleteItem");
 console.log(btnSupprimer);

 for (let l = 0; 1 < btnSupprimer.length; l++){
   btnSupprimer[1].addEventListener("click" , (event) =>{
     event.preventDefault();
     console.log(event);

     productEnregistreDansLocalStorage =productEnregistreDansLocalStorage.filter( el => el.id_productSelectionner !== id_productSelectionner_suppression);
     console.log(productEnregistreDansLocalStorage);
     localStorage.setItem('cart', JSON.stringify(cart)); 

 })
 }}
 deleteItem()

/**
* description: creation d un formulaire
* @param product
*/
function getForm() {
  let form2 = document.getElementById("order");
  form2.addEventListener("click" , (event) => {
    event.preventDefault(); 
    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");
    
    console.log(firstName.value);
    console.log(lastName.value);

    // redirection page validation
    
    document.location.href="confirmation.html"; 
      
  });

  console.log(form2,"test");

  // Ajout des Regex
  let form = document.querySelector(".cart__order__form");

  //Création des expressions régulières
  let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
  let charRegExp = new RegExp("^[a-zA-Z ,.'-]+$");
  let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");

  
 

  //validation du prénom
  const validFirstName = function(inputFirstName) {
      let firstNameErrorMsg = inputFirstName.nextElementSibling;

      if (charRegExp.test(inputFirstName.value)) {
          firstNameErrorMsg.innerHTML = '';
      } else {
          firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
  };

  //validation du nom
  const validLastName = function(inputLastName) {
      let lastNameErrorMsg = inputLastName.nextElementSibling;

      if (charRegExp.test(inputLastName.value)) {
          lastNameErrorMsg.innerHTML = '';
      } else {
          lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
  };

  //validation de l'adresse
  const validAddress = function(inputAddress) {
      let addressErrorMsg = inputAddress.nextElementSibling;

      if (addressRegExp.test(inputAddress.value)) {
          addressErrorMsg.innerHTML = '';
      } else {
          addressErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
  };

  //validation de la ville
  const validCity = function(inputCity) {
      let cityErrorMsg = inputCity.nextElementSibling;

      if (charRegExp.test(inputCity.value)) {
          cityErrorMsg.innerHTML = '';
      } else {
          cityErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
      }
  };

  //validation de l'email
  const validEmail = function(inputEmail) {
      let emailErrorMsg = inputEmail.nextElementSibling;

      if (emailRegExp.test(inputEmail.value)) {
          emailErrorMsg.innerHTML = '';
      } else {
          emailErrorMsg.innerHTML = 'Veuillez renseigner votre email.';
      }
  };
  
  console.log (getForm)
}

 getForm();
 
/**
 * Description: Cette fonction initialise la page
 */
async function initialize() {
  //const products = await getProducts();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
 await displayCart(cart);
}


initialize();
    


