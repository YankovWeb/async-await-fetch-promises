function solve() {
  const info = document.querySelector(".info");
  const buttonDepart = document.getElementById("depart");
  const buttonArrive = document.getElementById("arrive");
  let obj = {
    next: "depot",
  };
  const url = "http://localhost:3030/jsonstore/bus/schedule";
  function depart() {
    fetch(`${url}/${obj.next}`)
      .then((resolve) => resolve.json())
      .then((data) => {
        obj = data;
        info.textContent = `Next stop ${obj.name}`;
        buttonDepart.disabled = true;
        buttonArrive.disabled = false;
      })
      .catch((error) => {
        buttonDepart.disabled = true;
        buttonArrive.disabled = trueß;
        console.log(error);
      });
  }

  function arrive() {
    info.textContent = `Arriving at ${obj.name}`;
    buttonDepart.disabled = false;
    buttonArrive.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
