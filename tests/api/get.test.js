const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../server');
const Performer = require('../../models/concert.model');
const { get } = require('mongoose');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET api/concerts/performer || price || genre || day', () => {
    before(async () => {
        const performerOne = new Performer(
            { performer: 'John Doe', genre: "Rock", price: 25, day: 1, image: "/img/uploads/1fsd324fsdg.jpg" });
        await performerOne.save();
        const performerTwo = new Performer(
            { performer: 'Rebekah Parker', genre: "R&B", price: 25, day: 1, image: "/img/uploads/2f342s4fsdg.jpg" });
        await performerTwo.save();
        const performerThree = new Performer(
            { performer: 'Maybell Haley', genre: "Pop", price: 40, day: 1, image: "/img/uploads/hdfh42sd213.jpg" });
        await performerThree.save();
        const performerFour = new Performer(
            { performer: 'Jaskson Vill', genre: "Pop", price: 23, day: 3, image: "/img/uploads/hdfh42sd2.jpg" });
        await performerFour.save();
    });

    it('/:performer should return proper performer found by "performer" ', async  () => {
        const res = await request(server).get('/api/concerts/performer/John Doe')
        expect(res.status).to.be.equal(200);
        expect(res.body).to.not.be.null;
        expect(res.body[0].performer).to.be.equal('John Doe');
        expect(res.body).to.be.an('array');
    });

    it('/genre/:genre should return all objects found by proper genre', async () => {
        const res = await request(server).get('/api/concerts/genre/Pop');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2); 
    });

    it('/day/:day should return all concerts filtered by proper price and day', async () => {
        const res = await request(server).get('/api/concerts/price/25/day/1');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array'); 
        expect(res.body.length).to.be.equal(2);
    });

    it('price/:price_min/:price_max should return all concerts from range of price betwieen min and max ', () => {
        const res = request(server).get('/api/concerts/price/23/25');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(3);
    })
    after(async () => {
        await Performer.deleteMany();
    });
})