import express from "express";
import bodyParser from "body-parser";
import PDFDocument from 'pdfkit';
import cors from 'cors';
import * as dotenv from 'dotenv';
import routerPath from './router';

dotenv.config();
const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.get("/", (req, res, next) => {
//  res.json({ message: "from index api" });
// });

// app.get('/pdf',(req,res) =>{
//   const doc = new PDFDocument();
//   doc.pipe (res)
//   doc
//   .fontSize(25)
//   .text('Here is some vector graphics...', 100, 100);
//   doc.end();
// })
app.use('/',routerPath);

app.listen(process.env.PORT, () => {
  console.log(`Server is running`);
});