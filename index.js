const { Configuration, OpenAIApi } = require("openai");
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const configuration = new Configuration({
    organization: "org-Ea1RTcFD9pcogOFa8oHfKHg1",
    apiKey: "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",
});
const openai = new OpenAIApi(configuration);

const app = express()
app.use(bodyParser.json())
app.use(cors())

const port = 3080

app.post('/',async (req, res) => {
    const { message, currentModel } = req.body;
    console.log(message, "message")
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${message}`,
        max_tokens: 100,
        temperature: 0.5,
    });
    res.json({
        message: response.data.choices[0].text,
    })
})



app.get('/models',async (req, res) => {

    const response = await openai.listEngines();
    console.log(response.data.data)
    res.json({
        models: response.data.data
    })
})

app.listen(port, () => {
    console.log(`example app listening at http://localhost:${port}`)
});