// Student Name: Chhitiz Rai
// Student ID: 2408057
const cityName = document.querySelector(".search-box");

const displayerrorr = document.querySelector(".error");
const displayCityName = document.querySelector(".location");
const displayTemp = document.querySelector(".temperature");
const displayhumi = document.querySelector("#humi");
const displaywinds = document.querySelector("#winds");
const displaypressure = document.querySelector("#press");
const displaystatus = document.querySelector(".stats");
const displayicon = document.querySelector(".weather-details img");
const displaybgvid = document.querySelector("#background-video");
const displaydate = document.querySelector(".date");
const displaytime = document.querySelector(".time");
const API_Key = "e91ac49e67d4ba3c7b9795c9dadb81f2";

async function fetchWeathera() {
  try {
    const out = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=kakinada&appid=${API_Key}&units=metric`
    );
    const outtt = await out.json();
    console.log(outtt);
    displayCityName.innerHTML = `${outtt.name},${outtt.sys.country}`;
    displayTemp.innerHTML = `${parseInt(outtt.main.temp)}<span>°C</span>`;
    displayhumi.innerHTML = `${outtt.main.humidity}%`;
    displaywinds.innerHTML = `${parseInt(outtt.wind.speed)} Km/h`;
    displaypressure.innerHTML = `${outtt.main.pressure} hpa`;
    displaystatus.innerHTML = `${outtt.weather[0].description}`;
    displayicon.src = `https://openweathermap.org/img/wn/${outtt.weather[0].icon}@2x.png`;

    let timestampOffset = outtt.timezone; //yo chai timezone ho hai
    const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
    const date = new Date(timestamp * 1000);

    // Format the date using toLocaleDateString()
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
    });

    const formattedDay = date.toLocaleDateString("en-US", {
      weekday: "long",
    });

    // Format the time using toLocaleTimeString()
    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      timeZone: "UTC",
    });

    // Output the formatted date and time
    displaytime.innerHTML = `${formattedTime}`;
    displaydate.innerHTML = `${formattedDay} | ${formattedDate}`;
  } catch (error) {
    console.log(error);
  }
}
fetchWeathera();

async function fetchWeather() {
  const city_name = cityName.value;
  try {
    const out = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_Key}&units=metric`
    );

    if (out.status == 404) {
      displayerrorr.innerHTML = "Invalid City Name";
    } else {
      const dass = await out.json();
      console.log(dass);
      displayerrorr.innerHTML = " ";
      displayCityName.innerHTML = `${dass.name},${dass.sys.country}`;
      displayTemp.innerHTML = `${parseInt(dass.main.temp)}<span>°C</span>`;
      displayhumi.innerHTML = `${dass.main.humidity}%`;
      displaywinds.innerHTML = `${parseInt(dass.wind.speed)} m/s`;
      displaypressure.innerHTML = `${dass.main.pressure} hpa`;
      displaystatus.innerHTML = `${dass.weather[0].description}`;
      displayicon.src = `https://openweathermap.org/img/wn/${dass.weather[0].icon}@2x.png`;

      let timestampOffset = dass.timezone; //yo chai timezone ho hai
      const timestamp = Math.floor(Date.now() / 1000) + timestampOffset;
      const date = new Date(timestamp * 1000);

      // Format the date using toLocaleDateString()
      const formattedDate = date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
      });

      const formattedDay = date.toLocaleDateString("en-US", {
        weekday: "long",
      });

      // Format the time using toLocaleTimeString()
      const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        timeZone: "UTC",
      });

      // Output the formatted date and time
      displaytime.innerHTML = `${formattedTime}`;
      displaydate.innerHTML = `${formattedDay} | ${formattedDate}`;
    }
  } catch (error) {
    console.log(error);
  }
}
