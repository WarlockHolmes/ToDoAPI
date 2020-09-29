
var totalTasks =  function () {
  var num;
  if ($('#complete').hasClass('d-none')) {
    num = $('#active li').length;
  } else {
    num = $('#complete li').length;
  }
  $('#total').text(' '+num);
}

$(document).ready(function(){

  $.ajax({
    type: 'GET',
    url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=192',
    dataType: 'json',
    success: function (response, textStatus) {
      var tasks = response.tasks;
      if(tasks.length !== 0) {
        tasks.forEach(function(val){
          if (!val.completed) {
            $('#active').append('<li class="list-group-item" id="' + val.id + '">' + val.content + '<button class="btn btn-outline-danger btn-sm float-right py-0 remove">x</button><button class="btn btn-outline-success btn-sm float-right py-0 complete">Done!</button></li>');
          } else {
            $('#complete').append('<li class="list-group-item" id="' + val.id + '">' + val.content + '<button class="btn btn-outline-danger btn-sm float-right py-0 remove">x</button><button class="btn btn-outline-secondary btn-sm float-right py-0 incomplete">Not done</button></li>');
          }
          totalTasks();
        });
      }
    },
    error: function (request, textStatus, errorMessage) {
      console.log(errorMessage);
    }
  });

  $(window).keydown('input', function(){
    if(event.key === "Enter") {
      var task = $('input').val();
      var id = Number($('#active').children('li').attr('id')) + 1;
      if (task){
        $('#active').append('<li class="list-group-item" id='+id+'">'+task+'<button class="btn btn-outline-danger btn-sm float-right py-0 remove">x</button><button class="btn btn-outline-success btn-sm float-right py-0 complete">Done!</button></li>');
        //add to server
        $.ajax({
          type: 'POST',
          url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks?api_key=192',
          contentType: 'application/json',
          dataType: 'json',
          data: JSON.stringify({
            task: {
              content: task
            }
          }),
          success: function (response, textStatus) {
            console.log(response);
          },
          error: function (request, textStatus, errorMessage) {
            console.log(errorMessage);
          }
        });

        totalTasks();

        $('input').val('');
      }
    }
  });
  $(document).on('click', '.complete', function(){
    var task = $(this).closest('li').text().slice(0, $(this).closest('li').text().indexOf('x'));
    var id = $(this).closest('li').attr('id');
    $('#complete').append('<li class="list-group-item" id="' + id + '">' + task + '<button class="btn btn-outline-danger btn-sm float-right py-0 remove">x</button><button class="btn btn-outline-secondary btn-sm float-right py-0 incomplete">Not done</button></li>');
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+id+'/mark_complete?api_key=192',
      success: function (response, textStatus) {
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
    $(this).closest('li').remove();
    totalTasks();
  });
  $(document).on('click', '.incomplete', function(){
    var task = $(this).closest('li').text().slice(0, $(this).closest('li').text().indexOf('x'));
    var id = $(this).closest('li').attr('id');
    $('#active').append('<li class="list-group-item" id='+id+'">'+task+'<button class="btn btn-outline-danger btn-sm float-right py-0 remove">x</button><button class="btn btn-outline-success btn-sm float-right py-0 complete">Done!</button></li>');
    $.ajax({
      type: 'PUT',
      url: 'https://altcademy-to-do-list-api.herokuapp.com/tasks/'+id+'/mark_active?api_key=192',
      success: function (response, textStatus) {
        console.log(response);
      },
      error: function (request, textStatus, errorMessage) {
        console.log(errorMessage);
      }
    });
    $(this).closest('li').remove();
    totalTasks();
  });
  $(document).on('click', '.remove', function(){
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
    totalTasks();
  });
  var input = false;
  $(document).on('click', '#foot div:last-child p', function(){
    $('ul').toggleClass('d-none');
    var span1 = $('span:first').text();
    var span2 = $('span:last').text();
    $('span:first').text(span2);
    $('span:last').text(span1);
    if (!input) {
      input = $('input').detach();
    } else {
      $('#foot').before(input);
      input = false;
    }
    totalTasks();
  })
});
