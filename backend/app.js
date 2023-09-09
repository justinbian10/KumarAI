import express from 'express';
import openAIClient from "./openAIClient.js";
import cors from 'cors';
import serverless from 'serverless-http';

const QUERY = 'query';


const app = express();
const port = process.env.PORT || 80;
const corsOptions = {
    origin: ['https://handkai-50fa3.web.app', 'http://localhost:3000'],
    optionsSuccessStatus: 200
}
app.use(express.json())
app.use(cors(corsOptions));

app.post('/query', async function (req, res) {
    const query = req.body[QUERY]
    console.log('before')
    const response = await openAIClient.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: query}]
    });
    console.log('after')
    res.send(response.data.choices[0].message.content);

});
/*
app.listen(port, function () {
    console.log('Example app listening on port' + port);
});
*/

export const handler = serverless(app);