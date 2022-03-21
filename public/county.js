
function storeVar(area) {
    var county = area.getAttribute('value');
    document.getElementById("searchbar").value = county;
    console.log(county);
  } 

  function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
  }