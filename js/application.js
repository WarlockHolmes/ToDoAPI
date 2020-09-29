

$(document).ready(function(){

  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=192',
    dataType: 'json',
    success: function (response, textStatus) {
      var tasks = response.tasks;
      if(tasks.length !== 0) {
        tasks.forEach(function(val){
          $('ul').append('<li class="list-group-item" id="' + val.id + '">' + val.content + '<button class="btn btn-outline-danger btn-sm float-right py-0">x</button></li>');
          $('input').val('');
        });
      }
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });



  $(window).keydown('input', function(){
    if(event.key === "Enter") {
      var item = $('input').val();
      var id = Number($('ul').children('li').attr('id')) + 1;
      if (item){
        $('ul').append('<li class="list-group-item" id='+id+'">'+item+'<button class="btn btn-outline-danger btn-sm float-right py-0">x</button></li>');
        //add to server
        $.ajax({
          type: 'POST',
          url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=192',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
            task: {
              content: item
            }
          }),
          success: function (response, textStatus) {
            console.log(response);
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });

        $('input').val('');
      }
    }
  });
  $(document).on('click', 'li > button', function(){
    var id = $(this).closest('li').attr('id');
    $.ajax({
      type: 'DELETE',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+id+'?api_key=192',
      success: function (response, textStatus) {
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
    $(this).closest('li').remove();
  });
});
