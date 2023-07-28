import express from 'express';
import openAIClient from "./openAIClient.js";

const QUERY = 'query';

const app = express();
const port = process.env.PORT || 80;
app.use(express.json())

app.post('/query', async function (req, res) {
    const query = req.body[QUERY]
    const response = await openAIClient.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: query}]
    });
    res.send(response.data.choices[0].message.content)
});
app.listen(port, function () {
    console.log('Example app listening on port' + port);
});