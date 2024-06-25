async function getUserLocation() {
 return new Promise((resolve, reject) => {
   navigator.geolocation.getCurrentPosition(
     function(position) {
       var latitude = position.coords.latitude;
       var longitude = position.coords.longitude;
       resolve(`${latitude},${longitude}`);
     },
     function(error) {
       reject(error);
     }
   );
 });
}

var inputElement = document.querySelector('.search-city');
inputElement.addEventListener('keyup', function() {
 realTimeWeather();
});

async function realTimeWeather(){
  var location = inputElement.value;
  if (location === '') {
    location = await getUserLocation();
  }
  var currentWeather=await fetch(`http://api.weatherapi.com/v1//forecast.json?key=08d360a2f9624f2293585810241706&q=${location}&days=3`);
  var result=await currentWeather.json();
  console.log(result.location.name)
  var date1 =new Date(result.forecast.forecastday[0].date)
  var date2 =new Date(result.forecast.forecastday[1].date)
  var date3 =new Date(result.forecast.forecastday[2].date)
  var months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','sept','Oct','Nov','Dec'];
  var days=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  var content=
  `<div class="col-lg-4 p-0">
       <div class="header1 d-flex p-1">
         <div class="text-gray">${days[date1.getDay()]}</div>
         <div class="ms-auto text-gray">${date1.getDate()}${months[date1.getMonth()]}</div>
       </div>
       <div class="p-3">
         <div class="fs-4 fw-medium">${result.location.name}</div>
         <div class="today-degree fw-bolder">${result.current.temp_c}<sub>o</sub>C</div>
         <div class="weather-icon">
           <img src="https:${result.current.condition.icon}" alt="weather-icon" width="90">
         </div>
         <span class="fs-5 text-blue">${result.current.condition.text}</span>
         <div class="d-flex gap-4">
           <span class="text-gray">
             <i class="fa-solid fa-umbrella text-gray"></i>
             20%
           </span>
           <span class="text-gray">
             <i class="fa-solid fa-wind text-gray"></i>
             ${result.forecast.forecastday[0].day.maxwind_kph}km/h
           </span>
           <span class="text-gray">
             <i class="fa-solid fa-compass text-gray"></i>
             20%
           </span>
         </div>
       </div>
     </div>
     <div class="col-lg-4 col2 p-0 text-center">
       <div class="header2 p-1">
         <div class="text-gray">${days[date2.getDay()]}</div>
       </div>
       <div class="p-5">
         <div class="weather-icon">
          <img src="https:${result.forecast.forecastday[1].day.condition.icon}" alt="weather-icon" width="90">
         </div>
         <div class="fw-bolder fs-3">${result.forecast.forecastday[1].day.maxtemp_c}<sub>o</sub>C</div>
         <div class="mb-2">${result.forecast.forecastday[1].day.mintemp_c}<sub>o</sub></div>
         <span class="fs-5 text-blue">${result.forecast.forecastday[1].day.condition.text}</span>
       </div>
     </div>
     <div class="col-lg-4 p-0 text-center">
       <div class="header3 p-1">
         <div class="text-gray">${days[date3.getDay()]}</div>
       </div>
       <div class="p-5">
         <div class="weather-icon">
           <img src="https:${result.forecast.forecastday[2].day.condition.icon}" alt="weather-icon" width="90">
         </div>
         <div class="fw-bolder fs-3">${result.forecast.forecastday[2].day.maxtemp_c}<sub>o</sub>C</div>
         <div class="mb-2">${result.forecast.forecastday[2].day.mintemp_c}<sub>o</sub></div>
         <span class="fs-5 text-blue">${result.forecast.forecastday[2].day.condition.text}</span>
       </div>
  </div>`
document.querySelector('.table').innerHTML=content;
};

realTimeWeather();
