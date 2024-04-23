describe("CriarUsuário", () => {
  beforeEach(() => {
    cy.logarAdmin().then((response) => {
      cy.wrap(response.tokenUsuario).as("tokenAdmin");
    });
  });

  it("CriarUsuárioBadRequestSemEmail", function () {
    cy.request({
      method: "POST",
      url: "users",
      headers: { Authorization: "Bearer " + this.tokenAdmin },
      failOnStatusCode: false,
      body: { password: "senha123", name: "John Doe" },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal("Bad Request");
      expect(response.body.message).to.equal("Email is required");
    });
  });

  it("CriarUsuárioBadRequestSemNome", function () {
    cy.request({
      method: "POST",
      url: "users",
      headers: { Authorization: "Bearer " + this.tokenAdmin },
      failOnStatusCode: false,
      body: { email: "john.doe@example.com", password: "senha123" },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal("Bad Request");
      expect(response.body.message).to.equal("Name is required");
    });
  });

  it("CriarUsuárioBadRequestSenhaCurta", function () {
    cy.request({
      method: "POST",
      url: "users",
      headers: { Authorization: "Bearer " + this.tokenAdmin },
      failOnStatusCode: false,
      body: { email: "john.doe@example.com", password: "123", name: "John Doe" },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal("Bad Request");
      expect(response.body.message).to.equal("Password must be at least 6 characters");
    });
  });

  it("CriarUsuárioBadRequestSenhaLonga", function () {
    cy.request({
      method: "POST",
      url: "users",
      headers: { Authorization: "Bearer " + this.tokenAdmin },
      failOnStatusCode: false,
      body: {
        email: "john.doe@example.com",
        password: "thispasswordisverylongandshouldexceedthesixcharacterlimit",
        name: "John Doe",
      },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal("Bad Request");
      expect(response.body.message).to.equal("Password must be at most 20 characters");
    });
  });

  it("CriarUsuárioBadRequestEmailDuplicado", function () {
    cy.request({
      method: "POST",
      url: "users",
      headers: { Authorization: "Bearer " + this.tokenAdmin },
      failOnStatusCode: false,
      body: { email: "admin@example.com", password: "senha123", name: "John Doe" },
    }).then((response) => {
      expect(response.status).to.equal(400);
      expect(response.body.error).to.equal("Bad Request");
      expect(response.body.message).to.equal("Email already exists");
    });
  });

  it("CriarUsuárioDadosVálidos", function () {
    cy.request({
      method: "POST",
      url: "users",
      headers: { Authorization: "Bearer " + this.tokenAdmin },
      body: { email: "john.doe@example.com", password: "senha123", name: "John Doe" },
    }).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property("email", "john.doe@example.com");
      expect(response.body).to.have.property("name", "John Doe");
    });
  });
});
