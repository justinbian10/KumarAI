import {GetSecretValueCommand, SecretsManagerClient} from "@aws-sdk/client-secrets-manager";
import {Configuration, OpenAIApi} from "openai";

const SECRET_ID = "prod/KumarAI/openAIKey";
const REGION = "us-east-1";
const API_KEY = 'openAIKey'

const client = new SecretsManagerClient({ region: REGION });
const input = {
    SecretId: SECRET_ID,
};
const command = new GetSecretValueCommand(input);
const response = await client.send(command);
const openAIAPIKey = JSON.parse(response.SecretString)[API_KEY]

const openai = new OpenAIApi(new Configuration({
    apiKey: openAIAPIKey
}))

export default openai;