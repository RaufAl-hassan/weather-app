/* 
fetch(url)
.then((res) => {
  return res.json()
})
.then((data) => {
  if (data.error) {
    return console.log(data.error);
  }

  return console.log(data);
}); */
// UI VARIABLES
const searchForm = document.querySelector("form");
const searchInput = document.querySelector("input");
const messageOne = document.querySelector(".meassage-one");
const messageTwo = document.querySelector(".meassage-two");

let url;

const getWeather = async (url) => {
  const res = await fetch(url);
  const data = await res.json();
  return data;
};

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  messageOne.textContent = "loading...";

  const location = searchInput.value;

  url = `/weather?address=${location}`;

  const data = await getWeather(url);

  if (data.error) return (messageOne.textContent = data.error);

  messageOne.textContent = data.forecast;
  messageTwo.textContent = data.forecast;
});
