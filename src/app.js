const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const forecast = require("./utils/forecast");

const port = process.env.PORT || 3000;

// init expres
const app = express();

// defined path for expres config
const publicPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// setup handlebar
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);

// setup static pages
app.use(express.static(publicPath));

const name = "Abdul-Rauf Alhassan";

app.get("", (req, res) => {
  res.render("index", { title: "Weather", name });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About", name });
});

app.get("/weather", (req, res) => {
  const { address } = req.query;

  if (!address) return res.send({ error: "You must provide an address" });

  geoCode(address, (error, data) => {
    if (error) return res.send({ error });

    forecast(data, (error, forecastData) => {
      if (error) return res.send({ error });

      res.send({
        ...forecastData,
        address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  const { search } = req.query;

  if (!search) return res.send({ error: "You must provide a search" });

  res.send({
    products: [],
  });
});

app.get("/help", (req, res) => {
  res.render("help", { title: "Help", name });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "Error:404",
    errorMessage: "Help article not found",
    name,
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "Error:404",
    errorMessage: "Page not found",
    name,
  });
});

app.listen(port, () => {
  console.log(`server running on port:${port}`);
});
