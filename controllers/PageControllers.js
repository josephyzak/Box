const DBConnector = require("../BaseData/database.js");

const AesEncryption = require('aes-encryption');
const aes = new AesEncryption();
aes.setSecretKey('11122233344455566677788822244455555555555555555231231321313aaaff');

var gpiop = require("rpi-gpio").promise;
const pin1 = 7;
gpiop.setup(pin1, gpiop.DIR_OUT).then(() => {
    return gpiop.write(pin1, false);
}).catch((err) => {
    console.log("Error: ", err.toString());
});

const vista_home = (req, res) => {
    if (req.session.var_logging) {
        res.redirect("/Home");
    } else {
        res.redirect("/login");
    }
};
const vista_logging = (req, res) => {
    res.render("./user/login.ejs", {layout : false});
};
const vista_registro = (req, res) => {
    res.render("./user/registro.ejs", {layout : false});
};
const click_registro = async(req, res) => {
    const Usuario = req.body.email;
    const Nombre = req.body.nombre;
    const Tipo = req.body.tipo;
    const Password = req.body.password1;
    const Password2 = req.body.password2;
    var ruta;
    if (!req.files) {
        ruta = "./img/profile-1.jpg";
    } else {
        var filee = req.files.myFile;
        var fileename = filee.name;
        filee.mv("./public/img/" + fileename);
        ruta = "./img/" + fileename;
    }
    if (Password == Password2){
        try {
            const mando = "INSERT INTO usuarios(email, password, nombre, tipo, color, img) values (?,?,?,?,?,?)";
            await DBConnector.queryWithParams( mando, [Usuario, aes.encrypt(Password2), Nombre, Tipo, 0, ruta]);
            res.render("./user/login.ejs", {layout : false});
        } catch (error) {
            res.render("./user/registro.ejs", {layout : false});
            console.log(error);
        }
    } else {
        res.render("./user/registro.ejs", {layout : false});
    }
};
const click_autentificar = async(req, res) => {
    const codigo_mando = "SELECT ID, password, nombre, tipo, color, img FROM usuarios WHERE email = ?";
    const Usuario = req.body.email;
    const Password = req.body.password;
    if ((Usuario != "")&&(Password != "")) {
        await DBConnector.queryWithParams( codigo_mando, [Usuario])
        .then((result) => {
            if (result[0] != undefined) {
                req.session.Nombre_ = result[0].nombre;
                req.session.Tipo_ = result[0].tipo;
                req.session.myID_ = result[0].ID;
                req.session.valor_dark = result[0].color;
                req.session.myImg = result[0].img;
                req.session.save();
                if (result.length == 0 || !(Password == aes.decrypt(result[0].password))) {
                    res.redirect("/");
                } else {
                    req.session.var_logging = true;
                    req.session.save();
                    res.redirect("/");
                }
            } else {
                res.redirect("/");
            }
        });
    } else {
        res.redirect("/");
    }
};
const vista_General = (req, res) => {
    if (req.session.var_logging) {
        var datos = {
            myImg_ : req.session.myImg,
            myColor : req.session.valor_dark,
            myID_ : req.session.myID_,
            Nombre_ : req.session.Nombre_,
            Tipo_ : req.session.Tipo_,
            title : "Home",
            layout : "./layout/hoja_01.ejs"
        };
        res.render("./view/1_home.ejs", datos);
    } else {
        res.redirect("/login");
    }
};
const vista_DashBoard = async(req, res) => {
    const mando = "SELECT pez, temperatura, pH_low, pH_up FROM vista_pez WHERE item = ?";
    await DBConnector.queryWithParams(mando, [1])
    .then((result) => {
        if (req.session.var_logging) {
            var datos = {
                myImg_: req.session.myImg,
                myColor: req.session.valor_dark,
                myID_: req.session.myID_,
                Nombre_: req.session.Nombre_,
                Tipo_: req.session.Tipo_,
                title: "DashBoard",
                layout: "./layout/hoja_01.ejs",
                pez: result[0].pez,
                temperatura: result[0].temperatura,
                pH_low: result[0].pH_low,
                pH_up: result[0].pH_up
            }; 
            res.render("./view/2_dashboard.ejs", datos);
        } else {
            res.redirect("/login");
        }
    });
};
const vista_Configuracion = async(req, res) => {
    const mando = "SELECT kp, ki, kd, on_off_temp, on_off_lum, on_off_bom FROM vista_pez WHERE item = ?";
    await DBConnector.queryWithParams(mando, [1])
    .then((result) => {
        if (req.session.var_logging) {
            var datos = {
                myImg_: req.session.myImg,
                myColor: req.session.valor_dark,
                myID_: req.session.myID_,
                Nombre_: req.session.Nombre_,
                Tipo_: req.session.Tipo_,
                title: "Configuración",
                layout: "./layout/hoja_01.ejs",
                OnOff: result[0].on_off_temp,
                Kp: result[0].kp,
                Ki: result[0].ki,
                Kd: result[0].kd,
                OnOffLum: result[0].on_off_lum,
                OnOffBom: result[0].on_off_bom
            };
            res.render("./view/3_configuracion.ejs", datos);
        } else {
            res.redirect("/login");
        }
    });
};
const vista_Ayuda = (req, res) => {
    if (req.session.var_logging) {
        var datos = {
            myImg_: req.session.myImg,
            myColor: req.session.valor_dark,
            myID_: req.session.myID_,
            Nombre_: req.session.Nombre_,
            Tipo_: req.session.Tipo_,
            title: "Ayuda",
            layout: "./layout/hoja_01.ejs"
        };
        res.render("./view/4_ayuda.ejs", datos);
    } else {
        res.redirect("/login");
    }
};
const vista_log_out = (req, res) => {
    if (req.session.var_logging) {
        req.session.Nombre_ = "";
        req.session.Tipo_ = "";
        req.session.var_logging = false;
        req.session.save();
        res.redirect("/");
    }
};
const api_DarkLight = async(req, res) => {
    const mando = "UPDATE usuarios SET color = ? WHERE ID = ?";
    await DBConnector.queryWithParams(mando, [req.params.color, req.params.id]);
    if (req.params.color == "1") {
        req.session.valor_dark = 1;
    } else if(req.params.color == "0") {
        req.session.valor_dark = 0;
    }
    req.session.save();
};
const api_Productos = async(req, res) => {
    const mando = "SELECT pez FROM peces";
    const result = await DBConnector.query(mando);
    res.send(result);
};
const api_all = async(req, res) => {
    const mando = "SELECT temperatura, pH_low, pH_up, luminocidad FROM peces WHERE pez = ?";
    const result = await DBConnector.queryWithParams(mando, [req.params.pez]);
    res.send(result);
};
const api_new_producto = async(req, res) => {
    const mando = "INSERT INTO peces(pez, temperatura, pH_low, pH_up, luminocidad) VALUES(?,?,?,?,?)";
    await DBConnector.queryWithParams(mando, [req.params.v1, req.params.v2, req.params.v3, req.params.v4, req.params.v5]);
    res.send("S");
};
const api_sub_producto = async(req, res) => {
    if (req.params.pro != "Ninguno") {
        const mando = "DELETE FROM peces WHERE pez = ?";
        await DBConnector.queryWithParams(mando, [req.params.pro]);
    }
    res.send("S");
};
const api_vista_pez = async(req, res) => {
    const mando = "UPDATE vista_pez SET pez=?, temperatura=?, pH_low=?, pH_up=?, luminocidad=? WHERE item = 1";
    await DBConnector.queryWithParams(mando, [req.params.v1, req.params.v2, req.params.v3, req.params.v4, req.params.v5]);
    res.send("GG");
};
const api_ON = async(req, res) => {
    const mando = "UPDATE vista_pez SET on_off_temp = ? WHERE item = 1";
    await DBConnector.queryWithParams(mando, ["on"]);
    res.send("GG");
};
const api_OFF = async(req, res) => {
    const mando = "UPDATE vista_pez SET on_off_temp = ? WHERE item = 1";
    await DBConnector.queryWithParams(mando, ["off"]);
    res.send("GG");
};
const api_PID = async(req, res) => {
    const mando = "UPDATE vista_pez SET kp = ?, ki = ?, kd = ? WHERE item = ?";
    await DBConnector.queryWithParams(mando, [req.params.kp, req.params.ki, req.params.kd, 1]);
    res.send("GG");
};
const api_on_lum = async(req, res) => {
    const mando = "UPDATE vista_pez SET on_off_lum = ? WHERE item = 1";
    await DBConnector.queryWithParams(mando, ["on"])
    .then(() => {
        gpiop.write(pin1, true);
        res.send("GG");
    });
};
const api_off_lum = async(req, res) => {
    const mando = "UPDATE vista_pez SET on_off_lum = ? WHERE item = 1";
    await DBConnector.queryWithParams(mando, ["off"])
    .then(() => {
        gpiop.write(pin1, false);
        res.send("GG");
    });
};
const api_on_bom = async(req, res) => {
    const mando = "UPDATE vista_pez SET on_off_bom = ? WHERE item = 1";
    await DBConnector.queryWithParams(mando, ["on"]);
    res.send("GG");
};
const api_off_bom = async(req, res) => {
    const mando = "UPDATE vista_pez SET on_off_bom = ? WHERE item = 1";
    await DBConnector.queryWithParams(mando, ["off"]);
    res.send("GG");
};
const api_hora_comida = async(req, res) => {
    const mando = "UPDATE vista_pez SET minutos = ?, comida = ? WHERE item = ?";
    await DBConnector.queryWithParams(mando, [req.params.hora, req.params.comida, 1]);
    res.send("GG");
};

module.exports = {
    vista_home,
    vista_logging,
    vista_registro,
    click_registro,
    click_autentificar,
    vista_General,
    vista_DashBoard,
    vista_Configuracion,
    vista_Ayuda,
    vista_log_out,
    api_DarkLight,
    api_Productos,
    api_all,
    api_new_producto,
    api_sub_producto,
    api_vista_pez,
    api_ON,
    api_OFF,
    api_PID,
    api_on_lum,
    api_off_lum,
    api_on_bom,
    api_off_bom,
    api_hora_comida
};