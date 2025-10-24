import { mysqlTable, serial, varchar, int, json } from "drizzle-orm/mysql-core";
import { createdAt, updatedAt } from "../../confiq/common.js";

export const vehicleInfo = mysqlTable("vehicle_info", {
  id: serial("id").primaryKey(),
  vehicle_total: varchar("vehicle_total", { length: 50 }).notNull(),
  vehicle_year: int("vehicle_year").notNull(),
  vehicle_make: varchar("vehicle_make", { length: 100 }),
  vehicle_model: varchar("vehicle_model", { length: 100 }),
  vehicle_location: varchar("vehicle_location", { length: 255 }),
  vehicle_location_index: varchar("vehicle_location_index", { length: 20 }),
  vehicle_location_city: varchar("vehicle_location_city", { length: 100 }),
  vehicle_driver_num: int("vehicle_driver_num"),
  primary_use: varchar("primary_use", { length: 50 }),
  is_leased: int("is_leased"),
  annual_distance_day: int("annual_distance_day"),
  annual_distance_year: int("annual_distance_year"),
  vehicle_parkLocation: varchar("vehicle_parkLocation", { length: 50 }),
  acquired_month: int("acquired_month"),
  acquired_year: int("acquired_year"),
  comprehensive_coverage: int("comprehensive_coverage"),
  collision_coverage: int("collision_coverage"),
  vicc_code: varchar("vicc_code", { length: 50 }),
  ext_vicc: varchar("ext_vicc", { length: 50 }),
  ...createdAt,
  ...updatedAt,
});

export const driverInfo = mysqlTable("driver_info", {
  id: serial("id").primaryKey(),
  first_name: varchar("first_name", { length: 255 }).notNull(),
  last_name: varchar("last_name", { length: 255 }).notNull(),
  marital_status: varchar("marital_status", { length: 50 }).notNull(),
  occupational_status: varchar("occupational_status", { length: 50 }),
  dob_month: int("dob_month"),
  dob_day: int("dob_day"),
  dob_year: int("dob_year"),
  gender: varchar("gender", { length: 10 }),
  license_class: varchar("license_class", { length: 10 }),
  age_numb: int("age_numb"),
  full_license_month: int("full_license_month"),
  full_license_year: int("full_license_year"),
  has_foreign_license: int("has_foreign_license"),
  first_insured_year: int("first_insured_year"),
  time_with_insurer: int("time_with_insurer"),
  num_suspensions: int("num_suspensions"),
  suspension_reasons: json("suspension_reasons"),
  licence_suspension_date: varchar("licence_suspension_date", { length: 50 }),
  licence_suspension_year: int("licence_suspension_year"),
  num_accidents: int("num_accidents"),
  accidents: json("accidents"),
  num_tickets: int("num_tickets"),
  tickets: json("tickets"),
  policy_start_month: int("policy_start_month"),
  policy_start_year: int("policy_start_year"),
  ...createdAt,
  ...updatedAt,
});



export const cancellationReasons = mysqlTable("cancellation_reasons", {
  id: serial("id").primaryKey(),
  driver_id: int("driver_id").notNull(),
  cancellation_reason: varchar("cancellation_reason", { length: 255 }),
  reason_month: int("reason_month"),
  reason_year: int("reason_year"),
  reason_end_month: int("reason_end_month"),
  reason_end_year: int("reason_end_year"),
  ...createdAt,
  ...updatedAt,
});


export const vehicleDiscount = mysqlTable("vehicle_discount", {
  id: serial("id").primaryKey(),
  applied: varchar("applied", { length: 200 }).default(""),
  telematics_discount: varchar("telematics_discount", { length: 200 }).notNull(),
  group_discount: varchar("group_discount", { length: 200 }).default("0"),
  home_owner_type: varchar("home_owner_type", { length: 200 }).notNull(),
  tenant_insurance: varchar("tenant_insurance", { length: 100 }).notNull(),
  caa_member: varchar("caa_member", { length: 200 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 200 }).notNull(),
  discount_code: varchar("discount_code", { length: 200 }).default(""),
  ...createdAt,
  ...updatedAt,
});

export const vehicleLink = mysqlTable("vehicle_link", {
  id: serial("id").primaryKey(),
  vehicle_id: varchar("vehicle_id", { length: 50 }).notNull(),
  driver_id: varchar("driver_id", { length: 50 }).notNull(),
  discount_id: varchar("discount_id", { length: 50 }).default(null),
  ...createdAt,
  ...updatedAt,
});

export const postalCodes = mysqlTable("postal_codes", {
  GCPCID: int("GCPCID").primaryKey(),
  CITY: varchar("CITY", { length: 35 }).notNull(),
  FSA: varchar("FSA", { length: 3 }).notNull(),
  LDU: varchar("LDU", { length: 3 }).notNull(),
  GCNID: int("GCNID"),
});

export const faqs = mysqlTable("faqs", {
  id: int("id").primaryKey().autoincrement(),
  question: varchar("question", { length: 255 }).notNull(),
  answer: varchar("answer", {length: 255}).notNull(),
});

export const vehicles = mysqlTable("vehicles", {
  MODEL_YEAR: int("MODEL_YEAR").notNull(),
  EXT_VICC: varchar("EXT_VICC", { length: 6 }).notNull(),
  VICC_CODE: varchar("VICC_CODE", { length: 10 }),
  MAKE: varchar("MAKE", { length: 50 }),
  MODEL: varchar("MODEL", { length: 100 }),
});

export const vehicle_vins = mysqlTable("vehicle_vins", {
  RecNo: int("RecNo").notNull(),
  VIN: varchar("VIN", { length: 50 }),
  VICC_CODE: varchar("VICC_CODE", { length: 100 }),
  EXT_VICC: varchar("EXT_VICC", { length: 50 }).notNull(),
  MODEL_YEAR: int("MODEL_YEAR").notNull(),
  MULT_VIN: int("MULT_VIN").notNull(),
});