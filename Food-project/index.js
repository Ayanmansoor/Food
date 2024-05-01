let categorymealdb = [];
let all_food = [];
let order_food = [];

function getallcategory() {
  fetch("https://www.themealdb.com/api/json/v1/1/categories.php")
    .then((response) => {
      return response.json();
    })
    .then((response) => {
      // console.log(response)
      response.categories.forEach((element, index) => {
        let obj = new Object();
        obj.id = index;
        obj.meal = element;
        obj.price = Math.floor(Math.random() * 300) + 1;
        categorymealdb.push(obj);
      });
      all_data();
      random_code();
    })
    .catch((error) => {
      console.log(error);
    });
}
function all_data() {
  let contentgrid = document.querySelector(".content-grid");
  categorymealdb.forEach((element, index) => {
    let box = `<div class="card">
    <div class="card-img">
      <img src="${element.meal.strCategoryThumb}" alt="" />
    </div>
    <div class="info">
    <h1 class="hidden">${element.id}</h1>
      <div class="name-price">
        <p>${element.meal.strCategory}</p>
      </div>
      <div class="all-btn">
        <button>check</button>
      </div>
    </div>
  </div>`;
    if (index <= 9) {
      contentgrid.innerHTML += box;
    }
  });
  getCategoryName()
}
// this was category funtion
// now this function for category search

function getCategoryName() {
  let Category_box=document.querySelectorAll(".card")
  
  Category_box.forEach((element,index)=>{
    element.addEventListener('click',(e)=>{
        console.log(element.lastElementChild.firstElementChild.nextElementSibling.firstElementChild.textContent)
        Search_Category(element.lastElementChild.firstElementChild.nextElementSibling.firstElementChild.textContent)   
      })
  })
}

function Search_Category(Category){
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${Category}`)
  .then((res)=>res.json())
  .then((res)=>{
    res.meals.forEach((element, index) => {
      let obj = new Object();
      obj.id = index;
      obj.meal = element;
      obj.price = Math.floor(Math.random() * 300) + 1;
      // all_food.splice(0,all_food.length)
      all_food.push(obj);
    });
    console.log(res)
    console.log(all_food)
    trandingShow()
  })
  .catch((error)=>{
    console.log(error)
  })
}

// this function for Input search
function GetInput(){
  let Input=document.querySelector(".input")
  let btn=document.querySelector(".input-btn").addEventListener('click',()=>{
    if (Input.value){
      let value=Input.value.trim()
      let all_search_item=all_food.filter((element,index)=>{
        if (element.meal.strArea==value || element.meal.strMeal==value || element.meal.strCategory==value){
          return (element) 
        }
      })
      console.log(all_search_item)
      InputShow(all_search_item)
    }
    else{
      if (Input.value.length<3){
           confirm("should type input before search")
           trandingShow()
      }
    }
  })
}
GetInput()

function InputShow(listofdata){
  if(listofdata){
  let contentallfood = document.querySelector(".all-food-container")
  contentallfood.innerHTML=""
  listofdata.forEach((element) => {
    let box = `<div class="cards">
    <div class="card-img">
      <img src="${element.meal.strMealThumb}" alt="" />
    </div>
    <div class="info">
    <h1 class="hidden id">${element.id}</h1>
    <h1 class="hidden mealID">${element.meal.idMeal}</h1>
      <div class="name-price">
        <p>${element.meal.strMeal}</p>
        <b>$${element.price}</b>
      </div>
    </div>
  </div>`;
    // contentallfood.innerHTML=""
    contentallfood.innerHTML += box;
  });
}
else{

}
  getClickFood();
}

// and this function for tranding food

function tranding(code) {
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${code}`)
    .then((res) => res.json())
    .then((res) => {
      res.meals.forEach((element, index) => {
        let obj = new Object();
        obj.id = index;
        obj.meal = element;
        obj.price = Math.floor(Math.random() * 300) + 1;
        // all_food.splice(0,all_food.length)
        all_food.push(obj);
      });
      console.log(all_food);

      trandingShow();
    })
    .catch((error) => {
      console.log(error);
    });
}
function trandingShow() {
  let contentallfood = document.querySelector(".all-food-container");
  all_food.forEach((element) => {
    let box = `<div class="cards">
    <div class="card-img">
      <img src="${element.meal.strMealThumb}" alt="" />
    </div>
    <div class="info">
    <h1 class="hidden id">${element.id}</h1>
    <h1 class="hidden mealID">${element.meal.idMeal}</h1>
      <div class="name-price">
        <p>${element.meal.strMeal}</p>
        <b>$${element.price}</b>
      </div>
    </div>
  </div>`;
    // contentallfood.innerHTML=""
    contentallfood.innerHTML += box;
  });
  getClickFood();
}
function random_code() {
  let all_tranding = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
  ];
  let code = all_tranding.at(Math.floor(Math.random() * all_tranding.length));
  tranding(code);
  setTimeout(() => {
    if (all_food.length <= 5 || all_food.length === 0) {
      random_code();
    }
  }, 5000);
}
// this function for increase heigth of our best food section

