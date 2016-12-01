'use strict';
const invertedIndexTest = new InvertedIndexClass();

describe("Inverted Index Test Suites", () => {

	// Initialize constants to be use for testing
	let readindex = invertedIndexTest.createIndex(books, "booksjson");
	console.log(readindex);
	let jsonindex = invertedIndexTest.getIndex('booksjson');
	let readindex2 = invertedIndexTest.createIndex(books3, "booksjson3");
	let jsonindex2 = invertedIndexTest.getIndex('booksjson3');

	describe("Read book data", () => {
		it("Should return a valid JSON Array", () => {
			expect(invertedIndexTest.isValidJson(books)).toBeTruthy();
		});

		it("Should return an invalid JSON Array when parameter is 'invalidJson'",
			() => {
				expect(invertedIndexTest.isValidJson(invalid)).toBeFalsy();
			});

		it("Should return true, when json file is 'empty'", () => {
			expect(invertedIndexTest.isJsonEmpty(bookempty)).toBeTruthy();
		});

		it("Should return true JSON array is not empty", () => {
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
			expect(typeof readindex).toEqual('object');
		});

		it("Should return an object upon reading a second json file",
			() => {
				expect(typeof readindex2).toEqual('object');
			});

		it("Should return correct index when alice key is pass", () => {
			expect(jsonindex.alice).toEqual({ 0: true });
		});

		it("Should return correct index when passing 'and'", () => {
			expect(jsonindex.and).toEqual({ 0: true, 1: true });
		});

		it("Should result correct index upon reading another json file", () => {
			expect(jsonindex2.lord).toEqual({ 1: true, 2: true });
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

		});

});