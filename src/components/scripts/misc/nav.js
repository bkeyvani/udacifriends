// hide bootstrap nav collapse on click
$(document).ready(function() {
  $(".nav a").on("click", function() {
    $(".navbar-toggle").click()
  });
});
