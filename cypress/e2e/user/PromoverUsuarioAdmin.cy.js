describe("Promover Usuário Para Admin", () => {
    let tokenAdmin;
  
    before(() => {
      cy.logarAdmin().then((response) => {
        tokenAdmin = response.tokenUsuario;
      });
    });
  
    context("Quando a solicitação é válida", () => {
      it("Deve promover o usuário para administrador", () => {
        cy.logrUsuario().then((response) => {
          const tokenUsuario = response.tokenUsuario;
          cy.request({
            method: "POST",
            url: "usuarios",
            body: {
              // Dados do usuário a ser promovido
              email: "user@example.com",
              password: "user123",
              name: "Nome do Usuário",
            },
            headers: {
              Authorization: `Bearer ${tokenAdmin}`,
            },
          }).then((response) => {
            const userId = response.body.id;
            cy.promoverParaAdministrador(userId).then((response) => {
              expect(response.usuario.tipoUsuario).to.equal("administrador");
            });
          });
        });
      });
    });
  
    context("Quando a solicitação é inválida", () => {
      it("Deve retornar um erro se o usuário não for encontrado", () => {
        cy.promoverParaAdministrador("usuario_inexistente", tokenAdmin).then((response) => {
          expect(response.error).to.equal("Usuário não encontrado");
        });
      });
  
      it("Deve retornar um erro se o token de acesso não for fornecido", () => {
        cy.request({
          method: "POST",
          url: "usuarios",
          body: {
            email: "user@example.com",
            password: "user123",
            name: "Nome do Usuário",
          },
          headers: {
            Authorization: "", // Token de acesso não fornecido
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal("Token de acesso não fornecido");
        });
      });
  
      it("Deve retornar um erro se o token de acesso for inválido", () => {
        cy.request({
          method: "POST",
          url: "usuarios",
          body: {
            email: "user@example.com",
            password: "user123",
            name: "Nome do Usuário",
          },
          headers: {
            Authorization: "TokenInvalido123", // Token de acesso inválido
          },
          failOnStatusCode: false,
        }).then((response) => {
          expect(response.status).to.equal(401);
          expect(response.body.message).to.equal("Token de acesso inválido");
        });
      });
    });
  });
  