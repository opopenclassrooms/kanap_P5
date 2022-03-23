function getProduct(id){
    return fetch("http://localhost:3000/api/products/" + id)
    .then((res) => res.json())
    .catch((error) => {
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


    console.log(product)

}

async function initialize(){
    const productId = new URL(document.location.href).searchParams.get("id")
    const product = await getProduct(productId)
    displayProduct(product);
    console.log (product)
}

initialize();