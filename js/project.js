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
  $(document).ready( () =>{
    requestAPI();
  });

  var requestAPI = () =>{
    $.ajax({
      dataType:'json',
      url:getUrl(),
      success:(data) => getRecipes(data),
      error: () => getError(),
    });
  }

  var getUrl = () =>{
    var url = "https://raw.githubusercontent.com/ronanogor/jquery-project/master/database-v1.json";
    return url;
  }

  var getRecipes = (data) =>{
    data.recipes.forEach(element => {
     getIngredient(element.ingredients);
      
    });
  }

  var getError = () =>{
  }

  var getIngredient = (data) =>{
    data.forEach(item => {
      computeHTML(item);
    });
  }

  var computeHTML = (element) =>{
    var result = "";
    result += `
       <tr>
            <td> <img src = "${element.iconUrl}" width="40"</td>
            <td>${element.quantity}</td>
            <td>${element.unit[0]}</td>
            <td>${element.name}</td>
           
        </tr>
    
    `;
    printOut(result);
  }

  var printOut = (output) =>{
    $('#ingredients').append(output);
  }
