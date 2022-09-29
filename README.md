<h1 id="top" align="center">⚽ Projeto Trybe Futebol Clube ⚽</h1>

<h2>Tópicos:</h2>

- [Resumo do projeto](#summary)
- [Explicando decisões do projeto](#decisions)
- [Explicando funcionalidades do projeto](#functionalities)

---

<h2 id="summary">📝 Resumo do projeto</h2>

<br>

Esse é um projeto de uma API que tem como objetivo gerenciar uma tabela de times de futebol, com usuário, times, partidas e classificação

<p align="right"><a href="#top">Voltar ao topo</a></p>

---

<br>

<h2 id="decisions">👨‍💻 Explicando decisões do projeto</h2>
<details><summary>Decisões durante o desenvolvimento do projeto</summary>
<p>

Diferente do proposto no read.me do projeto, resolvi não seguir o desenvolvimento em TDD em benefício do tempo, por tanto, segui os requisitos principais de desenvolvimento dos EndPoints

</p>
</details>

<br>

<p align="right"><a href="#top">Voltar ao topo</a></p>

---

<br>

<h2 id="functionalities">⚙️ Funcionalidades do projeto</h2>

<details><summary>Rotas</summary>

<br>

Como dito já no início das descrição dos requisitos do Projeto, este é composto por 4 seções principais: 
1.	User e Login
2.	Times (Team’s)
3.	Partidas (Match’s)
4.	Placar (Leaderboard)

Separei as sessões em 4 rotas principais e em cada uma delas suas respectivas necessidades, a baixo temos uma tabela para exemplificar

<br>

<h3>User</h3>

| Endpoint | Métodos HTTP | Descrição |
|---|---|---|
| /login | GET | Usado para logar um usuário, retorna um token |
| /login/validate | POST | Valida o token recebido no Head |

<br>

<h3>Times</h3>

| Endpoint | Métodos HTTP | Descrição |
|---|---|---|
| /teams | GET | Retorna um Array com todos os times |
| /teams/:id | GET | Retorna os dados de um time com base no id |

<br>

<h3>Partidas</h3>

| Endpoint | Métodos HTTP | Descrição |
|---|---|---|
| /matches | GET | Retorna um Array com todas as partidas |
| /matches/:id | GET | Retorna os dados de uma partida com base no id |
| /matches/ | POST | Registra uma nova partida com os dados inseridos |
| /matches/ | PATCH | Atualizar uma partida com os dados inseridos |
| /matches/:id | PATCH | Atualizar o status de uma partida em andamento para finalizada |

<br>

<h3>Tabela de classificação</h3>

| Endpoint | Métodos HTTP | Descrição |
|---|---|---|
| /leaderboard | GET | Retorna um Array com todos os times da tabela de classificação |
| /leaderboard/away | GET | Retorna um Array com os times da tabela de classificação que jogaram fora do próprio Estádio |
| /leaderboard/home | GET | Retorna um Array com os times da tabela de classificação que jogaram no próprio Estádio  |

<br></details>

<p align="right"><a href="#top">Voltar ao topo</a></p>
