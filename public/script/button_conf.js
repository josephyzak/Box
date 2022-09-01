var mySelect = document.getElementById("categoryEvent");

const slideValue = document.getElementById("my-label");
const inputSlider = document.getElementById("my-input");
const minutoSelect = document.getElementById("my-horas");

mySelect.addEventListener("change", () => {
    axios.post(url4 + mySelect.value).then((result) => {
        document.getElementById("valor-pez").innerText = mySelect.value;
        document.getElementById("valor-temp").innerText = result.data[0]["temperatura"] + " [°C]";
        document.getElementById("valor-ph").innerText = result.data[0]["pH_low"] + " - " + result.data[0]["pH_up"] + " [pH]";
        document.getElementById("valor-lumi").innerText = result.data[0]["luminocidad"] + " [%]";
    });
});
async function submitADD(){
    Swal.fire({
        title: "Ingresar nueva configuración de Pez",
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Pez">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Temperatura">' +
            '<input id="swal-input3" class="swal2-input" placeholder="pH_low">' + 
            '<input id="swal-input4" class="swal2-input" placeholder="pH_up">' + 
            '<input id="swal-input5" class="swal2-input" placeholder="Luminocidad">'
        })
        .then(async() => {
            f1 = String(document.getElementById("swal-input1").value);
            f2 = String(document.getElementById("swal-input2").value);
            f3 = String(document.getElementById("swal-input3").value);
            f4 = String(document.getElementById("swal-input4").value);
            f5 = String(document.getElementById("swal-input5").value);
            axios.post(url2 + f1 + "/" + f2 + "/" + f3 + "/" + f4 + "/" + f5)
            .then(() => {location.reload();});
    });
};
async function submitSUB(){
    var cod = document.getElementById("categoryEvent").value;
    axios.post(url3 + cod).then(async() => {
        Swal.fire({
            title: "Producto Eliminado"
        }).then(() => {location.reload();});
    });
};
async function submitGO(){
    const pez = document.getElementById("valor-pez").textContent;
    axios.post(url4 + pez)
    .then((result) => {
        f1 = String(result.data[0]["temperatura"]);
        f2 = String(result.data[0]["pH_low"]);
        f3 = String(result.data[0]["pH_up"]);
        f4 = String(result.data[0]["luminocidad"]);
        axios.post(url5 + pez + "/" + f1 + "/" + f2 + "/" + f3 + "/" + f4);
    });
};
async function submitONtemp(){
    axios.get(url6)
    .then(() => {location.reload();});
};
async function submitOFFtemp(){
    axios.get(url7)
    .then(() => {location.reload();});
};
async function submitPID(){
    Swal.fire({
        title: "Ingresar los coeficientes PID",
        html:
            '<input id="swal-input1" class="swal2-input" placeholder="Kp">' +
            '<input id="swal-input2" class="swal2-input" placeholder="Ki">' +
            '<input id="swal-input3" class="swal2-input" placeholder="Kd">'
    }).then(async() => {
        f1 = String(document.getElementById("swal-input1").value);
        f2 = String(document.getElementById("swal-input2").value);
        f3 = String(document.getElementById("swal-input3").value);
        axios.post(url8 + f1 + "/" + f2 + "/" + f3)
        .then(() => {location.reload();});
    });
};
async function submitONlum(){
    axios.get(url9)
    .then(() => {location.reload();});
};
async function submitOFFlum(){
    axios.get(url10)
    .then(() => {location.reload();});
};
async function submitONbom(){
    axios.get(url11)
    .then(() => {location.reload();});
};
async function submitOFFbom(){
    axios.get(url12)
    .then(() => {location.reload();});
};
async function submitHora(){
    f1 = String(minutoSelect.value);
    f2 = String(slideValue.textContent);
    
    axios.post(url13 + f1 + "/" + f2)
    .then(() => {location.reload();});
};

//minutoSelect.addEventListener("change", );
inputSlider.oninput = (() => {
    let value = inputSlider.value;
    slideValue.textContent = value;
    slideValue.style.left = (value / 2) + "[%]";
    
    //slideValue.classList.add("show");
});

/*
inputSlider.onblur = (() => {
    slideValue.classList.remove("show");
});*/