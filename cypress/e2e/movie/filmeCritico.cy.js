/// <reference types="Cypress" />

describe("FilmeCrítico", () => {
    before(() => {
      cy.logarAdmin().as("admin");
      cy.logrUsuario().as("usuario");
      cy.newUser().as("critico");
      cy.newUser().as("usuarioComum");
      cy.novoFilme().as("filme");
      cy.novaAvaliacaoFilme("@filme.filme.id", "@critico.user.id").as("avaliacao");
    });
  
    it("FilmeCríticoBadRequestAvaliaçãoPontuação.teste", () => {
      cy.request({
        method: "POST",
        url: `filmes/@filme.filme.id/avaliacoes`,
        failOnStatusCode: false,
        body: {
          avaliacao: 6,
          comentario: "Ótimo filme!",
          idUsuario: "@usuario.user.id",
          idFilme: "@filme.filme.id",
        },
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
  
    it("FilmeCríticoNotFoundIdAvaliação.teste", () => {
      cy.request({
        method: "DELETE",
        url: `filmes/invalid_id/avaliacoes/@avaliacao.avaliacao.id`,
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.equal(404);
      });
    });
  
    it("FilmeCríticoBadRequestCriar.teste", () => {
      cy.request({
        method: "POST",
        url: "filmes",
        failOnStatusCode: false,
        body: {
          titulo: "",
          diretor: "Diretor Desconhecido",
          genero: "Ação",
          ano: 2023,
          descricao: "Um filme de ação emocionante.",
        },
      }).then((response) => {
        expect(response.status).to.equal(400);
      });
    });
  
    it("FilmeCríticoAtualizarNãoAutorizado.teste", () => {
      cy.request({
        method: "PUT",
        url: `filmes/@filme.filme.id`,
        failOnStatusCode: false,
        headers: {
          Authorization: `Bearer @usuario.tokenUsuario`,
        },
        body: {
          descricao: "Atualização da descrição do filme.",
        },
      }).then((response) => {
        expect(response.status).to.equal(401);
      });
    });
  
    it("FilmeCríticoLocalizarPorTítulo.teste", () => {
      cy.request({
        method: "GET",
        url: `filmes?titulo=@filme.filme.titulo`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.greaterThan(0);
      });
    });
  
    it("FilmeCríticoAvaliação.teste", () => {
      cy.request({
        method: "GET",
        url: `filmes/@filme.filme.id/avaliacoes`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.greaterThan(0);
      });
    });
  
    it("FilmeCríticoListarAvaliações.teste", () => {
      cy.request({
        method: "GET",
        url: `filmes/@filme.filme.id/avaliacoes`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.length.greaterThan(0);
      });
    });
  
    it("FilmeCríticoLocalizarPorId.teste", () => {
      cy.request({
        method: "GET",
        url: `filmes/@filme.filme.id`,
      }).then((response) => {
        expect(response.status).to.equal(200);
        expect(response.body).to.have.property("id");
      });
    });
  });
  