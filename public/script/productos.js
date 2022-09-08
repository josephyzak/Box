var peces = [];

axios.get(url1).then((responce) => {
    peces = Object.values(responce.data);
            
    var select = document.getElementById("categoryEvent");
            
    peces.forEach(element => {
        var newOption = document.createElement("option");
        newOption.value = Object.values(element)[0];
        newOption.text = Object.values(element)[0];
        select.appendChild(newOption);
    });
}).catch((error) => {
    console.log(error);
});