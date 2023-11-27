$(function() {
    // Load the navbar
    $("#navbar-placeholder").load("navbar.html", function() {
  
      // Navigation toggler
      $('#navbar-toggle').click(function() {
        $(this).toggleClass('active');
      });
    });
  
    // Load footer
    $("#footer-placeholder").load("footer.html");
  
  });