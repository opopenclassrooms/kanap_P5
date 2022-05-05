/**
 * description: recupérer un numero de commande
 * @param product
 */

let params = new URLSearchParams(document.location.search);
const order = params.get("order");

// recuperre OrderID
/**
 * description: Fonction qui affiche le numero de commande
 * @param 
 */
 function displayOrder() {
    const orderElement = document.querySelector("#orderId");
    orderElement.innerHTML = order;
}
displayOrder()

