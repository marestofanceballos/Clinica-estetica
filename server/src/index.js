import "dotenv/config";
import app from "./app.js";
import { connectDB } from "./lib/db.js";

const port = process.env.PORT || 4000;

async function main() {
  await connectDB();
  app.listen(port, () => {
    console.log(`API escuchando en http://localhost:${port}`);
  });
}

main().catch((err) => {
  console.error("No se pudo iniciar el servidor:", err.message);
  process.exit(1);
});
