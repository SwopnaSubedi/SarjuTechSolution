function welcome(){
	var user = prompt("Please enter your name:");
	setCookie("userName", user, 7);

  checkCookie();

};


function setCookie(cName, cValue, exDays){

	var d = new Date();
	d.setTime (d.getTime() + (exDays*24*60*60*1000));
	var exp = "expires="+ d.toUTCString();
	document.cookie =  cName + "=" + cValue + ";" + exp + ";path=/"; 

}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = document.cookie;
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";

}


function checkCookie() {
  var user = getCookie("userName");
  if (user != "") {

   document.getElementById("newuser").className = "hide";
   document.getElementById("user_name_a").innerHTML = user;
    document.getElementById("user_name_b").innerHTML = user;
   document.getElementById("exixtingUser").className = "show";

  } else {
   document.getElementById("newuser").className = "show";
   document.getElementById("exixtingUser").className = "hide";
       // user = prompt("Please enter your name:", "");
    // if (user != "" && user != null) {
    //   setCookie("userName", user, 7);
    // }
  }
}


function randomSurvey()
{
  window.setTimeout(function() {


var randNum = Math.floor((Math.random() * 10));
console.log(randNum);
var mod = randNum % 5;

if( mod == 0)
{
  // alert(num);
    if(confirm("You have been randomly selected to participate in a customer satisfaction survey."))
    {
      document.location = "4315_Lab1_sxs6063.htm";
    }
    
  
}
  }, 10);

  // var date = new Date();

}


//checkCookie();

randomSurvey();

function sortAscending(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}

function sortDescending(prop) {    
    return function(a, b) {    
        if (a[prop] < b[prop]) {    
            return 1;    
        } else if (a[prop] > b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}


function populateTable(products)
{
  // console.log(JSON.stringify(products));
  var tblData = "";
  for(i=0; i<products.length; i++){
    tblData += "<tr> <td>" + products[i].id + "</td> <td><img src=\"" + products[i].image + "\" /></td> <td>" + products[i].prod_name+ "</td><td>" + products[i].description + "</td> <td>" + products[i].price + "</td> <td><input size=\"3\" type= \"number\" min=\"0\" max=\"150\" step=\"1\" oninput=\"validity.valid||(value='');\">  </td></tr>"
    //console.log(products[i].prod_name);
  }

document.getElementById("products").innerHTML = tblData ;
//alert ("hello");

}

function getProducts(sortField, order)
{

  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var myObj = JSON.parse(this.responseText);
      // document.getElementById("demo").innerHTML = myObj.name;
      //console.log(JSON.stringify(myObj.products));
      products = myObj.products;

      if(order=='asc'){
          products.sort(sortDescending(sortField));
      }else{
          products.sort(sortAscending(sortField));
      }


      populateTable(products);


    }
  }
  xmlhttp.open("GET", "data.json", true);
  xmlhttp.send();

// return products;

}


//getProducts("prod_name");

function sortBy(sortField,e)
{
    var order = e.target.closest('th').getAttribute('sorted');
    getProducts(sortField,order);
    var resetElements = e.target.closest('tr').children;
    for(var i=0;i<resetElements.length;i++)
    {
      resetElements[i].setAttribute('sorted','');
    }
    
    if(order == 'asc'){
        e.target.closest('th').setAttribute('sorted','desc');
    }else{
        e.target.closest('th').setAttribute('sorted','asc');
    }
}



function resetForm()
{
  return confirm("Are you sure you want to cancel your selections?");
  
}



function submitForm()
{
  var message = "Are you sure you want to order the following:\r\n";

  var products = document.getElementById("products").children;
  var orders = localStorage.getItem("product_orders");
  if(orders)
  {
      orders = JSON.parse(orders);
  }else{
      orders = [];
  }
  var total=0;
  for(var i=0; i<products.length; i++)
  {
      var qty = products[i].querySelector('input').value;
      if(qty>0)
      {
          var order = {};
          var productName = products[i].children[2].innerHTML;
          order.product_name = productName;
          order.quantity = qty;
          orders.push(order);

          message += productName + " : " + qty + "\r\n";
          total += qty;
      }
  }

  if(total>0){
      if(confirm(message))
      {
        localStorage.setItem("product_orders",JSON.stringify(orders));
      }else{
        return false;
      }
  }else{
          alert("Please type required quentity.");
          return false;
      }
  

}








