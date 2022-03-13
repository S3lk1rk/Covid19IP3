function storeVar(area) {
    var county = area.getAttribute('value');
    document.getElementById("searchbar").value = county;
    console.log(county);
  } 