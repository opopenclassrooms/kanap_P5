/**
 * description: recupérer un numero de commande
 * @param product
 */

let params = new URLSearchParams(document.location.search);
const order = params.get("order");
console.log(order)

// recuperre OrderID
//Afficher le numero Order