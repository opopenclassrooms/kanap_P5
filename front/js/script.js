
/**
 * Description: Appel GET API
 * @returns Response API
 */
function getProducts(){
    return fetch("http://localhost:3000/api/products")
    .then((res) => res.json())
    .catch((error) => {
        window.alert("Une erreur est survenu.");
    })
}

/**
 * description: Creer une seul carte produit
 * @param {*} product
 * @returns carte
 */
function createProductCard(product) {

    const productImg = document.createElement('img');
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;

    const productName = document.createElement('h3');
    productName.innerHTML = product.name;
    productName.className = "productName";


    const productDescription = document.createElement('p');
    productDescription.innerHTML = product.description;
    productDescription.className = "productDescription";

    const productArticle = document.createElement('article');
    productArticle.append(productImg, productName, productDescription);

    const a = document.createElement('a');
    a.href = './product.html?id=' + product._id;
    a.appendChild(productArticle);

    return a;
}

/**
 * description: Affichage de toutes les cartes produits
 * @param {*} products
 */
function displayProducts(products){
    const itemsSection = document.querySelector('#items');

    for (const product of products) {
        const card = createProductCard(product);
        itemsSection.appendChild(card);
    }
}


/**
 * Description: Cette fonction initialise la page
 */
async function initialize() {
    const products = await getProducts();
    displayProducts(products);
}


initialize();
