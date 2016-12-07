'use strict';
const invertedIndexTest = new InvertedIndexClass();

describe("Inverted Index Test Suites", () => {

	// Initialize constants to be use for testing
  const readIndex1 = invertedIndexTest.createIndex(books, "booksjson");
  const jsonIndex1 = invertedIndexTest.getIndex('booksjson');
  const readIndex2 = invertedIndexTest.createIndex(books3, "booksjson3");
  const jsonIndex2 = invertedIndexTest.getIndex('booksjson3');

  describe("Read book data", () => {
    it("Should return a valid JSON Array", () => {
      expect(invertedIndexTest.isValidJson(books)).toBeTruthy();
    });

    it("Should return true, when json file is 'empty'", () => {
      expect(invertedIndexTest.isJsonEmpty(bookempty)).toBeTruthy();
    });

    it("Should return true, when JSON file is not empty", () => {
      expect(invertedIndexTest.isJsonEmpty(books)).toBeFalsy();
    });

    it("Should return false, when json contents is not properly formatted",
      () => {
        expect(invertedIndexTest.validateJsonContent(bookwrongformat))
          .toBeFalsy();
      });
  });

  describe("This test suite test different populating index test scenario", () => {
    it("Should create an index after reading json file", () => {
      expect(typeof readIndex1).toEqual('object');
    });

    it("Should return an object upon reading a second json file",
      () => {
        expect(typeof readIndex2).toEqual('object');
    });

    it("Should return correct index when alice key is pass", () => {
      expect(jsonIndex1.alice).toEqual({ 0: true });
    });

    it("Should return correct index when passing 'and'", () => {
      expect(jsonIndex1.and).toEqual({ 0: true, 1: true });
    });

    it("Should result correct index upon reading another json file", () => {
      expect(jsonIndex2.lord).toEqual({ 1: true, 2: true });
    });

  });

  describe("This test Suite test different search index test scenario",
    () => {
      it('Should return the correct search index for just one single file ' +
        'if "booksjson" file is selected',
        () => {
          expect(invertedIndexTest.searchIndex('alice and', 'booksjson')).toEqual(
            { alice: { 0: true }, and: { 0: true, 1: true } });
        });

      it('Should return the correct search index for all files when' +
        'searching for "alice and"', () => {
          expect(invertedIndexTest.searchIndex('alice and', 'all')).toEqual(
            {
              booksjson: {
                alice: { 0: true },
                and: { 0: true, 1: true }
              }, booksjson3: {
                alice: { 0: true },
                and: { 0: true, 1: true, 2: true }
              }
            });
        });

      it('Should return the correct search index for array of search terms ' +
        'if "booksjson" file is selected',
        () => {
          expect(invertedIndexTest.searchIndex(['alice', 'and'], 'booksjson')).toEqual(
            { alice: { 0: true }, and: { 0: true, 1: true } });
        });

      it('Should return index as false when search terms is not in json index ' +
        'if "booksjson" file is selected',
        () => {
          expect(invertedIndexTest.searchIndex('olawale', 'booksjson')).toEqual(
            { olawale: { 0: false } });
        });

      it('Should return the correct search index for all files when' +
        'searching for "alice and"', () => {
          expect(invertedIndexTest.searchIndex('olawale', 'all')).toEqual(
            {
              booksjson: {
                olawale: { 0: false }
              }, booksjson3: {
                olawale: { 0: false }
              }
            });
        });

      it('Should return the correct search index for all files' +
        'when no filter is selected "alice and"', () => {
          expect(invertedIndexTest.searchIndex('alice and')).toEqual(
            {
              booksjson: {
                alice: { 0: true },
                and: { 0: true, 1: true }
              }, booksjson3: {
                alice: { 0: true },
                and: { 0: true, 1: true, 2: true }
              }
            });
        });

      it('Should return the correct search index for array of search terms' +
        ' and when no filter name is selected', () => {
          expect(invertedIndexTest.searchIndex(['alice', 'and'])).toEqual(
            {
              booksjson: {
                alice: { 0: true },
                and: { 0: true, 1: true }
              }, booksjson3: {
                alice: { 0: true },
                and: { 0: true, 1: true, 2: true }
              }
            });
        });      
    });
});