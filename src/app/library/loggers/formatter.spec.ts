import {eicformatlog} from "./formatter";

describe('Formatter', () => {

  it('Should formatlog contain class name and message', () => {
    expect(eicformatlog("class", "message")).toMatch(/class. message/);
  });

  it('Should formatlog contain class name and message like object', () => {
    expect(eicformatlog("class", {message: "message"}, true))
      .toMatch(/class. {"message":"message"}/);
  });
});
