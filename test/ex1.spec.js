const chai = require('chai');
const expect = chai.expect;
const server = require("../api/server-helper.js");
const request = require('supertest').agent(server);


describe('Test for exercise 1', function () {
	after(function (done) {
		server.close();
		done();
	});

	it("can rotaion 1 time", function (done) {
		const rsExpect = [
			[ 0,8,0 ],
			[ 0,128,16 ],
			[ 0,32,255 ]
		]

		request
			.get("/api/pyco/rotation/1")
			.expect(200)
			.end(function (err, res) {
				expect(res.body.Rotation).deep.equal(rsExpect);
				done();
			});
	});

	it("can rotaion 2 time", function (done) {
		const rsExpect = [
			[0, 0, 0],
			[32, 128, 8],
			[255, 16, 0]
		]

		request
			.get("/api/pyco/rotation/2")
			.expect(200)
			.end(function (err, res) {
				expect(res.body.Rotation).deep.equal(rsExpect);
				done();
			});
	});

	it("can rotaion 3 time", function (done) {
		const rsExpect = [
			[255, 32, 0],
			[16, 128, 0],
			[0, 8, 0]
		]

		request
			.get("/api/pyco/rotation/3")
			.expect(200)
			.end(function (err, res) {
				expect(res.body.Rotation).deep.equal(rsExpect);
				done();
			});
	});

	it("can rotaion 4 time", function (done) {
		const rsExpect = [
			[0, 16, 255],
			[8, 128, 32],
			[0, 0, 0]
		]

		request
			.get("/api/pyco/rotation/4")
			.expect(200)
			.end(function (err, res) {
				expect(res.body.Rotation).deep.equal(rsExpect);
				done();
			});
	});

	it("can rotation with large number such as 99999999999", function (done) {
		const rsExpect = [
			[ 255,32,0 ],
			[ 16,128,0 ],
			[ 0,8,0 ]
		]

		request
			.get("/api/pyco/rotation/99999999999")
			.expect(200)
			.end(function (err, res) {
				expect(res.body.Rotation).deep.equal(rsExpect);
				done();
			});
	});
});
	// it('should have return version number', function (done) {
	// 	request(webserver)
	// 		.get('/api')
	// 		.end(function (err, res) {
	// 			expect(res.body.version).to.be.ok;
	// 			expect(res.statusCode).to.be.equal(200);
	// 			done();
	// 		});
	// });

	//   describe('Registration Tests', function () {
	//     describe('Successes', function () {
	//       it('should return the user if the name is valid', function (done) {
	//         request(app)
	//           .post('/api/register')
	//           .send({ name: 'JoshMatz' })
	//           .end(function (err, res) {
	//             expect(res.body.name).to.be.equal('JoshMatz');
	//             expect(res.statusCode).to.be.equal(200);
	//             done();
	//           });
	//       });
	//     });

	//     describe('Errors', function () {
	//       it('should return multiple errors if no name is supplied', function (done) {
	//         request(app)
	//           .post('/api/register')
	//           .end(function (err, res) {
	//             expect(res.body.errors).to.be.an('array');
	//             expect(res.statusCode).to.be.equal(400);
	//             done();
	//           });
	//       });

	//       it('should return return a length error if a name is too short', function (done) {
	//         request(app)
	//           .post('/api/register')
	//           .send({ name: 'J' })
	//           .end(function (err, res) {
	//             expect(res.body.errors).to.be.an('array');
	//             expect(res.body.errors[0].msg).to.be.equal('Name must be between 2 and 50 characters.');
	//             expect(res.statusCode).to.be.equal(400);
	//             done();
	//           });
	//       });

	//       it('should return a character error if a name includes special characters', function (done) {
	//         request(app)
	//           .post('/api/register')
	//           .send({ name: 'J0$#' })
	//           .end(function (err, res) {
	//             expect(res.body.errors).to.be.an('array');
	//             expect(res.body.errors[0].msg).to.be.equal('Name must have only alphabetical characters.');
	//             expect(res.statusCode).to.be.equal(400);
	//             done();
	//           });
	//       });
	//     });
	//   });

	//   describe('Login Tests', function () {
	//     describe('Successes', function () {
	//       it('should return the user if valid', function (done) {
	//         request(app)
	//           .post('/api/login')
	//           .send({ userID: 0 })
	//           .end(function (err, res) {
	//             expect(res.body.name).to.be.equal('JoshMatz');
	//             expect(res.statusCode).to.be.equal(200);
	//             done();
	//           });
	//       });
	//     });

	//     describe('Errors', function () {
	//       it('should return a numeric error if no user is supplied', function (done) {
	//         request(app)
	//           .post('/api/login')
	//           .send({})
	//           .end(function (err, res) {
	//             expect(res.body.errors).to.be.an('array');
	//             expect(res.body.errors[0].msg).to.be.equal('Authentication requires a number.');
	//             expect(res.statusCode).to.be.equal(400);
	//             done();
	//           });
	//       });

	//       it('should return a numeric error if a non-number user is supplied', function (done) {
	//         request(app)
	//           .post('/api/login')
	//           .send({ userID: '@#$' })
	//           .end(function (err, res) {
	//             expect(res.body.errors).to.be.an('array');
	//             expect(res.body.errors[0].msg).to.be.equal('Authentication requires a number.');
	//             expect(res.statusCode).to.be.equal(400);
	//             done();
	//           });
	//       });

	//       it('should return an non-existing error if an valid ID but non-existing user is supplied', function (done) {
	//         request(app)
	//           .post('/api/login')
	//           .send({ userID: 5 })
	//           .end(function (err, res) {
	//             expect(res.body.errors).to.be.an('array');
	//             expect(res.body.errors[0].msg).to.be.equal('That user does not exist.');
	//             expect(res.statusCode).to.be.equal(400);
	//             done();
	//           });
	//       });
	//     });
	//   });
//})