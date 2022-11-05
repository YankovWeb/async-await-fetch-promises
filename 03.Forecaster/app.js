function attachEvents() {
  document.getElementById("submit").addEventListener("click", findLocation);
  async function findLocation() {
    try {
      debugger;
      let input = document.getElementById("location").value;
      const ulr = `http://localhost:3030/jsonstore/forecaster/locations`;
      const respond = await fetch(ulr);
      const data = await respond.json();
      const location = data.find((e) => e.name === input);
      debugger;
      const code = location.code;

      const urlDay = `http://localhost:3030/jsonstore/forecaster/today/${code}`;
      const responsDay = await fetch(urlDay);
      const dataDay = await responsDay.json();
      const ulr3 = `http://localhost:3030/jsonstore/forecaster/upcoming/${code}`;
      const respons3 = await fetch(ulr3);
      const data3 = await respons3.json();
      creatHtml(dataDay);
    } catch {
      debugger;
      document.getElementById("forecast").style.display = "block";
      const [current, upcoming] = [...document.querySelectorAll(".label")];
      current.textContent = "Error";
      upcoming.style.display = "none";
    }

    function creatHtml(data) {
      const elementObj = {
        Sunny: "&#x2600",
        "Partly sunny": "&#x26C5",
        Overcast: "&#x2601",
        Rain: "&#x2614",
        Degrees: "&#176",
      };
      const { condition, low, high } = data.forecast;
      document.getElementById("forecast").style.display = "block";
      const divToApend = document.getElementById("current");

      const divForcast = document.createElement("div");
      divForcast.classList = "forecasts";
      const spanSimbol = document.createElement("span");
      spanSimbol.classList = "condition symbol";
      spanSimbol.innerHTML = `${elementObj[condition]}`;
      const spamContainer = document.createElement("span");
      spamContainer.classList.add = "condition";
      const spanCity = document.createElement("span");
      spanCity.classList = "forecast-data";
      spanCity.innerText = `${data.name}`;
      const spanDegree = document.createElement("span");
      spanDegree.classList = "forecast-data";
      spanDegree.innerHTML = `${low}${elementObj.Degrees}/${high}${elementObj.Degrees}`;

      const spanTypeCondition = document.createElement("span");
      spanTypeCondition.classList = "forecast-data";
      spanTypeCondition.innerText = `${condition}`;

      spamContainer.append(spanCity, spanDegree, spanTypeCondition);
      divForcast.append(spanSimbol, spamContainer);
      divToApend.replaceChildren(divForcast);
    }
  }
}
attachEvents();
