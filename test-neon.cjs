const { neon } = require("@neondatabase/serverless");

async function test() {
  try {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error("DATABASE_URL is missing");

    const sql = neon(url);
    const result = await sql`SELECT current_database() AS database, version() AS version`;

    console.log("NEON CONNECTION: SUCCESS");
    console.log("DATABASE:", result[0].database);
    console.log("POSTGRES:", result[0].version.split(" ").slice(0, 2).join(" "));
  } catch (error) {
    console.error("NEON CONNECTION: FAILED");
    console.error(error.message);
    process.exit(1);
  }
}

test();
