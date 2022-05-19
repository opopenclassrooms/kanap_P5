// recuperre OrderID
/**
 * description: Fonction qui affiche le numero de commande
 * @param 
 */
 function displayOrder() {
    let params = new URLSearchParams(document.location.search);
    const order = params.get("order");
    
    const orderElement = document.querySelector("#orderId");
    orderElement.innerHTML = order;
}
displayOrder()

