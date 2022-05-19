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

function validateField(field, re, errorMessage) {
  if(!re.test(field.value)) {
    field.nextElementSibling.innerHTML = errorMessage;
    return false;
  } else {
    field.nextElementSibling.innerHTML = "";
    return true;
  }
}

function validateForm() {
    
  // Recup tous les elements

    let firstName = document.getElementById("firstName");
    let lastName = document.getElementById("lastName");
    let address = document.getElementById("address");
    let city = document.getElementById("city");
    let email = document.getElementById("email");

    [firstName, lastName, address, city, email].forEach((el) => el.nextElementSibling.innerHTML = "");
    
    //Création des expressions régulières
    
    let firstNameRegExp = new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,30}$");
    let lastNameRegExp = new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,30}$");
    let addressRegExp = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    let cityRegExp = new RegExp("^[^±!@£$%^&*_+§¡€#¢§¶•ªº«\\/<>?:;|=.,]{1,20}$");
    let emailRegExp = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    
    // Veririfier tous les elements du formulaire

    const fieldsValidation = [
      validateField(firstName, firstNameRegExp, 'Veuillez entrer un prenom valide.'),
      validateField(lastName, lastNameRegExp, 'Veuillez entrer un nom valide.'),
      validateField(address, addressRegExp, 'Veuillez entrer une adresse valide.'),
      validateField(city, cityRegExp, 'Veuillez entrer une ville valide.'),
      validateField(email, emailRegExp, 'Veuillez entrer une adresse email valide.'),
    ];
    return fieldsValidation.every(v => v);
}
     
  


/**
* description: creation d un formulaire
* @param product
*/
function initForm() {
  const form = document.querySelector('form');

  const onSubmit = async (event) => {
    event.preventDefault();
    
    if(!validateForm()) {
      return;
    }
    
    const contact = {
      firstName: document.querySelector('input#firstName').value,
      lastName: document.querySelector('input#lastName').value,
      address: document.querySelector('input#address').value,
      city: document.querySelector('input#city').value,
      email: document.querySelector('input#email').value,
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIds = cart.map(product => product.productId);

    try {
      const response = await fetch('http://localhost:3000/api/products/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contact: contact,
          products: productIds,
        }),
      });
      
      const payload = await response.json();

      if (response.ok) {
        document.location.href = './confirmation.html?order=' + payload.orderId;
      } else {
        throw new Error('Order not created');
      }
    } catch(e) {
      // handle error in UI
      console.log(e.message);
    }
    
  };

  form.onsubmit = onSubmit;

  
}

initForm();

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

function handleQuantity(event, index) {
    let tabItems = JSON.parse(localStorage.getItem('cart'));
    tabItems[index].qty = event.target.value
    localStorage.setItem('cart', JSON.stringify(tabItems));
}
 
/**
 * Description: Cette fonction initialise la page
 */
async function initialize() {
    //const products = await getProducts();
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    await displayCart(cart);

    let btn = document.querySelectorAll('.deleteItem')
    for (let l = 0; l < btn.length; l++) {
        //Ecouter evenenent
        btn[l].addEventListener("click", () => {
            deleteItems(l)

        })
    }
    // itemQuantity
    let btn_qty = document.querySelectorAll('.itemQuantity')
    for (let l = 0; l < btn_qty.length; l++) {
        //Ecouter evenenent
        btn_qty[l].addEventListener("change", (event) => {
            handleQuantity(event, l)
            showPrice()
        })
    }

}

function getAllQuantity() {
    let tabItems = JSON.parse(localStorage.getItem('cart'));
    let total = 0;
    for (let l = 0; l < tabItems.length; l++) {
        total += parseInt(tabItems[l].qty, 10)
    }
    return total
}

async function getAllPrice() {
    const DISPLAY_PRICE = document.getElementById('totalPrice')
    let tabItems = JSON.parse(localStorage.getItem('cart'));
    let totalPrice = [];
    for (let l = 0; l < tabItems.length; l++) {
        getProduct(tabItems[l].productId)
            .then((product) => {
                totalPrice.push(product.price * tabItems[l].qty)

                let price = totalPrice.reduce((acc, currentValue) => {
                    return acc + currentValue
                }, 0)
                DISPLAY_PRICE.innerHTML = price
            })
    }
}

function showPrice() {
    let totalQuantity = document.getElementById('totalQuantity')
    totalQuantity.innerHTML = getAllQuantity()
    getAllPrice()
}

initialize();


showPrice()


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
