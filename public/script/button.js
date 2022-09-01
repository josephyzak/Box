const btnSwitch1 = document.querySelector(".switch1");
const btnSwitch2 = document.querySelector(".switch2");

var myColor1 = document.getElementById("myColor").textContent;
var selectElement = document.getElementById("categoryEvent");

if (myColor1 == "0") {
    document.body.classList.remove("dark");
    btnSwitch1.classList.remove("active");
    btnSwitch2.classList.add("active");
} else if(myColor1 == "1"){
    document.body.classList.add("dark");
    btnSwitch1.classList.add("active");
    btnSwitch2.classList.remove("active");
}

btnSwitch1.addEventListener("click", async() => {
    document.body.classList.remove("dark");
    btnSwitch1.classList.remove("active");
    btnSwitch2.classList.add("active");

    var a = document.getElementById("myID_");
    var h1 = String(a.textContent);
    await axios.post(url0 + h1 + "/0");
});
btnSwitch2.addEventListener("click", async() => {
    document.body.classList.add("dark");
    btnSwitch1.classList.add("active");
    btnSwitch2.classList.remove("active");

    var a = document.getElementById("myID_");
    var h1 = String(a.textContent);
    await axios.post(url0 + h1 + "/1");
});