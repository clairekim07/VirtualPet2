var database;
var ball,foodObj;
var dog, happyDog, database, foodS, foodStock,dogIMG, Milk,button1,button2;
var feedTime;
var lastFed;
//var showError;
function preLoad(){
    dogIMG = loadImage("dog.png");
    happyDog = loadImage("happydog.png");

}
function setup(){
    database = firebase.database();
    //console.log(database);
    createCanvas(700,700);
    
    foodObj = new Food();
    dog = createSprite(550,550,10,10);
    dog.addImage(dogIMG);
    dog.scale = .8;

    foodStock = database.ref('food');
    foodStock.on('value',readStock);

    feed = createButton("Feed the dog")
    feed.position(600,100)
    feed.mousePressed(feedDog)

    addFood = createButton("Add Food")
    addFood.position(800,95)
    addFood.mousePressed(addFoods)


}

function draw(){
    background("green");
    foodObj.display()
    textSize(15);
    fill("black");
    if(lastfeed>=12)
 {
   text("Last Feed :" + LastFed%12 + "PM", 350,30);
 }else if(LastFed ===0 )
 {
   text("Last Feed : 12 AM" , 350,30)
 }else
 {
   text("Last Feed :" + LastFed + "AM", 350,30);
 }
drawSprites();
}
function readStock(data){
    foodS = data.val();
    foodObj.updateFoodStock(foodS)
  }
  
  function writeStock(x){
    if(x>0){
      x=x-1
    }
    else{
      x=0
    }
    database.ref('/').set({
      food: x
    })
  }

function addFoods(){
    foodS++
    database.ref('/').update({
      food:foodS
    })
    }

function feedDog(){

    dog.addImage(happyDog)
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
     database.ref('/').update({
       food:foodObj.getFoodStock(),
       FeedTime:hour ()
     })
    }