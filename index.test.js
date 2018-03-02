const getTexture = require('./index');

// These are the easy, non-edge cases.
test('80% clay, 10% sand should be a Heavy Clay', () => {
  expect(getTexture(80, 10)).toBe('Heavy Clay');
});

test('50% clay, 20% sand should be a Clay', () => {
  expect(getTexture(50, 20)).toBe('Clay');
});

test('50% clay, 5% sand should be a Silty Clay', () => {
  expect(getTexture(50, 5)).toBe('Silty Clay');
});

test('30% clay, 10% sand should be a Silty Clay Loam', () => {
  expect(getTexture(30, 10)).toBe('Silty Clay Loam');
});

test('30% clay, 30% sand should be a Clay Loam', () => {
  expect(getTexture(30, 30)).toBe('Clay Loam');
});

test('40% clay, 50% sand should be Sandy Clay', () => {
  expect(getTexture(40, 50)).toBe('Sandy Clay');
});

test('30% clay, 60% sand should be Sandy Clay Loam', () => {
  expect(getTexture(30, 60)).toBe('Sandy Clay Loam');
});

test('20% clay, 20% sand should be Silt Loam', () => {
  expect(getTexture(20, 20)).toBe('Silt Loam');
});

test('5% clay, 5% sand should be Silt', () => {
  expect(getTexture(5, 5)).toBe('Silt');
});

test('20% clay, 45% sand should be Loam', () => {
  expect(getTexture(20, 45)).toBe('Loam');
});

test('10% clay, 60% sand should be Sandy Loam', () => {
  expect(getTexture(10, 60)).toBe('Sandy Loam');
});

test('5% clay, 80% sand should be Loamy Sand', () => {
  expect(getTexture(5, 80)).toBe('Loamy Sand');
});

test('5% clay, 90% sand should be Sand', () => {
  expect(getTexture(5, 90)).toBe('Sand');
});
