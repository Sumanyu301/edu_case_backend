import express from "express";
import cors from "cors";
import addSchool from "./routes/addSchool.js";
import bodyParser from "body-parser";
import listSchools from "./routes/listSchools.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use(addSchool);
app.use(listSchools);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});