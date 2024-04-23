// ListarUsuárioBadRequestSemAdmin.teste.js
describe("Listar Usuário - BadRequest sem Admin", () => {
  beforeEach(() => {
    cy.logarAdmin().then(({ tokenUsuario }) => {
      cy.request("POST", "auth/logout", { tokenUsuario });
    });
  });

  it("Deve retornar status 401 quando o usuário não for um administrador", () => {
    cy.logrUsuario().then(({ tokenUsuario }) => {
      cy.request({
        method: "GET",
        url: "usuarios",
        headers: { Authorization: `Bearer ${tokenUsuario}` },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq("Unauthorized");
      });
    });
  });
});

// ListarUsuárioBadRequestSemAdminPorId.teste.js
describe("Listar Usuário - BadRequest sem Admin por ID", () => {
  beforeEach(() => {
    cy.logarAdmin().then(({ tokenUsuario }) => {
      cy.request("POST", "auth/logout", { tokenUsuario });
    });
  });

  it("Deve retornar status 401 quando o usuário não for um administrador (por ID)", () => {
    cy.logrUsuario().then(({ tokenUsuario }) => {
      cy.request({
        method: "GET",
        url: "usuarios/123", // Substitua pelo ID válido do usuário
        headers: { Authorization: `Bearer ${tokenUsuario}` },
        failOnStatusCode: false,
      }).then((response) => {
        expect(response.status).to.eq(401);
        expect(response.body.message).to.eq("Unauthorized");
      });
    });
  });
});

// ListarUsuárioListaELocalizaçõesVálidas.teste.js
describe("Listar Usuário - Lista e Localizações Válidas", () => {
  beforeEach(() => {
    cy.logarAdmin().then(({ tokenUsuario }) => {
      cy.request("POST", "auth/logout", { tokenUsuario });
    });
  });

  it("Deve retornar a lista de usuários quando o usuário for um administrador", () => {
    cy.logarAdmin().then(({ tokenUsuario }) => {
      cy.request({
        method: "GET",
        url: "usuarios",
        headers: { Authorization: `Bearer ${tokenUsuario}` },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("usuarios");
        expect(response.body.usuarios).to.be.an("array");
      });
    });
  });

  it("Deve localizar um usuário por ID quando o usuário for um administrador", () => {
    cy.logarAdmin().then(({ tokenUsuario }) => {
      cy.request({
        method: "GET",
        url: "usuarios/123", // Substitua pelo ID válido do usuário
        headers: { Authorization: `Bearer ${tokenUsuario}` },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("usuario");
        expect(response.body.usuario).to.be.an("object");
      });
    });
  });
});

// ListarUsuárioLocalizarPorId.teste.js
describe("Listar Usuário - Localizar por ID", () => {
  beforeEach(() => {
    cy.logarAdmin().then(({ tokenUsuario }) => {
      cy.request("POST", "auth/logout", { tokenUsuario });
    });
  });

  it("Deve localizar um usuário por ID quando o usuário for um administrador", () => {
    cy.logarAdmin().then(({ tokenUsuario }) => {
      cy.request({
        method: "GET",
        url: "usuarios/123", // Substitua pelo ID válido do usuário
        headers: { Authorization: `Bearer ${tokenUsuario}` },
      }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.property("usuario");
        expect(response.body.usuario).to.be.an("object");
      });
    });
  });
});
