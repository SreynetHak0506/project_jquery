
  function getUrl(){
    var url ="https://raw.githubusercontent.com/radytrainer/test-api/master/test.json";
    return url;
}

$(document).ready(function(){
 getApi();
 $('#select').on('change',function(){
    var recipeId = $('#select').val();
    eachRecipe(recipeId);
   
 });
// click button manus
 $('#manus').on('click',function(){
  manus();
  var inputmanus = $('#input').val();
  var selsect = $('#select').val();
 
  manus(inputmanus);
  changeRecipe(selsect,inputmanus);
})
// click button plus
$('#plus').on('click',function(){
  plus();
  var selsect = $('#select').val();
  var inputplus = $('#input').val();
  plus(inputplus);
  changeRecipe(selsect,inputplus);

});

});
// get API
function getApi(){
    $.ajax({
        dataType:'json',
        url:getUrl(),
        success:(data) =>chooseRecipe(data.recipes),
        error:() => console.log("Cannot get data"),
    })
}

var allDat = [];
var getQuanlity = [];
// The choose for select recipe
function chooseRecipe(recipe){
    allDat = recipe;
    var option = "";
    recipe.forEach(element => {
        option +=`
         <option value="${element.id}">${element.name}</option>
        `;   
    });
    $('#select').append(option);
    $('#show').hide();
    $('#shows').hide();
    $('#instructions').hide();
    $('#recipes').hide();
}
$('#ingredients').hide();
// keep all API 
function eachRecipe(id){
   allDat.forEach(item =>{
       if(item.id == id){
           showRecipe(item.name ,item.iconUrl);
           showIngredient(item.ingredients);
           showInstruction(item.instructions);
           $(' #ingredients').show();
           $('#recipes').show();
           getPersons = item;
            $('#input').val(item.nbGuests);
            oldGuest = $('#input').val();
           
       }
   })
}
//change recipe
function changeRecipe(id,guest){
   allDat.forEach(item =>{
       if(item.id == id){
           showRecipe(item.name ,item.iconUrl);
           changeIngredient(item.ingredients,guest);
           showInstruction(item.instructions);
           $(' #ingredients').show();
           $('#recipes').show();
           $('#input').val(guest);
    
       }
   })
}
// name and imag
function showRecipe(name, imag){
    var result ="";
    result +=` 
    <div class="card" style="border:5px solid cyan">
    <div class="card-header " 
    <h1><strong><h3>${name}</h3></strong></h1>
    </div>
    <div class="card-body">
    <img src ="${imag}" width="300" class="img-fluid">
    </div>
    </div>
    
    `;
    $('#recipe-result').html(result);
   
}
// show Ingredient
function showIngredient(done){
    var results ="";
    done.forEach(item =>{
        results +=`
    <tr>
      <td><img src ="${item.iconUrl}" width="100"></td>
      <td>${item.unit[0]}</td>
      <td>${item.quantity}</td>
      <td>${item.name}</td>

    </tr>
    `;
    $('#table').html(results);
    $('#show').show();
    $('#instructions').show();
    


    })
}
//change ingredient
function changeIngredient(done,guest){
    var results ="";
    done.forEach(item =>{
      editIngredient = item.quantity * parseInt(guest) /oldGuest ;
        results +=`
    <tr>
      <td><img src ="${item.iconUrl}" width="100"></td>
      <td>${item.unit[0]}</td>
      <td>${editIngredient}</td>
      <td>${item.name}</td>

    </tr>
    `;
    $('#table').html(results);
    $('#show').show();
    $('#instructions').show();
    


    })
}
//show the step
function showInstruction(input){
  var  result ="";
  var cutInstruction = input.split("<step>");
  for( let i = 1; i<cutInstruction.length; i++){
      result +=`
    <tr>
        <td><strong><h3 class="text-primary">step${i}</h3></strong></td>
    </tr>
    <td>${cutInstruction[i]}</td>
      `;
      $('#table2').html(result);
      $('#shows').show();
      $('#recipe-result').show();
      
  }
}

//dicreament
function manus(){
  var ma = $('#input').val();
  if(ma >= 1){
    resultmanus =parseInt(ma) -1;
    $('#input').val(resultmanus);
   
  }
}
// increament
function plus(){
  var pul = $('#input').val();
  if(pul <= 15){
    resultpul =parseInt(pul) + 1;
   $('#input').val(resultpul);
  }
}

  
   
