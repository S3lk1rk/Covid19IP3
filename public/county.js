function storeVar(area) {
    var county = area.getAttribute('value');
    document.getElementById("searchbar").value = county;
    console.log(county);
  } 

  var allStates = ("svg.uk > *");

  allStates.on("click", function() {
    
    allStates.removeClass("on");
    $(this).addClass("on");
    
  });