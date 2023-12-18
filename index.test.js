const sum = (a, b) => {
  const aCastedToNumber = Number(a);
  const bCastedToNumber = Number(b);
  if (Number.isNaN(aCastedToNumber) || Number.isNaN(bCastedToNumber)) {
    throw new Error('Arguments should be able to be casted to number');
  }
  return aCastedToNumber + bCastedToNumber;
};

describe('sum', () => {
  it('sums 2 and 2 result 4', () => {
    const result = sum(2, 2);

    expect(result).toBe(4);
  });

  it('sums 2 and 3 result 5', () => {
    const result = sum(2, 3);

    expect(result).toBe(5);
  });

  it('sums "2" and "3" result 5', () => {
    const result = sum('2', '3');

    expect(result).toBe(5);
  });

  it("throws error if both arguments can't be casted to number", () => {
    expect(() => sum({}, 'Hello')).toThrow();
  });
});
