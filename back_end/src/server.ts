import { app } from "./app";
import { AppDataSource } from "./data-source";
import "dotenv/config";

const PORT = process.env.PORT || 8000;

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source initialized!");
    app.listen(PORT, () =>
      console.log(`Api running on http://localhost:${PORT}`)
    );
  })
  .catch((err) =>
    console.error("Error during Data Source initialization", err)
  );
