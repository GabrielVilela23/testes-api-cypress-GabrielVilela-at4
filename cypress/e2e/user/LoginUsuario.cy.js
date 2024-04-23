describe("Login de Usuário", () => {
    beforeEach(() => {
      // Antes de cada teste, limpar o estado do aplicativo (se necessário)
      // e realizar as configurações de inicialização, como limpar o banco de dados, criar usuários, etc.
    });
  
    it("Deve retornar erro 400 se o email estiver ausente", () => {
      cy.request({
        method: "POST",
        url: "auth/login",
        failOnStatusCode: false,
        body: {
          password: "senhaCorreta"
        }
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("Email é obrigatório");
      });
    });
  
    it("Deve retornar erro 400 se o email for inválido", () => {
      cy.request({
        method: "POST",
        url: "auth/login",
        failOnStatusCode: false,
        body: {
          email: "emailinvalido",
          password: "senhaCorreta"
        }
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("Email inválido");
      });
    });
  
    it("Deve retornar erro 400 se a senha estiver ausente", () => {
      cy.request({
        method: "POST",
        url: "auth/login",
        failOnStatusCode: false,
        body: {
          email: "usuario@example.com"
        }
      }).then((response) => {
        expect(response.status).to.equal(400);
        expect(response.body.message).to.equal("Senha é obrigatória");
      });
    });
  
    it("Deve retornar erro 401 se a senha estiver incorreta", () => {
      cy.request({
        method: "POST",
        url: "auth/login",
        failOnStatusCode: false,
        body: {
          email: "usuario@example.com",
          password: "senhaIncorreta"
        }
      }).then((response) => {
        expect(response.status).to.equal(401);
        expect(response.body.message).to.equal("Senha incorreta");
      });
    });
  
    it("Deve retornar um token de acesso válido para dados de login corretos", () => {
      cy.logrUsuario().then((loginResponse) => {
        const { tokenUsuario } = loginResponse;
        expect(tokenUsuario).to.exist;
      });
    });
  });
  