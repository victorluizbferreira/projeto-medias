const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'html')));

app.post('/resultado', (req, res) => {
  const nome = req.body.nome;
  const nota1 = parseFloat(req.body.nota1);
  const nota2 = parseFloat(req.body.nota2);

  const media = (nota1 + nota2) / 2;

  let situacao = '';
  if (media >= 6) {
    situacao = 'Aprovado';
  } else if (media >= 2) {
    situacao = 'Exame Final';
  } else {
    situacao = 'Reprovado';
  }

res.send(`
  <html>
    <head>
      <meta charset="UTF-8" />
      <title>Resultado</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f4f0fa;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          background: #fff;
          padding: 30px 40px;
          border-radius: 12px;
          box-shadow: 0 4px 15px rgba(128, 0, 128, 0.25);
          width: 350px;
          text-align: center;
        }
        h2 {
          color: #5a2d82;
          margin-bottom: 24px;
        }
        p {
          font-size: 1.1rem;
          margin: 8px 0;
          color: #4b2c6f;
        }
        .aprovado {
          color: green;
          font-weight: 700;
        }
        .exame {
          color: orange;
          font-weight: 700;
        }
        .reprovado {
          color: red;
          font-weight: 700;
        }
        a {
          display: inline-block;
          margin-top: 24px;
          text-decoration: none;
          color: #7a4ea0;
          font-weight: 700;
          border: 3px solid #7a4ea0;
          padding: 8px 18px;
          border-radius: 14px;
          transition: background-color 0.3s ease, color 0.3s ease;
        }
        a:hover {
          background-color: #7a4ea0;
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h2>Resultado do Aluno</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Nota 1:</strong> ${nota1}</p>
        <p><strong>Nota 2:</strong> ${nota2}</p>
        <p><strong>Média:</strong> ${media.toFixed(2)}</p>
        <p><strong>Situação:</strong> 
          <span class="${
            situacao === 'Aprovado'
              ? 'aprovado'
              : situacao === 'Exame Final'
              ? 'exame'
              : 'reprovado'
          }">${situacao}</span>
        </p>
        <a href="/">Voltar</a>
      </div>
    </body>
  </html>
`);
});
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});