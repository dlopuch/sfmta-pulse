var sfmta;

d3.json('assets/example.sfmta.geojson', function(error, sfmtaRoutes) {
  if (error)
    return console.log("error loading json:" + error);

  console.log("got json");
  sfmta = sfmtaRoutes;

  var width = 800,
    height = 600;

  var svg = d3.select("#svg-container").append("svg")
      .attr("width", width)
      .attr("height", height);

  var projection = d3.geo.mercator()
    .scale(200000)
    .center([-122.448169, 37.775937]) // long/lat somewhere near center of SF, from google maps
    .translate([width / 2, height / 2]);

  var pathGenerator = d3.geo.path()
    .projection(projection);

  svg
  .selectAll('path')
  .data(sfmta.features)
  .enter()
    .append("path")
      .attr("d", pathGenerator);

  window.pathGenerator = pathGenerator;

  $("#status").html('done generating paths');
  console.log('done generating paths');
});