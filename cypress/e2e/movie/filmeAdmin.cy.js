describe("FilmeAdmin", () => {
    beforeEach(() => {
      cy.logarAdmin().then((response) => {
        const tokenUsuario = response.tokenUsuario;
        cy.wrap(tokenUsuario).as("tokenUsuario");
      });
    });
  
    it("BadRequest ao criar avaliação com pontuação inválida", () => {
      cy.novoFilme().then((response) => {
        const idFilme = response.filme.id;
        cy.request({
          method: "POST",
          url: `filmes/${idFilme}/avaliacoes`,
          body: {
            avaliacao: 6, // Pontuação inválida
            comentario: "Ótimo filme!",
            idUsuario: "userId", // Defina um ID de usuário válido
            idFilme: idFilme,
          },
          failOnStatusCode: false, // Para capturar a resposta com status 400
        }).then((response) => {
          expect(response.status).to.equal(400);
          expect(response.body.message).to.equal(
            "Pontuação de avaliação inválida. Deve ser um número inteiro entre 1 e 5."
          );
        });
      });
    });
  
    it("NotFound ao tentar acessar avaliação com ID inválido", () => {
      cy.request({
        method: "GET",
        url: "filmes/123456789/avaliacoes", // ID de avaliação inválido
        failOnStatusCode: false, // Para capturar a resposta com status 404
      }).then((response) => {
        expect(response.status).to.equal(404);
        expect(response.body.message).to.equal("Avaliação não encontrada.");
      });
    });
  
    it("Criar Filme - Deve criar um novo filme com sucesso", function () {
      cy.request({ method: "DELETE", url: "filmes" }); // Limpa todos os filmes antes de criar um novo
      cy.novoFilme().then((response) => {
        expect(response.status).to.equal(201);
      });
    });
  
    it("Localizar Filme por Título - Deve retornar um filme ao buscar por seu título", () => {
      cy.novoFilme().then((response) => {
        const tituloFilme = response.filme.titulo;
        cy.request({
          method: "GET",
          url: `filmes?titulo=${encodeURIComponent(tituloFilme)}`,
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.length).to.be.greaterThan(0);
          expect(response.body[0].titulo).to.equal(tituloFilme);
        });
      });
    });
  
    it("Atualizar Filme - Deve atualizar os detalhes de um filme com sucesso", () => {
      cy.novoFilme().then((response) => {
        const idFilme = response.filme.id;
        cy.request({
          method: "PUT",
          url: `filmes/${idFilme}`,
          body: {
            titulo: "Novo Título",
            diretor: "Novo Diretor",
            genero: "Novo Gênero",
            ano: 2023,
            descricao: "Nova Descrição",
          },
        }).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.titulo).to.equal("Novo Título");
          expect(response.body.diretor).to.equal("Novo Diretor");
          expect(response.body.genero).to.equal("Novo Gênero");
          expect(response.body.ano).to.equal(2023);
          expect(response.body.descricao).to.equal("Nova Descrição");
        });
      });
    });
  
    it("Avaliar Filme - Deve permitir que um usuário avalie um filme", () => {
      cy.novoFilme().then((response) => {
        const idFilme = response.filme.id;
        cy.request("POST", `filmes/${idFilme}/avaliacoes`, {
          avaliacao: 5,
          comentario: "Excelente filme!",
          idUsuario: "userId", // Defina um ID de usuário válido
          idFilme: idFilme,
        }).then((response) => {
          expect(response.status).to.equal(201);
        });
      });
    });
  
    it("Listar Avaliações de Filme - Deve listar todas as avaliações de um filme", () => {
      cy.novoFilme().then((response) => {
        const idFilme = response.filme.id;
        cy.request("GET", `filmes/${idFilme}/avaliacoes`).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.length).to.be.greaterThan(0);
        });
      });
    });
  
    it("Localizar Filme por ID - Deve retornar um filme ao buscar por seu ID", () => {
      cy.novoFilme().then((response) => {
        const idFilme = response.filme.id;
        cy.request("GET", `filmes/${idFilme}`).then((response) => {
          expect(response.status).to.equal(200);
          expect(response.body.id).to.equal(idFilme);
        });
      });
    });
  });
  