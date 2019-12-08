const chai = require('chai');
const expect = chai.expect;
const server = require("../api/server-helper.js");
const request = require('supertest').agent(server);


describe('Test for exercise 4', function () {
	after(function (done) {
		server.close();
		done();
    });
    describe('Test booking date', function () {
        it("can booking if arrived and depature less than total room", function (done) {
            request
                .post("/api/pyco/getStatusRoom")
                .send({ _arrived: [1,3,7], _departures:[2,6, 10], _K:1})
                .end(function (err, res) {
                    expect(res.body.isBooking).equal(true);
                    done();
                });
        });
    });

    describe('Test modify number of rooms', function () {
    	it("can not booking if room is not enough", function (done) {
            request
                .post("/api/pyco/getStatusRoom")
                .send({ _arrived: [1,3,5], _departures:[2,6, 10], _K:1})
                .end(function (err, res) {
                    expect(res.body.isBooking).equal(false);
                    done();
                });
        });
        
        it("can booking if room is enough", function (done) {
            request
                .post("/api/pyco/getStatusRoom")
                .send({ _arrived: [1,3,5], _departures:[2,6, 10], _K:2})
                .end(function (err, res) {
                    expect(res.body.isBooking).equal(true);
                    done();
                });
        });
    });
});