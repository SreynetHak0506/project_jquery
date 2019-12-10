$(function(){

    $('#plus').on('click',add);
    $('#manus').on('click',remove);
  
  });
  function add(){
    var input = $('#input'),
        value = input.val(); 
    if( value < 15){
        input.val(++value);
    }else{
        $('#plus').attr('disabled','disabled'); 
    }
  
  }
  function remove(){
     var input = $('input'),
         value = input.val();
     if(value > 0){
       input.val(--value);
     }else{
       $('#manus').attr('disabled','disabled');
    }
  
  }

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

});

function getApi(){
    $.ajax({
        dataType:'json',
        url:getUrl(),
        success:(data) =>chooseRecipe(data.recipes),
        error:() => console.log("Cannot get data"),
    })
}

var allDat = [];
function chooseRecipe(recipe){
    allDat = recipe;
    var option = "";
    recipe.forEach(element => {
        option +=`
         <option value="${element.id}">${element.name}</option>
        `;   
    });
    $('#select').append(option);
}
function eachRecipe(id){
   allDat.forEach(item =>{
       if(item.id == id){
           showRecipe(item.name ,item.iconUrl);
           showIngredient(item.ingredients);
       }
   })
}
function showRecipe(name, imag){
    var result ="";
    result +=` 
    <h2>${name}</h2>
    <img src ="${imag}" width="300">
    
    `;
    $('#recipe-result').html(result);

}

function showIngredient(done){
    var results ="";
    done.forEach(item =>{
        results +=`
    <tr>
    <h1>Ingredients</h1>
      <td><img src ="${item.iconUrl}" width="100"></td>
      <td>${item.unit[0]}</td>
      <td>${item.quantity}</td>
      <td>${item.name}</td>

    </tr>
    `;
    $('#table').html(results);
    })
     
    
}
   
    