// FilmeBadRequestCriar.teste
describe("Testes de requisições com falha ao criar filme", () => {
    it("Deve retornar status 400 ao tentar criar filme com dados inválidos", () => {
      cy.logarAdmin().then(({ tokenUsuario }) => {
        cy.request({
          method: "POST",
          url: "filmes",
          headers: { Authorization: `Bearer ${tokenUsuario}` },
          body: {
            // Inserir dados inválidos para criar filme
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(400);
          // Adicione mais asserções conforme necessário para verificar a resposta
        });
      });
    });
  });
  
  // FilmeBadRequestAtualizar.teste
  describe("Testes de requisições com falha ao atualizar filme", () => {
    it("Deve retornar status 400 ao tentar atualizar filme com dados inválidos", () => {
      cy.logarAdmin().then(({ tokenUsuario }) => {
        cy.request("GET", "filmes").then((response) => {
          const filmeId = response.body[0].id; // Obter o ID de um filme existente
          cy.request({
            method: "PUT",
            url: `filmes/${filmeId}`,
            headers: { Authorization: `Bearer ${tokenUsuario}` },
            body: {
              // Inserir dados inválidos para atualizar filme
            },
            failOnStatusCode: false,
          }).then((response) => {
            expect(response.status).to.equal(400);
            // Adicione mais asserções conforme necessário para verificar a resposta
          });
        });
      });
    });
  });
  
  // FilmeListaNãoAutorizado.teste
  describe("Testes de listagem de filmes não autorizada", () => {
    it("Deve retornar status 403 ao tentar acessar a lista de filmes sem autorização", () => {
      cy.request("GET", "filmes", { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.equal(403);
        // Adicione mais asserções conforme necessário para verificar a resposta
      });
    });
  });
  
  // FilmeLocalizarPorIdNãoAutorizado.teste
  describe("Testes de localização de filme por ID não autorizada", () => {
    it("Deve retornar status 403 ao tentar acessar um filme por ID sem autorização", () => {
      cy.request("GET", "filmes/123", { failOnStatusCode: false }).then((response) => {
        expect(response.status).to.equal(403);
        // Adicione mais asserções conforme necessário para verificar a resposta
      });
    });
  });
  