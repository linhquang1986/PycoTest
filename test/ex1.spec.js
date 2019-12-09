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