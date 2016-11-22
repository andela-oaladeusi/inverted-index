'use strict';
let invertedIndexObject = new InvertedIndexClass();


describe("All Test Suites", function () {
  // initialize contants to be use to test
  const books = [
    {
      "title": "Alice in Wonderland",
      "text": "Alice falls into a rabbit hole and enters a world full of imagination."
    },

    {
      "title": "The Lord of the Rings: The Fellowship of the Ring.",
      "text": "An unusual alliance of man, elf, dwarf, wizard and hobbit seek to destroy a powerful ring."
    }
  ];
  const emptyBook = [];


  const wrongFomatBook = [
    {
      "noooooo": "Alice in Wonderland",
      "texteee": "Alice falls into a rabbit hole and enters a world full of imagination."
    }
  ];
  const bookIndex={ alice: { 0: true },
  in: { 0: true },
  of: { 0: true ,1: true },
  the: { 0: true, 1: true },
  wonderland: { 0: true },
  falls: { 0: true },
  into: { 0: true },
  a: { 0: true },
  pit: { 0: true },
  and: { 0: true, 1: true },
  dies: { 0: true, 1: true },
  lord: { 1: true },
  rings: { 1: true },
  an: { 1: true },
  unusual: { 1: true },
  alliance: { 1: true },
  man: { 1: true },
  who: { 1: true },
  live: { 1: true } };

  const invalidJson = " 'wale','deji','ola', 'andela','class' ";

  describe("Read book data", function () {

    it("Should be a valid JSON Array", function () {
      expect(invertedIndexObject.isValidJson(books)).toBeTruthy();
    });


    it("Should return an invalid JSON Array", function () {
      expect(invertedIndexObject.isValidJson(invalidJson)).toBeFalsy();
    });

    it("Should return true JSON array is not empty", function () {
      expect(invertedIndexObject.isJsonEmpty(emptyBook)).toBeTruthy();
    });

    it("Should return true JSON array is not empty", function () {
      expect(invertedIndexObject.isJsonEmpty(books)).toBeFalsy();
    });

    it("Should return false, when json contents is not properly formatted", function () {
      expect(invertedIndexObject.validateJsonContent(wrongFomatBook)).toBeFalsy();
    });

    it("Should return True, when json contents is properly formatted", function () {
      expect(invertedIndexObject.validateJsonContent(books)).toEqual(bookIndex);
    });

  });

});
