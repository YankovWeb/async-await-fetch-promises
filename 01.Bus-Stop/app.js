function getInfo() {
  const url = `http://localhost:3030/jsonstore/bus/businfo`;
  const input = document.getElementById("stopId");
  const divStop = document.getElementById("stopName");
  const ulElement = document.getElementById("buses");
  fetch(`${url}/${input.value}`)
    .then((respons) => respons.json())
    .then((data) => {
      const name = data.name;
      const buses = data.buses;
      divStop.textContent = name;
      ulElement.innerHTML = "";
      Object.keys(buses).forEach((e) => {
        const liE = document.createElement("li");
        liE.textContent = `Bus ${e} arrives in ${buses[e]} minutes`;
        ulElement.appendChild(liE);
      });
    })
    .catch((err) => {
      divStop.textContent = "Error";
      ulElement.innerHTML = "";
    });
}
