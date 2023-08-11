let user_data_json

describe('Validate updating user data with PUT request', function () {
    beforeEach(function () {
        cy.fixture('user_data').then(function (json_object) {
            this.user_data_json = json_object;
        });
    });
    it('User Data Update', function () {
        const options = {
            method: 'PUT',
            url: '/api/users/2',
            headers: { "Content-Type": "application/json" },
            body: this.user_data_json
        };
        cy.request(options).should((resp) => {
            expect(resp.status).to.eq(200);
            expect(resp.body.name).to.eq(this.user_data_json.name);
            expect(resp.body.job).to.eq(this.user_data_json.job);
        });


    });
    it('Validate time of Update', function () {
        const options = {
            method: 'PUT',
            url: '/api/users/2',
            headers: { "Content-Type": "application/json" },
            body: this.user_data_json
        };
    
        cy.request(options).should((resp) => {
            expect(resp.status).to.eq(200);
    
            // Provera da li je updatedAt prisutan u odgovoru
            expect(resp.body).to.have.property('updatedAt');
    
            // Provera da li je updatedAt neprazan string
            expect(resp.body.updatedAt).to.be.a('string').and.not.to.be.empty;
        });
    });
})    
