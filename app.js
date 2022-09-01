const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const fileUpLoad = require("express-fileupload");

const session = require("express-session");
const cors = require("cors");

const router = require("./routes");

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static("./public"));
app.use(expressLayouts);
app.use(fileUpLoad());
app.use(cors());

app.use(session({
    secret: "secret",    
    saveUninitialized: true,
    resave: true,
    var_logging: false,
    valor_dark: 0,
    Nombre_: "Usuario",
    Tipo_: "Tipo",
    myID: 0,
    myImg: ""
}));

app.use(router.router);

app.listen(3000, () => {
    console.log("Servidor corriendo en: http://localhost:3000");
});