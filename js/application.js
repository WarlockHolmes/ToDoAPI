
$(document).ready(function(){


  $(document).on('submit', '#add-item', function(){
      event.preventDefault();
      var item = $('#add-item input').val();
      var id = $('ul').children('li').length + 1;
      if (item !== undefined && name !== undefined){
        $('ul').append('<li class="list-group-item" id="todo'+id+'">'+item+'<button class="btn btn-outline-danger btn-sm float-right py-0">x</button></li>');
        $('#add-item input').val('');
      }
    });
    $(document).on('click', 'li > button', function(){
      $(this).closest('li').remove();
    });
});
