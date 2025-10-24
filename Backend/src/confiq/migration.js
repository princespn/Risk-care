import { db } from './db.js'; 
import { vehicleInfo, driverInfo } from './schema.js';

export async function migrate() {

  await db.run(`
    CREATE TABLE IF NOT EXISTS vehicle_info (
      id INT AUTO_INCREMENT PRIMARY KEY,
      vehicle_total VARCHAR(100) NOT NULL,
      vehicle_location VARCHAR(400) NOT NULL,
      vehicle_location_index VARCHAR(100),
      vehicle_location_city VARCHAR(100),
      vehicle_driver_num VARCHAR(100) NOT NULL,
      primary_use VARCHAR(100) NOT NULL,
      vehicle_make VARCHAR(100) NOT NULL,
      vehicle_year INT NOT NULL,
      vicc_code VARCHAR(50) NOT NULL,
      ext_vicc VARCHAR(50) NOT NULL,
      vehicle_model VARCHAR(100) NOT NULL,
      is_leased VARCHAR(50) NOT NULL DEFAULT '0',
      collision_coverage VARCHAR(100) NOT NULL,
      comprehensive_coverage VARCHAR(100) NOT NULL,
      annual_distance_day VARCHAR(100) NOT NULL,
      annual_distance_year VARCHAR(100) NOT NULL,
      acquired_year VARCHAR(100) NOT NULL,
      acquired_month VARCHAR(100) NOT NULL,
      vehicle_parkLocation VARCHAR(100) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `);

 
  await db.run(`
    CREATE TABLE IF NOT EXISTS driver_info (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100) NOT NULL,
      last_name VARCHAR(100) NOT NULL,
      marital_status VARCHAR(100) NOT NULL,
      occupational_status VARCHAR(100) NOT NULL,
      dob_month VARCHAR(100) NOT NULL,
      dob_day VARCHAR(100) NOT NULL,
      dob_year VARCHAR(100) NOT NULL,
      gender VARCHAR(100) NOT NULL,
      license_class VARCHAR(100) NOT NULL,
      age_numb VARCHAR(100) NOT NULL,
      full_license_month VARCHAR(100) NOT NULL,
      full_license_year VARCHAR(100) NOT NULL,
      has_foreign_license VARCHAR(100) NOT NULL,
      first_insured_year VARCHAR(100) NOT NULL,
      time_with_insurer VARCHAR(100) NOT NULL,
      policy_start_month VARCHAR(100) NOT NULL,
      policy_start_year VARCHAR(100) NOT NULL,
      num_accidents INT DEFAULT 0,
      accidents LONGTEXT,
      num_tickets INT DEFAULT 0,
      tickets LONGTEXT,
      num_suspensions INT DEFAULT 0,
      suspension_reasons VARCHAR(100),
      licence_suspension_date VARCHAR(50),
      licence_suspension_year VARCHAR(50),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL
    );
  `);

  console.log('Migration completed: vehicle_info & driver_info tables created.');
}

// Run migration if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  migrate().catch(console.error);
}
