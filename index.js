import express from "express";
import urlRoute from "./routes/url.js";
import URL from "./models/url.js";
import connectToMongoDB from "./connect.js";
const app = express();

const PORT = 8001;

app.use(express.json())
app.use("/url", urlRoute);

app.get('/:shortID', async (req, res) => {
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
  console.log(`Server Started at PORT: ${PORT} \n http://localhost/${PORT}`)
})