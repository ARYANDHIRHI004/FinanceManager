import app from "./app.js";
import { enviroment } from "./constents.js";
import connectDB from "./db/db.js";

const PORT = enviroment.PORT || 4000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
  });
});
