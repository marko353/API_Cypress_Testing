let user_data_json

describe('Test for validating GET user calls', function () {
    beforeEach(function () {
        cy.fixture('user_data').then(function (json_object) {
            this.user_data_json = json_object;
        });
    });

    it('Validate that we are able to get single user', function () {
        const options = {
            method: 'GET',
            url: '/api/users/2',
        };
        cy.request(options).should((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body.data.id).to.eq(2);
            expect(resp.body.data.email).not.to.be.empty;
            expect(resp.body.data.email).to.contain('janet.weaver@reqres.in');
        });
    });

    const usersToTest = [1, 2, 3, 4, 7, 9];

    usersToTest.forEach((userId) => {
        it('Validate that we are able to get user with ID ' + userId, function () {
            const options = {
                method: 'GET',
                url: '/api/users/' + userId,
            };
            cy.request(options).should((resp) => {
                expect(resp.status).to.eq(200);
                expect(resp.body.data.id).to.eq(userId);
                expect(resp.body.data.email).not.to.be.empty;

            });
        });


        it('Validate behavior for a non-existing user', function () {
            const nepostojeciUserId = 867;
            const opcije = {
                method: 'GET',
                url: `/api/users/${nepostojeciUserId}`,
                failOnStatusCode: false, // Dodajte ovu opciju da biste sprečili da test ne uspe na statusne kodove koji nisu '2xx' ili '3xx'
            };
            cy.request(opcije).should((resp) => {
                expect(resp.status).to.eq(404);

            });
        });


    });
})
