function getOrderId() {
  //recovery of orderID
  var str = window.location.href;
  var url = new URL(str)
  var recherche_param = new URLSearchParams(url.search);
  if (recherche_param.has('orderId')) {
    let orderId = recherche_param.get('orderId');
    //Dysplay in html
    document.getElementById('orderId').innerHTML = orderId
  }
}
getOrderId()