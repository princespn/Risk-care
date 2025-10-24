import { db } from "../../confiq/db.js";
import { eq, sql, asc, and, inArray } from "drizzle-orm";
import { vehicle_vins, faqs, postalCodes,vehicles, vehicleInfo, driverInfo, cancellationReasons, vehicleDiscount, vehicleLink  } from "../../models/Auto/vehicles.js";



export const upsertVehicle = async (vehicle) => {
  const numericId = Number(vehicle.id);

  if (!isNaN(numericId) && Number.isInteger(numericId) && numericId > 0) {
    const { id, ...updateData } = vehicle;
    await db
      .update(vehicleInfo)
      .set(updateData)
      .where(eq(vehicleInfo.id, numericId));
    return numericId;
  } else {

    const { id, ...insertData } = vehicle;

    const result = await db.insert(vehicleInfo).values(insertData);
   
    return result.insertId;
  }
};

export const upsertDriver = async (driver) => {
  const driverData = {
    ...driver,
    suspension_reasons: JSON.stringify(driver.suspensions || []),
    accidents: JSON.stringify(driver.accidents || []),
    tickets: JSON.stringify(driver.tickets || []),
  };

  const numericId = Number(driver.id);

  if (!isNaN(numericId) && Number.isInteger(numericId) && numericId > 0) {
  
    const { id, ...updateData } = driverData;

    await db
      .update(driverInfo)
      .set(updateData)
      .where(eq(driverInfo.id, numericId));

    return numericId;
  } else {
   
    const { id, ...insertData } = driverData;

    const result = await db.insert(driverInfo).values(insertData);

   
    return result.insertId;
  }
};
export const saveCancellationReasons = async (driverId, reasons = []) => {
  for (const reason of reasons) {
    if (reason.cancellationReason || reason.reason_month || reason.reason_year) {
      await db.insert(cancellationReasons).values({
        driver_id: driverId,
        cancellation_reason: reason.cancellationReason,
        reason_month: reason.reason_month,
        reason_year: reason.reason_year,
        reason_end_month: reason.reason_end_month,
        reason_end_year: reason.reason_end_year,
      });
    }
  }
};

export const upsertVehicleLink = async ({ vehicle_id, driver_id, discount_id = null }) => {
  const existing = await db
    .select({ id: vehicleLink.id })
    .from(vehicleLink)
    .where(
      and(
        eq(vehicleLink.vehicle_id, vehicle_id),
        eq(vehicleLink.driver_id, driver_id),
        eq(vehicleLink.discount_id, discount_id)
      )
    );

  if (existing.length === 0) {
    const [inserted] = await db
      .insert(vehicleLink)
      .values({ vehicle_id, driver_id, discount_id })
      .returning({ id: vehicleLink.id });
    return inserted.id;
  }

  return existing[0].id;
};

export const upsertVehicleDiscount = async (discount) => {
  const numericId = Number(discount.id);

  if (!isNaN(numericId) && Number.isInteger(numericId) && numericId > 0) {
   
    const { id, ...updateData } = discount;

    await db
      .update(vehicleDiscount) 
      .set(updateData)
      .where(eq(vehicleDiscount.id, numericId));

    return numericId;
  } else {
   
    const { id, ...insertData } = discount;

    const result = await db.insert(vehicleDiscount).values(insertData);

   
    return result.insertId;
  }
};


