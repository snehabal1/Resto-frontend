var restoData = {
  "admin": true,
  "id": null,
  "name": "pizza hut",
  "address": "3127,Delaware Avenue, Buffalo,NY",
  "phoneNumber": 7165784567,
  "tablesCount": 30,
  "tax": 8.75,
  "image" : "/pathtoimage.png",
  "logo" : "/pathToLogo.png",
  "menu" :[
          {
            "name": "Bread sticks",
            "veg": true,
            "price": 15,
            "id": 1,
            "description": "Bite sized garlic bread",
            "category" : "Entree",
            "image" : "/pathtoimage.png",
            "glutenfree" : false
          },
          {
            "name": "Pizza",
            "veg": true,
            "price": 15,
            "id": 2,
            "description": "Bite sized garlic bread",
            "category" : "Entree",
            "image" : "/pathtoimage.png",
            "glutenfree" : false
          },
          {
            "name": "Pepsi",
            "veg": true,
            "price": 15,
            "id": 3,
            "description": "Bite sized garlic bread",
            "category" : "Entree",
            "image" : "/pathtoimage.png",
            "glutenfree" : true
          },
          {
            "name": "Biryani",
            "veg": true,
            "price": 15,
            "id": 1,
            "description": "Bite sized garlic bread",
            "category" : "Main",
            "image" : "/images/biryani.jpg",
            "glutenfree" : false
          },
          {
            "name": "Butter Chicken",
            "veg": true,
            "price": 15,
            "id": 2,
            "description": "Bite sized garlic bread",
            "category" : "Main",
            "image" : "/pathtoimage.png",
            "glutenfree" : false
          },
          {
            "name": "Kofta",
            "veg": true,
            "price": 15,
            "id": 3,
            "description": "Bite sized garlic bread",
            "category" : "Main",
            "image" : "/pathtoimage.png",
            "glutenfree" : false
          },
          {
            "name": "Ice cream",
            "veg": true,
            "price": 15,
            "id": 1,
            "description": "Bite sized garlic bread",
            "category" : "Desserts",
            "image" : "/pathtoimage.png",
            "glutenfree" : false
          },
          {
            "name": "Pie",
            "veg": true,
            "price": 15,
            "id": 2,
            "description": "Bite sized garlic bread",
            "category" : "Desserts",
            "image" : "/pathtoimage.png",
            "glutenfree" : false
          },
          {
            "name": "Sundae",
            "veg": true,
            "price": 15,
            "id": 3,
            "description": "Bite sized garlic bread",
            "category" : "Desserts",
            "image" : "/pathtoimage.png",
            "glutenfree" : false
          }
        ]
};
var abc = [];
// console.log(restoData.menu.categories);
for(dish in restoData.menu){
console.log(dish);

      abc.push({"title": restoData.menu[dish].name,
                "veg" : restoData.menu[dish].veg,
                "text": restoData.menu[dish].description,
                "category" : restoData.menu[dish].category,
                "picture" : restoData.menu[dish].image,
                "price" : restoData.menu[dish].price,
                "glutenfree" : restoData.menu[dish].glutenfree
              });
  
}

var order = [];
var myData = new WinJS.Binding.List(abc);



var grouped = myData.createGrouped(function (item) {
    return item.category;
}, function (item) {
    return {
        title : item.category
    };
}, function (left, right) {
    return left.charCodeAt(0) - right.charCodeAt(0);
});

WinJS.Namespace.define("Sample.ListView", {
    data: grouped
});



WinJS.UI.processAll().done(function () {
    var splitView = document.querySelector(".splitView").winControl;
    new WinJS.UI._WinKeyboard(splitView.paneElement); // Temporary workaround: Draw keyboard focus visuals on NavBarCommands
});

var x =document.getElementById("rest_name");
console.log(x);
x.innerHTML='';
x.appendChild(document.createTextNode(restoData.name));

var addr =document.getElementById("addressDialog");
addr.innerHTML='';
addr.appendChild(document.createTextNode(restoData.address));

var dishlist = document.getElementById("listview").winControl;
// alert(dishlist);
dishlist.oniteminvoked = function (event) {
    var index = event.detail.itemIndex;
    // alert(index);
    var item = grouped.getAt(index);
    alert(item.title);
    order.push(item);
}

var showButton = document.querySelector(".addrLink");
    showButton.addEventListener("click", function () {
        var contentDialog = document.querySelector("#addressDialog").winControl;
        contentDialog.show();
    });

function showAddress(){
  alert(restoData.address);
}

