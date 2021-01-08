var height = 800;
var width = 800;

data = {
  children: [
    {
      Nom: "Tears of Joy",
      Pourcentage: 220,
      Image_Path: "images/Tears of Joy.png",
    },
    {
      Nom: "Crying Face",
      Pourcentage: 170,
      Image_Path: "images/Crying Face.png",
    },
    {
      Nom: "Pleading Face",
      Pourcentage: 105,
      Image_Path: "images/Pleading Face.png",
    },
    { Nom: "Red Heart", Pourcentage: 90, Image_Path: "images/Red Heart.png" },
    {
      Nom: "Floor Laughing",
      Pourcentage: 85,
      Image_Path: "images/Floor Laughing.png",
    },
    { Nom: "Sparkles", Pourcentage: 70, Image_Path: "images/Sparkles.png" },
    { Nom: "Heart-Eyes", Pourcentage: 65, Image_Path: "images/Heart-Eyes.png" },
    {
      Nom: "Face with Hearts",
      Pourcentage: 45,
      Image_Path: "images/Face with Hearts.png",
    },
    {
      Nom: "Smiling Eyes",
      Pourcentage: 45,
      Image_Path: "images/Smiling Eyes.png",
    },
  ],
};

var svg = d3
  .select("#chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var defs = svg
  .selectAll(null)
  .data(data.children)
  .enter()
  .append("defs")
  .append("pattern")
  .attr("id", function (d) {
    return d.Nom.toLowerCase().replaceAll(" ", "-");
  })
  .attr("height", "100%")
  .attr("width", "100%")
  .attr("patternContentUnits", "objectBoundingBox")
  .append("image")
  .attr("height", "0.8")
  .attr("width", "1")
  .attr("preserveAspectRatio", "xMidYMid")
  .attr("xmlns:xlink", "http://www.w3.org/1999/xlink")
  .attr("xlink:href", function (d) {
    return d.Image_Path;
  });

var simulation = d3
  .forceSimulation()
  .force("x", d3.forceX(width / 2).strength(0.05))
  .force("y", d3.forceY(height / 2).strength(0.05))
  .force(
    "collide",
    d3.forceCollide().radius((d) => d.Pourcentage - 10)
  )
  .alpha(1)
  .restart();

var circles = svg
  .selectAll(null)
  .data(data.children)
  .enter()
  .append("circle")
  .attr("r", function (d) {
    return d.Pourcentage;
  })
  .attr("fill", function (d) {
    return "url(#" + d.Nom.toLowerCase().replaceAll(" ", "-") + ")";
  });

simulation.nodes(data.children).on("tick", tick).on("end", verify);

function tick() {
  circles
    .attr("cx", function (d) {
      return d.x;
    })
    .attr("cy", function (d) {
      return d.y;
    });
}

function verify() {
  var n = 0;
  for (var i = 0; i < data.children.length - 1; i++) {
    if (data.children[i].x > data.children[i + 1].x) n++;
  }
  console.log(n + " out of place");
}
