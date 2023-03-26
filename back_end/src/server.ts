import { app } from "./app";
import { AppDataSource } from "./data-source";

const port = 8000;

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source initialized!");
        app.listen(port, () => console.log(`Api running on http://localhost:${port}`));
    })
    .catch((err) => console.error("Error during Data Source initialization", err));
