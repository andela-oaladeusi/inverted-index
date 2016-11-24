'use strict';
let invertedIndexTest = new InvertedIndexClass();

describe("Inverted Index Test Suites", function () {
  // Initialize constants to be use for testing
  const books = [
    {
      "title": "Alice in Wonderland",
      "text": "Alice falls into a rabbit hole and enters a world full of"
    },

    {
      "title": "The Lord of the Rings: The Fellowship of the Ring.",
      "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit."
    }
  ];

  const books2 = [
    {
      "title": "Alice in Wonderland",
      "text": "Alice falls into a rabbit hole and enters a world full of ."
    },

    {
      "title": "The Lord of the Rings: The Fellowship of the Ring.",
      "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit."
    },
    {
      "title": "Alice in Wonderland",
      "text": "Alice falls into a rabbit hole and enters a world full of ."
    },

    {
      "title": "The Lord of the Rings: The Fellowship of the Ring.",
      "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit."
    }
  ];

  const emptyBook = [];
  const wrongFomatBook = [
    {
      "noooooo": "Alice in Wonderland",
      "texteee": "Alice falls into a rabbit hole and enters a world ."
    }
  ];

  const invalidJson = " 'wale','deji','ola', 'andela','class' ";

  let readindex = invertedIndexTest.createIndex(books, "booksjson");
  let jsonindex = invertedIndexTest.getIndex('booksjson');
  let readindex2 = invertedIndexTest.createIndex(books2, "booksjson2");
  let jsonindex2 = invertedIndexTest.getIndex('booksjson2');

  describe("Read book data", function () {

    it("Should return be a valid JSON Array", function () {
      expect(invertedIndexTest.isValidJson(books)).toBeTruthy();
    });

    it("Should return an invalid JSON Array when parameter is 'invalidJson'",
     function () {
      expect(invertedIndexTest.isValidJson(invalidJson)).toBeFalsy();
    });

    it("Should return true, when our parameter is 'emptyBook'", function () {
      expect(invertedIndexTest.isJsonEmpty(emptyBook)).toBeTruthy();
    });

    it("Should return true JSON array is not empty", function () {
      expect(invertedIndexTest.isJsonEmpty(books)).toBeFalsy();
    });

    it("Should return false, when json contents is not properly formatted", 
    function () {expect(invertedIndexTest.validateJsonContent(wrongFomatBook))
      .toBeFalsy();
    });
  });

  describe("Populate Index", function () {
    it("Index should be created after reading json file", function () {
      expect(typeof readindex).toEqual('object');
    });

    it("Index should be created after reading json file for the second json",
     function () {
      expect(typeof readindex2).toEqual('object');
    });

    it("It should return correct index", function () {
      expect(jsonindex.alice).toEqual({ 0: true });
    });

    it("It should return correct index when passing 'and'", function () {
      expect(jsonindex.and).toEqual({ 0: true, 1: true });
    });

    it("Ensures index is correct using another json file", function () {
      expect(jsonindex2.alice).toEqual({ 0: true, 2: true });
    });

  });

describe("Search Index", function () {
    it("It should return the correct search index for just one single file",
     function () {
      expect(invertedIndexTest.searchIndex('alice and', 'booksjson')).toEqual(
        { alice: { 0: true }, and: { 0: true, 1: true } });
    });

    it("It should return the correct search index for all files", function () {
      expect(invertedIndexTest.searchIndex('alice and', 'all')).toEqual(
        {booksjson: {alice: {0: true}, 
      and: {0: true, 1: true}},booksjson2: {alice: {0: true, 2: true}, 
      and: {0: true, 1: true, 2: true, 3: true}}
      });
    });

  });

});
