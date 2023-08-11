describe('Test for validating DELETE user calls', function () {
    beforeEach(function () {
        cy.fixture('user_data').then(function (json_object) {
            this.user_data_json = json_object;
        });
    });

    it('Validate user deletion', function () { // Kreiram korisnika da bih ga kasnije izbrisao
        cy.request({ 
            method: 'POST',
            url: '/api/users',
            headers: { "Content-Type": "application/json" },
            body: {
                name: 'Bob Marly',
                job: 'QA'
            }
        }).then((createResp) => {
            expect(createResp.status).to.eq(201);

            const userId = createResp.body.id;   // Dobijam ID novokreiranog korisnika

            // Brišem korisnika
            cy.request({
                method: 'DELETE',
                url: '/api/users/' + userId 
            }).should((deleteResp) => {
                expect(deleteResp.status).to.eq(204);

                
                cy.request({   // Proveravam da korisnik vise ne postoji
                    method: 'GET',
                    url: '/api/users/' + userId, 
                    failOnStatusCode: false 
                }).should((getUserResp) => {
                    expect(getUserResp.status).to.eq(404);
                });
            });
        });
    });
});
