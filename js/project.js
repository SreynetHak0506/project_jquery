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
    $('#showrulers').hide();
    $('#show').hide();
    $('#shows').hide();
    $('#table3').hide();
}
$('#style').hide();
function eachRecipe(id){
   allDat.forEach(item =>{
       if(item.id == id){
           showRecipe(item.name ,item.iconUrl);
           showIngredient(item.ingredients);
           showInstruction(item.instructions);
           $(' #style').show();
       }
   })
}
function showRecipe(name, imag){
    var result ="";
    result +=` 
    <div class="card" style="border:5px solid cyan">
    <div class="card-header " 
    <h1><strong>${name}</strong></h1>
    </div>
    <div class="card-body">
    <img src ="${imag}" width="300">
    </div>
    </div>
    
    `;
    $('#recipe-result').html(result);
    $('#showrulers').show();

}

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
    $('#table3').show();

    })
}

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
      
  }
}
   
    