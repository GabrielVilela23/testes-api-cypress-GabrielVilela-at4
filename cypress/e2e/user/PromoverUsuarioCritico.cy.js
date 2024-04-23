describe("PromoverUsuárioParaCrítico", () => {
    it("deve lidar com BadRequest quando não há AccessToken", () => {
      cy.newUser().then(({ login }) => {
        cy.request("POST", "auth/login", login).then((response) => {
          const { tokenUsuario } = response.body;
          cy.promoverParaCritic(tokenUsuario, login.userId)
            .then(() => {
              // Não deve chegar aqui, pois a promoção não deve ser permitida sem AccessToken
              expect(true).to.be.false;
            })
            .catch((error) => {
              expect(error.message).to.include("Somente administradores podem promover usuários para crítico.");
            });
        });
      });
    });
  
    it("deve lidar com a proibição de promover/deletar", () => {
      // Suponha que haja um usuário administrador existente
      cy.logarAdmin().then(({ tokenUsuario }) => {
        cy.newUser().then(({ user }) => {
          cy.request("POST", "auth/login", user).then((response) => {
            const { tokenUsuario: userToken } = response.body;
            cy.promoverParaCritic(tokenUsuario, user.userId)
              .then(() => {
                // Não deve chegar aqui, pois a promoção não deve ser permitida
                expect(true).to.be.false;
              })
              .catch((error) => {
                expect(error.message).to.include("Somente administradores podem promover usuários para crítico.");
              });
          });
        });
      });
    });
  
    it("deve promover um usuário para crítico com sucesso", () => {
      // Suponha que haja um usuário administrador existente
      cy.logarAdmin().then(({ tokenUsuario }) => {
        cy.newUser().then(({ user }) => {
          cy.request("POST", "auth/login", user).then((response) => {
            const { tokenUsuario: userToken } = response.body;
            cy.promoverParaCritic(tokenUsuario, user.userId)
              .then((response) => {
                // Verifique se a resposta indica que o usuário foi promovido com sucesso
                expect(response.usuario.tipoUsuario).to.equal("crítico");
              });
          });
        });
      });
    });
  });
  