function heigthincrease() {
  let box = document.querySelector(".all-food-container");
  let clickbox = document.querySelector(`.section-btn`);
  let num = true;
  return () => {
    clickbox.addEventListener("click", (e) => {
      if (num && all_food.length > 10) {
        box.style.height = "fit-content";
        num = false;
      } else {
        box.style.height = "73vh";
        num = true;
      }
    });
  };
}
heigthincrease()();




// so my besic funtionality is done . now i will focus on one single food
// show and buy and reminder functinality

function getClickFood() {
  // this will help us to get which food user was clicked
  let All_box = document.querySelectorAll(".cards");
  All_box.forEach((element, index) => {
    element.addEventListener("click", (e) => {
      let foodID =
        element.lastElementChild.firstElementChild.nextElementSibling
          .textContent;
          console.log(foodID)
      showPage(foodID);
    });
  });
}

function showPage(ID) {
  let item = "";
  let page = document.querySelector("food-img-section");
  let perent = document.querySelector(".showPageParant");
  perent.style.top = "30%";
  perent.style.display = "block";
  perent.style.opacity = 1;
  all_food.forEach((element, index) => {
    if (element.meal.idMeal === ID) {
      ShowPageInfo(element);
    }
  });
  hidePage();
}
function ShowPageInfo(data) {
  let infopage = document.querySelector(".page");
  infopage.innerHTML = ` 
  <div class="food-img-section">
  <div class="current-img">
    <!-- this img will change further if user click -->
    <img id="pageimg" src="${data.meal.strMealThumb}" alt="${data.meal.strMeal}" />
  </div>
</div>  

  <div class="food-info-section">
  <div class="info-section-food">
    <div class="restorent">
      <span class="resto-img">
        <img src="" alt="">
      </span>
      <span class="resto-name">
        <h3>XYZ restorent</h3>
      </span>
    </div>
    <hr>
    <div class="food-info">
         <div class="food-cuntry">
          <span>country:  ${data.meal.strArea}</span>
          <span>Category:  ${data.meal.strCategory}</span>
         </div>
         <div class="food-name-prices">
          <span>Name:   ${data.meal.strMeal}</span>
          <span>Price:   $${data.price}</span>
         </div>
    </div>
    <div class="food-info-btn">
         <button class="food-reminder" data-ID=${data.meal.idMeal}>reminder</button>
         <button class="food-book" data-ID=${data.meal.idMeal}>Book</button>
    </div>
  </div>
</div>`;
  bookfunc(data);
  new reminderFunc(data);
}
function hidePage() {
  let perent = document.querySelector(".showPageParant");
  let btn = document.querySelector(".pageiconbtn");
  btn.addEventListener("click", (e) => {
    perent.style.top = "100%";
    perent.style.display = "none";
    perent.style.opacity = 0;
  });
}
// these all function for Page funcnality now we will write function for inner funcnality like reminder and book

// so now all function will come here for page inner functionality
function reminderFunc(data) {
  console.log(data);
  this.foodbook = document.querySelector(".food-reminder");
  this.foodbook.addEventListener("click", (e) => {
    setTimeout(() => {
      showMessage(data, "reminder");
    }, 10000);
  });
}

function bookfunc(data) {
  let book = document.querySelector(".food-book");
  book.addEventListener("click", (e) => {
    // localStorage.clear()
    localStorage.setItem(
      `${data.id}`,
      `{proID:${data.meal.idMeal},time:${new Date()
        .toISOString()
        .slice(0, 10)},price:${data.price}}`
    ); //i will remove  when connect with database
    console.log(localStorage.length, localStorage);
    showMessage(data, "Confirm");
  });
}

// this for active slide bar

function slide_bar() {
  let num = true;
  let bar = document.querySelector(".side-nav");
  let btn = document.querySelector(".more-nav-btn");
  return () => {
    btn.addEventListener("click", (e) => {
      if (num) {
        bar.style.display = "block";
        bar.style.opacity = "1";
        bar.style.right = "0px";
        num = false;
      } else {
        bar.style.right = "-10vh";
        bar.style.opacity = "0";
        bar.style.display = "none";
        num = true;
      }
    });
  };
}
slide_bar()();

// finish here

function showMessage(data, type) {
  let message = document.querySelector(".message");
  message.innerHTML = ` <div class="message-call">
  <span>
    <h1 class="text">${type}: ${data.meal.strMeal}</h1>
  </span><button>X</button>
  </div>`;
  message.display = "block";
  message.style.top = "10vh";
  message.style.opacity = "1";
  setTimeout(() => {
    message.style.top = "-10vh";
    message.style.opacity = "0";
    message.display = "none";
  }, 2000);
  TOTAlEX()
}


function TOTAlEX(){
  let element=document.querySelector(".totalexp")
  let valueobj=JSON.parse(JSON.stringify(localStorage))
  let obj=JSON.parse(`${valueobj[1]}`)
  console.log(obj,obj.price)
}

window.addEventListener("load", () => {
  getallcategory();
});
