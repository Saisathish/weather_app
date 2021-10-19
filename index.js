const searchInput = document.getElementById("searchCity");
const submitbtn = document.getElementById("submitbtn");
const currLocBtn = document.getElementById("currLoc");
const output = document.getElementById("output");
const loader = document.getElementById("loader");
 
const apiKey = "testKeyactualsignup";

submitbtn.addEventListener("click", e => {
  e.preventDefault();
  const inputVal = document.getElementById("searchCity").value;
  console.log(inputVal);
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

  getData(url);

});

searchInput.addEventListener("keydown",(e)=>{
  if(e.key === 'Enter'){
    submitbtn.click();
  }
})

currLocBtn.addEventListener("click", ()=>{
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) =>{
      searchInput.value="";
      console.log(position);
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
      getData(url);
    })
  }
});

// function getData(sUrl){
// fetch(sUrl)
//   .then(response => response.json())
//   .then(data => {
//     console.log(data);
//     output.innerHTML = `<div>
//                           <div>
//                               <h3 class="card-title">${data.name}</h5>
//                               <h4 class="card-subtitle mb-2 text-muted">Highs of ${data.main.temp_max} C. Lows of ${data.main.temp_min} C</h6>
//                               <p class="card-text ">Weather: ${data.weather[0].description}</p>
//                           </div>
//                       </div>`
//                       ;


//   })
//   .catch(() => {
//     console.log("Please search for a valid city");
//   });
// };

const getData = async function(sUrl){
  loader.hidden=false;
  try {
    const JsonData = await fetch(sUrl);
    if (JsonData.status === 404){
      throw new Error('Invalid City');
    }
    const data = await JsonData.json();
    loader.hidden=true;
    console.log(data);
    output.innerHTML = `
      <div>
        <div>
            <h3 class="card-title">${data.name}</h5>
            <h4 class="card-subtitle mb-2 text-muted">Highs of ${data.main.temp_max} C. Lows of ${data.main.temp_min} C</h6>
            <p class="card-text ">Weather: ${data.weather[0].description}</p>
        </div>
    </div>
  `;
  } catch(err){
    searchInput.value="";
    console.log("Please search for a valid city");
  }
  };