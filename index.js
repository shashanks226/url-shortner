import express from "express";
import path from "path";
import URL from "./models/url.js";
import connectToMongoDB from "./connect.js";

import urlRoute from "./routes/url.js";
import staticRoute from "./routes/staticRouter.js";
import userRoute from "./routes/user.js"

const app = express();

const PORT = 8001;


app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.static("public"));


app.use(express.json());
app.use(express.urlencoded({extended: false})); 

app.use("/url", urlRoute);
app.use("/user", userRoute);
app.use("/", staticRoute);



// ejs, pug, handlebars etc. (Templeting engine)  works as server side rendering

// Server Side rendering

// app.get('/test', async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.end(`
//     <html>
//       <head> </head>
//       <body>
//         <ol>
//         ${allUrls.map(url => `<li>${url.shortId} - ${url.redirectURL} - Total Visit = ${url.visitHistory.length} </li>`)}.join('')
//         </ol>
        
//       </body>
//     </html>
//     `);
// });

// alternate way

// app.get('/test', async (req, res) => {
//   const allUrls = await URL.find({});
//   return res.render('home', {
//     urls: allUrls,
//   });

// });




app.use("/url", urlRoute);




app.get('/url/:shortID', async (req, res) => {
  const shortId = req.params.shortID;
  const entry = await URL.findOneAndUpdate({
    shortId
  }, 
  {
    $push: {
      visitHistory: {
        timestamp: Date.now(),
      },
    }
  });
  res.redirect(entry.redirectURL)
})


connectToMongoDB('mongodb://localhost:27017/short-url').then(() => { console.log("MongoDB connected.") });

app.listen(PORT, () => {
  console.log(`Server Started at PORT: ${PORT} \n http://localhost:${PORT}`)
})