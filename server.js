import express from "express";
import bodyParser from "body-parser";
import fetch from "node-fetch";

const app = express();
app.use(bodyParser.json());

const API_KEY = "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";

app.post("/corrigir", async (req, res) => {
  const { json } = req.body;

  const prompt = `
Você é um especialista em JSON.

1. Corrija COMPLETAMENTE o JSON abaixo
2. Retorne JSON válido
3. Explique o erro encontrado

Formato de resposta:
{
  "corrigido": {...},
  "explicacao": "texto"
}

JSON:
${json}
`;

  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-5",
      input: prompt
    })
  });

  const data = await response.json();

  try {
    const text = data.output[0].content[0].text;
    res.send(JSON.parse(text));
  } catch {
    res.send({ erro: "Falha ao processar resposta da IA" });
  }
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});
