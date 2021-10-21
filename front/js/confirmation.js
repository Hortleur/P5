var str = window.location.href;
    var url = new URL(str)
    console.log(url)
    var recherche_param = new URLSearchParams(url.search);
    if(recherche_param.has('orderId')) {
    var orderId = recherche_param.get('orderId');
    }
  document.getElementById('orderId').innerHTML = orderId