import { validationResult } from "express-validator";
import * as vehicleService from "../../services/Auto/vehicleService.js";
import { saveVehicles } from "../../services/Auto/vehicleService.js";


export const saveVehiclesController = async (req, res) => {
  const vehicles = req.body;
  if (!Array.isArray(vehicles)) {
    return res.status(400).json({ error: "Vehicles should be an array" });
  }

  try {
    const { insertedIds, updatedIds, allIds } = await saveVehicles(vehicles);

    res.status(200).json({
      message: "Vehicle data processed successfully",
      insertedCount: insertedIds.length,
      updatedCount: updatedIds.length,
      vehicleIds: allIds, // <-- this preserves the format you wanted
    });
  } catch (error) {
    console.error("Error in saving vehicles:", error);
    res.status(500).json({ error: "Server error" });
  }
};


export const saveDriversController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const result = await vehicleService.saveDrivers(req.body);
    res.json({
      message: "Driver data processed successfully",
      ...result,
    });
  } catch (err) {
    console.error("Driver Save Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};



export const saveVehicleLinksController = async (req, res) => {
  const { links } = req.body;
  if (!Array.isArray(links) || links.length === 0) {
    return res.status(400).json({ message: "Links array is required" });
  }

  try {
    const savedIds = await vehicleService.saveVehicleLinks(links);
    res.json({ message: "Links saved successfully", savedIds });
  } catch (err) {
    console.error("Vehicle Link Save Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const saveVehicleDiscountController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const id = await vehicleService.saveVehicleDiscount(req.body);
    res.json({ message: "Discount saved successfully", discountId: id });
  } catch (err) {
    console.error("Discount Save Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const searchPostalCodeController = async (req, res) => {
  try {
    const search = req.query.search || "";
    const result = await vehicleService.searchPostalCode(search);
    return res.json([result]); // keep array format
  } catch (err) {
    console.error("Postal code search error:", err);
    return res
      .status(err.status || 500)
      .json({ error: err.message || "Server error" });
  }
};


export const getFaqsController = async (req, res) => {
  try {
    const faqs = await vehicleService.getFaqs();
    res.json(faqs);
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getDriversController = async (req, res) => {
  try {
    const { driverIds } = req.body;
    const drivers = await vehicleService.getDrivers(driverIds);
    res.json({ drivers });
  } catch (err) {
    console.error("Error fetching drivers:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getVehiclesController = async (req, res) => {
  try {
    const { vehicleIds } = req.body;
    const vehicles = await vehicleService.getVehicles(vehicleIds);
    res.json({ vehicles });
  } catch (err) {
    console.error("Error fetching vehicles:", err);
    res.status(err.status || 500).json({ error: err.message || "Server error" });
  }
};

export const getDiscountsController = async (req, res) => {
  try {
    const { discountIds } = req.body;
    const discounts = await vehicleService.getDiscounts(discountIds);
    res.json({ discounts });
  } catch (err) {
    console.error("Error fetching discounts:", err);
    res.status(500).json({ error: "Server error" });
  }
};

export const getVehicleYearsController = async (req, res) => {
  try {
    const years = await vehicleService.getVehicleYears();
    res.json({ years });
  } catch (err) {
    console.error("Error fetching vehicle years:", err);
    res.status(err.status || 500).json({ error: err.message || "Server error" });
  }
};

export const getVehicleMakesController = async (req, res) => {
  try {
    const { year } = req.query;
    const makes = await vehicleService.getVehicleMakes(year);
    res.json({ makes });
  } catch (err) {
    console.error("Error fetching vehicle makes:", err);
    res.status(err.status || 500).json({ error: err.message || "Server error" });
  }
};


export const getVehicleModelsController = async (req, res) => {
  try {
    const { year, make } = req.query;
    const models = await vehicleService.getVehicleModels(year, make);
    res.json({ models });
  } catch (err) {
    console.error("Error fetching vehicle models:", err);
    res.status(err.status || 500).json({ error: err.message || "Server error" });
  }
};