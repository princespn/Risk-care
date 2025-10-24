import { mysqlTable, serial, varchar, int, longtext } from 'drizzle-orm/mysql-core';
import { timestamps } from './common.js';


export const vehicleInfo = mysqlTable('vehicle_info', {
  id: serial('id').primaryKey(),
  vehicle_total: varchar('vehicle_total', { length: 100 }).notNull(),
  vehicle_location: varchar('vehicle_location', { length: 400 }).notNull(),
  vehicle_location_index: varchar('vehicle_location_index', { length: 100 }),
  vehicle_location_city: varchar('vehicle_location_city', { length: 100 }),
  vehicle_driver_num: varchar('vehicle_driver_num', { length: 100 }).notNull(),
  primary_use: varchar('primary_use', { length: 100 }).notNull(),
  vehicle_make: varchar('vehicle_make', { length: 100 }).notNull(),
  vehicle_year: int('vehicle_year').notNull(),
  vicc_code: varchar('vicc_code', { length: 50 }).notNull(),
  ext_vicc: varchar('ext_vicc', { length: 50 }).notNull(),
  vin_number: varchar('vin_number', { length: 50 }).notNull(),
  vehicle_model: varchar('vehicle_model', { length: 100 }).notNull(),
  is_leased: varchar('is_leased', { length: 50 }).notNull().default('0'),
  collision_coverage: varchar('collision_coverage', { length: 100 }).notNull(),
  comprehensive_coverage: varchar('comprehensive_coverage', { length: 100 }).notNull(),
  annual_distance_day: varchar('annual_distance_day', { length: 100 }).notNull(),
  annual_distance_year: varchar('annual_distance_year', { length: 100 }).notNull(),
  acquired_year: varchar('acquired_year', { length: 100 }).notNull(),
  acquired_month: varchar('acquired_month', { length: 100 }).notNull(),
  vehicle_parkLocation: varchar('vehicle_parkLocation', { length: 100 }).notNull(),

 
  ...timestamps,
});


export const driverInfo = mysqlTable('driver_info', {
  id: serial('id').primaryKey(),
  first_name: varchar('first_name', { length: 100 }).notNull(),
  last_name: varchar('last_name', { length: 100 }).notNull(),
  marital_status: varchar('marital_status', { length: 100 }).notNull(),
  occupational_status: varchar('occupational_status', { length: 100 }).notNull(),
  dob_month: varchar('dob_month', { length: 100 }).notNull(),
  dob_day: varchar('dob_day', { length: 100 }).notNull(),
  dob_year: varchar('dob_year', { length: 100 }).notNull(),
  gender: varchar('gender', { length: 100 }).notNull(),
  license_class: varchar('license_class', { length: 100 }).notNull(),
  age_numb: varchar('age_numb', { length: 100 }).notNull(),
  full_license_month: varchar('full_license_month', { length: 100 }).notNull(),
  full_license_year: varchar('full_license_year', { length: 100 }).notNull(),
  has_foreign_license: varchar('has_foreign_license', { length: 100 }).notNull(),
  first_insured_year: varchar('first_insured_year', { length: 100 }).notNull(),
  time_with_insurer: varchar('time_with_insurer', { length: 100 }).notNull(),
  policy_start_month: varchar('policy_start_month', { length: 100 }).notNull(),
  policy_start_year: varchar('policy_start_year', { length: 100 }).notNull(),
  num_accidents: int('num_accidents').default(0),
  accidents: longtext('accidents'),
  num_tickets: int('num_tickets').default(0),
  tickets: longtext('tickets'),
  num_suspensions: int('num_suspensions').default(0),
  suspension_reasons: varchar('suspension_reasons', { length: 100 }),
  licence_suspension_date: varchar('licence_suspension_date', { length: 50 }),
  licence_suspension_year: varchar('licence_suspension_year', { length: 50 }),

 
  ...timestamps,
});

export const vehicle_vins = mysqlTable("vehicle_vins", {
  RecNo: int("RecNo").notNull(),
  VIN: varchar("VIN", { length: 50 }),
  VICC_CODE: varchar("VICC_CODE", { length: 100 }),
  EXT_VICC: varchar("EXT_VICC", { length: 50 }).notNull(),
  MODEL_YEAR: int("MODEL_YEAR").notNull(),
  MULT_VIN: tinyint("MULT_VIN"),
});