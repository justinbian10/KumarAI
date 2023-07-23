const express = require('express');
const app = express();
const port = process.env.PORT || 80;

app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(port, function () {
    console.log('Example app listening on port 80!');
});