const express = require("express");

const {
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
} = require("../controllers/PageControllers.js");

const router = express.Router();

router.get("/", vista_home);

router.get("/login", vista_logging);
router.get("/registro", vista_registro);

router.post("/registrar", click_registro);
router.post("/autentificar", click_autentificar);

router.get("/Home", vista_General);
router.get("/DashBoard", vista_DashBoard);
router.get("/Configuracion", vista_Configuracion);
router.get("/Ayuda", vista_Ayuda)
router.get("/log_out", vista_log_out);

router.post("/api/update/dark-light/:id/:color", api_DarkLight);

router.get("/api/Productos", api_Productos);
router.post("/api/all/:pez", api_all);
router.post("/api/Productos/update/:v1/:v2/:v3/:v4/:v5", api_new_producto);
router.post("/api/Productos/subtract/:pro", api_sub_producto);
router.post("/api/Vista_pez/:v1/:v2/:v3/:v4/:v5", api_vista_pez);

router.get("/api/ON", api_ON);
router.get("/api/OFF", api_OFF);

router.post("/api/PID/:kp/:ki/:kd", api_PID);

router.get("/api/ON/luminocidad", api_on_lum);
router.get("/api/OFF/luminocidad", api_off_lum);

router.get("/api/ON/bomba", api_on_bom);
router.get("/api/OFF/bomba", api_off_bom);

router.post("/api/Hora-Comida/:hora/:comida", api_hora_comida);

module.exports = {router: router};