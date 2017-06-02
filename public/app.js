var _data;

$.getJSON("/articles", function(data) {
  _data = data;
});

$(document).on("click", "#home", function(){
    $("#articles").empty();
 });
$(document).on("click", "#deletearticle", function(){
    $("#articles").empty();
  });

$(document).on("click", "#scrape", function(){
  for (var i = 0; i < _data.length; i++) {
    $("#articles").append("<p data-id='" + _data[i]._id + "'>" + _data[i].title + "<br />" + _data[i].link + "</p>");
  }
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/scrape'
    }).done(function(data) {
      console.log(data)
    });
});
$(document).on("click", "#savearticle", function(){
    $.ajax({
        type: 'GET',
        url: 'http://localhost:3000/articles'
    }).done(function(data) {
      console.log(data)
    for (var i = 0; i < _data.length; i++) {
    $("#articles").append("<p data-id='" + _data[i]._id + "'>" + _data[i].title + "<br />" + _data[i].link + "</p>");
  }

    });
});


$(document).on("click", "p", function() {
  $("#notes").empty();
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .done(function(data) {
      console.log(data);
      $("#notes").append("<h2>" + data.title + "</h2>");
      $("#notes").append("<input id='titleinput' name='title' >");
      $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
      $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
      $("#notes").append("<button data-id='" + data._id + "' id='Deletenote'>Delete Note</button>");

      if (data.note) {
        $("#titleinput").val(data.note.title);
        $("#bodyinput").val(data.note.body);
      }
    });
});

$(document).on("click", "#savenote", function() {
  var thisId = $(this).attr("data-id");

  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      console.log(data);
      $("#notes").empty();
    });

  $("#titleinput").val("");
  $("#bodyinput").val("");
 });
$(document).on("click", "#Deletenote", function() {
  var thisId = $(this).attr("data-id");
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId,
    data: {
      title: $("#titleinput").val(),
      body: $("#bodyinput").val()
    }
  })
    .done(function(data) {
      console.log(data);
      $("#notes").empty();
    });
  $("#bodyinput").val("");
  $("#titleinput").val("");
});