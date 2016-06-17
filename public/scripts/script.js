console.log('in scripts');

$(document).ready(function(){
  $('#animalSubmit').on('click', postAnimals);
  getAnimals();
});//end (document).ready

var getAnimals = function(){
  $.ajax({
    type: 'GET',
    url: '/displayAnimals',
    success: function(data){
      displayAnimals(data);
    }
  });
}; //end getAnimals function

var displayAnimals = function(animals){
  $('#animalIn').val('');
  $('#outputDiv').empty();
  for(var i = 0; i < animals.length; i++){
    $('#outputDiv').append('<p>Animal: ' + animals[i].animal + ' , Quantity: ' + animals[i].animal_quantity );
    // $('#outputDiv').append('<p># of Animals: ' + animals[i].animal_quantity + '</p>');
  }
}; //end displayAnimals function

var postAnimals = function(){
  var animalObject = {
    'animal': $('#animalIn').val()
  };
  $.ajax({
    type: 'POST',
    url: '/postAnimals',
    data: animalObject
  });
  getAnimals();
}; //end postAnimals
