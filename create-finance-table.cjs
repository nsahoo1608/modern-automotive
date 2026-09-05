require("dotenv").config({ path: ".env.local" });
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

async function main() {
  await sql`
    CREATE TABLE IF NOT EXISTS finance_applications (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      mobile TEXT NOT NULL,
      email TEXT,
      city TEXT,
      state TEXT,
      category TEXT,
      brand TEXT,
      model TEXT,
      condition TEXT,
      price NUMERIC,
      loan NUMERIC,
      message TEXT,
      address TEXT,
      village TEXT,
      ward TEXT,
      police_station TEXT,
      panchayat TEXT,
      nac TEXT,
      municipality TEXT,
      district TEXT,
      pincode TEXT,
      latitude DOUBLE PRECISION,
      longitude DOUBLE PRECISION,
      created_at TIMESTAMPTZ DEFAULT NOW()
    )
  `;

  console.log("finance_applications table created successfully");
}

main().catch(console.error);
