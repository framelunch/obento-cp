const Cp = require('./index');

it('cp.add', () => {
  var cp = new Cp();
  var mock1 = jest.fn();
  var mock2 = jest.fn();

  cp.add(mock1);
  cp.add(mock2);
  cp.update();

  expect(cp.id).toBe(1);
  expect(cp.length).toBe(2);
  expect(mock1.mock.calls.length).toBe(1);
  expect(mock2.mock.calls.length).toBe(1);
});

it('cp.remove', () => {
  var cp = new Cp();
  var mock1 = jest.fn();
  var mock2 = jest.fn();

  cp.add(mock1);
  cp.add(mock2);
  cp.remove(mock1);
  cp.update();

  expect(cp.id).toBe(2);
  expect(cp.length).toBe(1);
  expect(mock1.mock.calls.length).toBe(0);
  expect(mock2.mock.calls.length).toBe(1);
});
