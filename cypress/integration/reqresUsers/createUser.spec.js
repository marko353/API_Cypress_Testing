let user_data_json

describe('Test for validating POST user calls', function () {
    beforeEach(function () {
        cy.fixture('user_data').then(function (json_object) {
            this.user_data_json = json_object;
        });
    });
    it('Validate that we are able to create single user', function () {
        const options = {
            method: 'POST',
            url: '/api/users',
            headers: { "Content-Type": "application/json" },
            body: this.user_data_json
        };
        cy.request(options).should((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body.name).to.eq(this.user_data_json.name);
            expect(resp.body.job).to.eq(this.user_data_json.job);
        });
    })
    it('Validate response data after creating a user', function () {
        const userToCreate = {
            name: 'John Doe',
            job: 'Developer'
        };

        const options = {
            method: 'POST',
            url: '/api/users',
            headers: { "Content-Type": "application/json" },
            body: userToCreate
        };

        cy.request(options).should((resp) => {
            expect(resp.status).to.eq(201);
            expect(resp.body.name).to.eq(userToCreate.name);
            expect(resp.body.job).to.eq(userToCreate.job);



        });
    });
    it('Validate successfull login a user', function () {
        const userToCreate = {
            email: 'eve.holt@reqres.in',
            password: 'cityslicka',
           
        };

        const options = {
            method: 'POST',
            url: '/api/login',
            headers: { "Content-Type": "application/json" },
            body: userToCreate
        };
        cy.request(options).should((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body.token).to.eq('QpwL5tke4Pnpja7X4');


        })
    })
    it('Validate successfull register a user', function () {
        const userToCreate = {
            email: 'eve.holt@reqres.in',
            password: 'pistol',
           
        };

        const options = {
            method: 'POST',
            url: '/api/register',
            headers: { "Content-Type": "application/json" },
            body: userToCreate
        };
        cy.request(options).should((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body.id).to.eq(4);
            expect(resp.body.token).to.eq('QpwL5tke4Pnpja7X4');


        })
    })





})