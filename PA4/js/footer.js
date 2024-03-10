$(document).ready(function() {
  var currentUserID;
  $.ajax({
    url: "get-user-id.php",
    type: "GET",
    success: function(response) {
      currentUserID = response;
      var savedColor = localStorage.getItem("footer-color-" + currentUserID);

      if (savedColor) {
        applyTheme(savedColor);
        $('#color-picker-input').spectrum("set", savedColor);
      }

      $('#color-picker-input').spectrum({
        color: savedColor || '#333',
        preferredFormat: "hex",
        showInput: true,
        showInitial: true,
        showPalette: true,
        palette: [
          ['#333', '#555', '#777', '#999', '#BBB', '#EEE'],
          ['#f00', '#f90', '#ff0', '#0f0', '#0ff', '#00f', '#90f', '#f0f'],
          ['#ea9999', '#f9cb9c', '#ffe599', '#b6d7a8', '#a2c4c9', '#9fc5e8', '#b4a7d6', '#d5a6bd'],
          ['#ff0000', '#ffc107', '#cddc39', '#8bc34a', '#4caf50', '#00bcd4', '#3f51b5', '#9c27b0', 'cadetblue'],
        ],
        change: function(color) {
          applyTheme(color.toHexString());

          localStorage.setItem("footer-color-" + currentUserID, color.toHexString());

          $.ajax({
            url: "update-theme.php",
            type: "POST",
            data: JSON.stringify({theme: color.toHexString()}),
            contentType: "application/json",
            success: function(response) {
              console.log("Theme updated successfully");
              console.log(response);
            },
            error: function(jqXHR, textStatus, errorThrown) {
              console.log("Error updating theme: " + errorThrown);
            }
          });
        }
      });
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log("Error retrieving user ID: " + errorThrown);
    }
  });

  function applyTheme(color) {
    $('footer').css('background-color', color);
    $('.product-card').css('background-color', color);
    var brightness = tinycolor(color).toHsl().l;
    if (brightness < 0.3) {
      $('.product-card').css('color', '#fff');
    } else {
      $('.product-card').css('color', '#333');
    }
  }
});