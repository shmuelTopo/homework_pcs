const perfEntries = performance.getEntriesByType("navigation");

if (perfEntries[0].type === "back_forward") {
  var url = window.location;
  if(url.pathname === '/visits'){
    location.reload(true);
  }
}