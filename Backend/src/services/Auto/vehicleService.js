import * as vehicleRepo from "../../repositories/Auto/vehicleRepository.js";
import { upsertVehicle } from "../../repositories/Auto/vehicleRepository.js";

export const saveVehicles = async (vehicles = []) => {
  const insertedIds = [];
  const updatedIds = [];

  for (const vehicle of vehicles) {
    const id = await upsertVehicle(vehicle);
    if (vehicle.id && !isNaN(Number(vehicle.id)) && Number(vehicle.id) > 0) {
      updatedIds.push(id);
    } else {
      insertedIds.push(id);
    }
  }

  return {
    insertedIds,
    updatedIds,
    allIds: [...insertedIds, ...updatedIds],
  };
};

export const saveDrivers = async (drivers = []) => {
  const insertedIds = [];
  const updatedIds = [];

  for (const driver of drivers) {
    const driverId = await vehicleRepo.upsertDriver(driver);

    if (driver.insuranceCancelled && Array.isArray(driver.reasons)) {
      await vehicleRepo.saveCancellationReasons(driverId, driver.reasons);
    }

    if (driver.id) updatedIds.push(driverId);
    else insertedIds.push(driverId);
  }

  return { insertedIds, updatedIds, allIds: [...insertedIds, ...updatedIds] };
};

export const saveVehicleLinks = async (links = []) => {
  const savedIds = [];
  for (const link of links) {
    const id = await vehicleRepo.upsertVehicleLink(link);
    savedIds.push(id);
  }
  return savedIds;
};


export const saveVehicleDiscount = async (discount) => {
  return await vehicleRepo.upsertVehicleDiscount(discount);
};

export const searchPostalCode = async (search) => {
  if (!search) {
    const error = new Error("Query param 'search' is required");
    error.status = 400;
    throw error;
  }

  const formatted = search.toUpperCase().replace(/\s/g, "");

  if (!/^[A-Z]\d[A-Z]\d[A-Z]\d$/.test(formatted)) {
    const error = new Error("Invalid postal code format (e.g. L6W1A2)");
    error.status = 400;
    throw error;
  }

  return await vehicleRepo.findPostalCode(formatted);
};

export const getFaqs = async () => {
  return await vehicleRepo.getFaqs();
};

export const getDrivers = async (driverIds) => {
  if (driverIds && driverIds.length > 1) {
    return await vehicleRepo.getDriversByIds(driverIds);
  }
  return await vehicleRepo.getDrivers(driverIds);
};

export const getDiscounts = async (discountIds) => {
  if (discountIds && discountIds.length > 0) {
    return await vehicleRepo.getDiscountsByIds(discountIds);
  }
  return await vehicleRepo.getDiscounts();
};

export const getVehicles = async (vehicleIds) => {
  if (vehicleIds && vehicleIds.length > 0) {
    return await vehicleRepo.getVehiclsByIds(vehicleIds);
  }
  return [];
};



export const getVehicleYears = () => vehicleRepo.getVehicleYears();
export const getVehicleMakes = (year) => vehicleRepo.getVehicleMakes(year);
export const getVehicleModels = (year, make) => vehicleRepo.getVehicleModels(year, make);