
//------recuperation selection panier-----/



localStorage.getItem("id")


function displayItem(item) {
    const imgElement = document.querySelector('.cart__img img');
    imgElement.src = product.imageUrl;
    imgElement.alt = product.altTxt;

    const titleElement = document.querySelector('.cart__item__content__description');
    titleElement.innerHTML = product.name;

    checkColors(product)

    console.log(product)
    function checkFormAndPostRequest() {

        // On récupère les inputs depuis le DOM.
        const submit = document.querySelector("#submit");
        let inputFirstName = document.querySelector("#firstName");
        let inputLastName = document.querySelector("#lastName");
        let inputAddress = document.querySelector("#address");
        let inputCity = document.querySelector("#city");
        let inputEmail = document.querySelector("#email");
        let erreur = document.querySelector(".erreur");
      
       
    }
          
}
async function initialize(){
    const productId = new URL(document.location.href).searchParams.get("id")
    const product = await getProduct(productId)
    displayProduct(product);
    console.log (product)
}

initialize();



