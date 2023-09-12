const expect = require('chai').expect;
const sinon = require('sinon');
var chai = require('chai');
chai.use(require('sinon-chai'))
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const controller = require('../controllers/auth'); // Assurez-vous d'importer le bon chemin vers votre contrôleur
const request = require('supertest');
const app = require('../index'); // Import your Express app
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const db = new sqlite3.Database(':memory:'); // Create an in-memory SQLite database for testing
const { logout } = require('../controllers/auth'); // Assurez-vous d'importer le bon chemin vers votre contrôleur


//Test Register controller
describe('Controller: register', () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
        req = { body: { username: 'testuser', password: 'testpassword' } };
        res = { status: sinon.stub().returnsThis(), send: sinon.stub() };
        next = sinon.stub();
    });

    it('should hash password and save user', async () => {
        const genSaltStub = sinon.stub(bcrypt, 'genSaltSync').returns('salt');
        const hashStub = sinon.stub(bcrypt, 'hashSync').returns('hashedPassword');
        const saveStub = sinon.stub(User.prototype, 'save');

        await controller.register(req, res, next);

        expect(genSaltStub).to.have.been.calledOnceWith(10);
        expect(hashStub).to.have.been.calledOnceWith('testpassword', 'salt');
        expect(saveStub).to.have.been.calledOnce;

        expect(res.status).to.have.been.calledOnceWith(200);
        expect(res.send).to.have.been.calledOnceWith('User has been created');

        genSaltStub.restore();
        hashStub.restore();
        saveStub.restore();
    });

    it('should call next with an error on failure', async () => {
        const genSaltStub = sinon.stub(bcrypt, 'genSaltSync').throws(new Error('salt error'));

        await controller.register(req, res, next);

        expect(next).to.have.been.calledOnce;

        genSaltStub.restore();
    });
});


//Test Logout controller
describe('Controller: logout', () => {
    let res;
    let req;
    let next;

    beforeEach(() => {
        res = {
            cookie: sinon.stub(),
            status: sinon.stub().returnsThis(),
            json: sinon.stub(),
        };
        req = {};
        next = sinon.stub();
    });

    // Test si le champ access_token dans les 'cookie' est effacé et si il y a un message de succés retourné
    it('should clear the access_token cookie and send a success response', async () => {
        await logout(req, res, next);

        // Vérifie si la méthode 'cookie' est appelée avec les paramètres attendus
        expect(res.cookie).to.have.been.calledOnceWith('access_token', 'none', { expires: new Date(Date.now()), httpOnly: true, });

        // Vérifie si les méthodes 'status' et 'json' sont appelées avec les paramètres attendus
        expect(res.status).to.have.been.calledOnceWith(200);
        expect(res.json).to.have.been.calledOnceWith({ success: true, message: 'User logged out successfully' });

        // Vérifie si la méthode 'next' n'a pas été appelée
        expect(next).to.not.have.been.called;
    });

    // Test si la fonction next est appelée avec une erreur si il y a une erreur
    it('should call the next function with an error if an error occurs', async () => {
        const expectedError = new Error('An error occurred');
        res.cookie = sinon.stub().throws(expectedError);

        await logout(req, res, next);

        // Vérifie si la méthode 'next' a été appelée avec l'erreur attendue
        expect(next).to.have.been.calledOnceWith(expectedError);

        // Vérifie si les autres méthodes ne sont pas appelées
        expect(res.status).to.not.have.been.called;
        expect(res.json).to.not.have.been.called;
    });
});

// //Test Login controller
// describe('Controller: login', () => {
//     before((done) => {
//         // Set up your in-memory SQLite database schema and add a test user here
//         db.serialize(() => {
//             db.run(`CREATE TABLE users (
//                 id INTEGER PRIMARY KEY AUTOINCREMENT,
//                 username TEXT,
//                 password TEXT
//             )`);
//             // Hash a password and insert a test user into the database
//             const hashedPassword = bcrypt.hashSync('testpassword', 10);
//             db.run(`
//             INSERT INTO users (username, password) VALUES ('testuser', '${hashedPassword}')
//             `);
//             done();
//         });
//     });

//     after((done) => {
//         // Clean up the database after testing
//         db.close((err) => {
//             if (err) {
//                 console.error('Error closing the database:', err);
//             }
//             done();
//         });
//     });

//     it('should return a JWT token upon successful login', (done) => {
//         const credentials = {
//             username: 'testuser',
//             password: 'testpassword',
//         };

//         request(app)
//             .post('/auth/login')
//             .send(credentials)
//             .expect(200)
//             .expect((res) => {
//                 const { access_token, details, isAdmin, isSuperAdmin } = res.body;
//                 expect(access_token).to.exist;
//                 expect(details).to.exist;
//                 expect(details.isAdmin).to.equal(isAdmin);
//                 expect(details.isSuperAdmin).to.equal(isSuperAdmin);
//             })
//             .end(done);
//     });

//     it('should return an error for incorrect credentials', (done) => {
//         const credentials = {
//             username: 'testuser',
//             password: 'incorrectpassword',
//         };

//         request(app)
//             .post('/auth/login')
//             .send(credentials)
//             .expect(404)
//             .expect((res) => {
//                 const { message } = res.body.error;
//                 expect(message).to.equal('Mauvais identifiants !');
//             })
//             .end(done);
//     });

//     it('should return an error for non-existing user', (done) => {
//         const credentials = {
//             username: 'nonexistinguser',
//             password: 'testpassword',
//         };

//         request(app)
//             .post('/auth/login')
//             .send(credentials)
//             .expect(404)
//             .expect((res) => {
//                 const { message } = res.body.error;
//                 expect(message).to.equal('Utilisateur introuvable !');
//             })
//             .end(done);
//     });
// });