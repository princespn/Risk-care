import express from "express";
import { body } from "express-validator";
import {getDriversController, getVehiclesController, getVehicleYearsController, getVehicleMakesController, getVehicleModelsController, getFaqsController, searchPostalCodeController, saveVehiclesController, saveDriversController, saveVehicleDiscountController , saveVehicleLinksController} from "../../controllers/Auto/vehicleController.js";

const router = express.Router();

router.post(
  "/vehiclesave",
  [
    body().isArray().withMessage("Request body should be an array"),
    body("*.vehicle_total").notEmpty().withMessage("Vehicle Number is required"),
    body("*.vehicle_year").notEmpty().withMessage("Vehicle Year is required"),
    body("*.vehicle_model").notEmpty().withMessage("Vehicle Model is required"),
  ],
  saveVehiclesController
);

router.post(
  "/driversave",
  [
    body().isArray().withMessage("Request body should be an array"),
    body("*.first_name").notEmpty().withMessage("First Name is required"),
    body("*.last_name").notEmpty().withMessage("Last Name is required"),
    body("*.marital_status").notEmpty().withMessage("Marital status is required"),
  ],
  saveDriversController
);



router.post(
  "/discountsave",
  [
    body("home_owner_type").notEmpty(),
    body("tenant_insurance").notEmpty(),
    body("caa_member").notEmpty(),
    body("telematics_discount").notEmpty(),
    body("group_discount").notEmpty(),
    body("email").isEmail(),
    body("phone").notEmpty(),
  ],
  saveVehicleDiscountController
);

router.post("/links_vehicle", saveVehicleLinksController);
router.get("/postal_codes", searchPostalCodeController);
router.get("/getfaqs", getFaqsController);
router.get("/vehicles_years", getVehicleYearsController);
router.get("/vehicles_makes", getVehicleMakesController);
router.get("/vehicles_models", getVehicleModelsController);
router.post("/get_vehicles", getVehiclesController);
router.get("/get_drivers", getDriversController);
//router.get("/get_discount", getVehiclesController);


export default router;



