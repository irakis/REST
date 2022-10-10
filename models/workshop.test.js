const Workshop = require('./workshops.model');
const mongoose = require('mongoose') //<==================do czego ptrzebny jest ten import??
const expect = require('chai').expect;

describe('Workshop', () => {

    it('shoult throw an error if there is no argument', () => {
        const newWorkshop = new Workshop({});
        newWorkshop.validate(err => {
            expect(err.errors.name).to.exist;
            expect(err.errors._id).to.exist;
            expect(err.errors.concertId).to.exist;
        })
    });

    it('shoult throw an error if "name" and "_id" is not a string', () => {
        const cases = [{}, []]; //<===================================================== dlaczego 2 nie jest traktowane jak string tzn. nie rzuca błędem?
        for (let name of cases) {
            const newWorkshop = new Workshop({ name });
            newWorkshop.validate(err => {
                expect(err.errors.name).to.exist;
            })
        }
    });

    it('shoult throw an error if "concertId" is not a string', () => {
        const cases = [{}, []];
        for (let concertId of cases) {
            const newWorkshop = new Workshop({ concertId });
            newWorkshop.validate(err => {
                expect(err.errors.concertId).to.exist;
            })
        }
    });

    it('shoult throw an error if "_id" is not a string', () => {
        const cases = [{}, []];
        for (let _id of cases) {
            const newWorkshop = new Workshop({ _id });
            newWorkshop.validate(err => {
                expect(err.errors._id).to.exist;
            })
        }
    });

    it('shoult not throw an error if arguments are correct', () => {
        const newWorkshop = new Workshop({ _id: '123', name: 'test test', concertId: 'asd345dfr56' });
        newWorkshop.validate(err => {
            expect(err).to.be.null;
        })
    })
})
