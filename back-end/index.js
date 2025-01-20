const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();

app.use(express.json()); // For parsing JSON request body
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/api', (req, res) => {
  res.send('Welcome to my API!');
});

app.post('/get-token',(req,res)=>{
    var identity = req.body.identity;
    var clientId = req.body.clientId;
    var clientSecret =req.body.clientSecret;
    var isAnonymous = req.body.isAnonymous || false;
    var aud = req.body.aud || "https://idproxy.kore.com/authorize";
    var options = {
      "iat": new Date().getTime(),
      "exp": new Date(new Date().getTime() + 24 * 60 * 60 * 1000).getTime(),
      "aud": aud,
      "iss": clientId,
      "sub": identity,
      "isAnonymous": isAnonymous
    }
      var token = jwt.sign(options, clientSecret);
    res.send({"jwt":token});
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
