var main =  require('./app');

test("calls with axios and returns a Json array from ", () => {
   expect(main.init())
  });