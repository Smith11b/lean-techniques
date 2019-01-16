const main = require("./app"); //could've had more test coverage on this one using mocks for the async functions.
const response = [
  {
    id: 1,
    albumId: 1,
    title: "lorem epsom lorem epsom"
  },
  {
    id: 2,
    albumId: 1,
    title: "lorem epsom lorem epsom"
  },
  {
    id: 3,
    albumId: 2,
    title: "lorem epsom lorem epsom"
  },
  {
    id: 4,
    albumId: 2,
    title: "lorem epsom lorem epsom"
  }
];

describe("App Function", () => {
  test("app() Returns an object", () => {
    expect(typeof main.test__Api.app()).toBe("object");
  });
});

describe("Get Photos Function", () => {
  test("getPhotos() returns an object", () => {
    expect(typeof main.test__Api.getPhotos()).toBe("object");
  });
});

describe("CreateLookup Function", () => {
  test("createLookup() returns an object", () => {
    expect(typeof main.test__Api.createLookup(response)).toBe("object");
  });
});

describe("GetInput Function", () => {
  test("get input should return a that matches the input, When prompted enter 'photo'", () => {
    expect(main.test__Api.getInput()).toBe("photo");
  });
});