export const findPostalCode = async (search) => {
  const fsa = search.slice(0, 3);
  const lduFull = search.slice(3);
  const ldu2 = search.slice(3, 5);
  const ldu1 = search.slice(3, 4);

  let matchedRow = null;

  let rows = await db
    .select({
      CITY: postalCodes.CITY,
      postal_code: sql`CONCAT(${postalCodes.FSA}, ' ', ${postalCodes.LDU})`,
      GCPCID: postalCodes.GCPCID,
    })
    .from(postalCodes)
    .where(sql`REPLACE(CONCAT(${postalCodes.FSA}, ${postalCodes.LDU}), ' ', '') = ${search}`)
    .orderBy(asc(postalCodes.GCPCID))
    .limit(1);

  if (rows.length) matchedRow = rows[0];

  if (!matchedRow) {
    rows = await db
      .select({
        CITY: postalCodes.CITY,
        postal_code: sql`CONCAT(${postalCodes.FSA}, ' ', ${postalCodes.LDU})`,
        GCPCID: postalCodes.GCPCID,
      })
      .from(postalCodes)
      .where(sql`${postalCodes.FSA} = ${fsa} AND ${postalCodes.LDU} LIKE ${ldu2 + "%"}`)
      .orderBy(asc(postalCodes.GCPCID))
      .limit(1);

    if (rows.length) matchedRow = rows[0];
  }


  if (!matchedRow) {
    rows = await db
      .select({
        CITY: postalCodes.CITY,
        postal_code: sql`CONCAT(${postalCodes.FSA}, ' ', ${postalCodes.LDU})`,
        GCPCID: postalCodes.GCPCID,
      })
      .from(postalCodes)
      .where(sql`${postalCodes.FSA} = ${fsa} AND ${postalCodes.LDU} LIKE ${ldu1 + "%"}`)
      .orderBy(asc(postalCodes.GCPCID))
      .limit(1);

    if (rows.length) matchedRow = rows[0];
  }

  if (!matchedRow) {
    rows = await db
      .select({
        CITY: postalCodes.CITY,
        postal_code: sql`CONCAT(${postalCodes.FSA}, ' ', ${postalCodes.LDU})`,
        GCPCID: postalCodes.GCPCID,
      })
      .from(postalCodes)
      .where(eq(postalCodes.FSA, fsa))
      .orderBy(asc(postalCodes.GCPCID))
      .limit(5);

    if (rows.length) matchedRow = rows[0];
  }

  if (!matchedRow) {
    const error = new Error("Postal code / FSA not found");
    error.status = 404;
    throw error;
  }

  return matchedRow;
};

export const getFaqs = async () => {
  return db.select().from(faqs);
};

export const getDrivers = async () => {
  return db.select().from(driverInfo);
};

export const getDriversByIds = async (ids) => {
  return db.select().from(driverInfo).where(inArray(driverInfo.id, ids));
};



export const getDiscounts = async () => {
  return db.select().from(vehicleDiscount);
};

export const getDiscountsByIds = async (ids) => {
  return db.select().from(vehicleDiscount).where(inArray(vehicleDiscount.id, ids));
};


export const getVehicleYears = async () => {
  const rows = await db.selectDistinct({ year: vehicles.MODEL_YEAR })
    .from(vehicles)
    .orderBy(vehicles.MODEL_YEAR, "DESC");
  return rows.map(r => r.year);
};

export const getVehicleMakes = async (year) => {
  const rows = await db.selectDistinct({ make: vehicles.MAKE })
    .from(vehicles)
    .where(eq(vehicles.MODEL_YEAR, year))
    .orderBy(vehicles.MAKE);
  return rows.map(r => r.make);
};



export const getVehicleModels = async (year, make) => {
  const rows = await db
    .selectDistinct({
      MODEL: vehicles.MODEL,
      EXT_VICC: vehicles.EXT_VICC,
      VICC_CODE: vehicles.VICC_CODE,
      vin: vehicle_vins.VIN,
      MULT_VIN: vehicle_vins.MULT_VIN,
    })
    .from(vehicles)
    .leftJoin(
      vehicle_vins,
      and(
        eq(vehicles.EXT_VICC, vehicle_vins.EXT_VICC),
        eq(vehicles.MODEL_YEAR, vehicle_vins.MODEL_YEAR)
      )
    )
    .where(and(eq(vehicles.MODEL_YEAR, year), eq(vehicles.MAKE, make)))
    .orderBy(vehicles.MODEL);

  return rows;
};



export const getVehiclsByIds = async (ids) => {
  return db.select().from(vehicleInfo).where(inArray(vehicleInfo.id, ids));
};

export const getVehicles = async () => {
  return db.select().from(vehicleInfo);
};