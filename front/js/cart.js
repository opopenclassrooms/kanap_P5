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
 * description: Creer une seul carte panier
 * @param {*} product
 * @returns carte
 */
function createProductCard(item, product) {
  const productImg = document.createElement('img');
  productImg.src = product.imageUrl;
  productImg.alt = product.altTxt;

  const productName = document.createElement('h2');
  productName.innerHTML = product.name;
  
  const productPrice = document.createElement('p')
  productPrice.innerHTML = product.price;

  const productColor = document.createElement ('p')
  const photo = document.createElement('div');
  photo.className = "cart__item__img";
  photo.append(productImg);

  const productContent = document.createElement('div')
  const productDescription =document.createElement('div')
  productDescription.append(productName);
  productDescription.append(productPrice)
  productDescription.append(productColor)


  
  const productArticle = document.createElement('article');
  productArticle.append(photo, productContent);

  return productArticle;
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

  // addEventlistener sur chaque document.querySelectorAll('#cart__items input')
}

function localeStorageRemoveItem(){
  //localStorage.removeItem("cart");
}

 
 /**
 * Description: Cette fonction initialise la page
 */
async function initialize() {
  //const products = await getProducts();
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
 await displayCart(cart);
}


initialize();
    


