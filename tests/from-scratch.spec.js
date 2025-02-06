const {
  Person,
  Artist
} = require('../src/from-scratch');

const testSuiteName = 'Person/Artist Tests';
const log = jest.spyOn(console, 'log').mockImplementation(() => { });

describe(testSuiteName, () => {
  it('Person.prototype - creates a person instance with the correct properties', () => {
    const p = new Person('Dorothy', '11111');
    expect(p.name).toEqual('Dorothy');
    expect(p.uid).toEqual('11111');
  })

  it('Person.prototype - handles invalid constructor arguments', () => {
    // In response to non-string `name` arguments,
    //   throws a `TypeError`
    expect(() => { new Person(123, '12345') }).toThrow(TypeError);
    // In response to non-string `uid` arguments,
    //   throws a `TypeError`
    expect(() => { new Person('TestPerson', 123) }).toThrow(TypeError);
    // In response to `uid` arguments that are of length > 5,
    //   throws a `RangeError`
    expect(() => { new Person('TestPerson', '111111') }).toThrow(RangeError);
    // In response to `uid` arguments that contain non-digits,
    //   throws a `RangeError`
    expect(() => { new Person('TestPerson', 'asdf1') }).toThrow(RangeError);
  })

  it('Person.prototype - returns the correct type based on uid', () => {
    // Person type is determined by the first index of `uid`.
    // '*...' (any number) means the Person is just an Attendee
    // '8...' means the Person is an Artist
    const p = new Person('test', '81231');
    const r = new Person('test', '71231');
    expect(p.getType()).toEqual('Artist');
    expect(r.getType()).toEqual('Attendee');
  })

  it('Artist - utilizes static lists properly', () => {
    // Booth size is determined by the first index of `boothId`.
    // '1...' means big booth
    // '2...' means small booth
    const a = new Artist('Meodai', '82222', '1325');
    const b = new Artist('GizemV', '85413', '2222');
    const c = new Artist('SSkade', '89923', '2090');
    // with the 3 artists above, 1 big, 2 small
    expect(Artist.getBigBooths().length).toEqual(1);
    expect(Artist.getSmallBooths().length).toEqual(2);
  })

  it('Artist.prototype - creates an artist instance with the correct properties', () => {
    const artist = new Artist('Namie', '86231', '2817');

    // Artist.prototype.#grossSales is private,
    //   so we use .getNetSales() to check if it's initialized
    //   in the same way, we check if .grossSales is private
    //   by attempting to access it directly.
    expect(artist.boothId).toEqual('2817');
    expect(artist.getNetSales()).toEqual(0);
    expect(artist.grossSales).toEqual(undefined);
    expect(typeof artist.stock).toEqual('object');
  })

  it('Artist.prototype - handles invalid constructor arguments', () => {
    // In response to non-string `boothId` arguments,
    //   throws new `TypeError`
    expect(() => { new Artist('TestArtist', '81234', 123) }).toThrow(TypeError);
    // In response to `boothId` arguments that are of length > 4
    //   throws new `RangeError`
    expect(() => { new Artist('TestArtist', '81234', '11111') }).toThrow(RangeError);
    // In response to `boothId` arguments that does not start with "1..." or "2..."
    //   throws new `RangeError`
    expect(() => { new Artist('TestArtist', '81234', '5234') }).toThrow(RangeError);
  })

  it('Artist.prototype.newItem() - simulates adding a new item type', () => {
    const artist = new Artist('Namie', '86231', '2817');
    const type = 'shirt';
    const price = 5;

    expect(artist.newItem(type, price)).toEqual({ price: price, qty: 0 });
    expect(log).lastCalledWith(`${artist.name} has put up ${type} for sale!`);
  })

  it('Artist.prototype.newItem() - prevents adding a new item where it should not be possible', () => {
    const artist = new Artist('Namie', '86231', '2817');
    const type = 'shirt';
    const price = 5;

    // Unhappy path is mostly handling for duplicate types
    artist.newItem(type, price);
    expect(artist.newItem(type, price)).toEqual(null);
    expect(log).lastCalledWith(`${artist.name} already sells ${type}.\nNo new items added.`);
  })

  it('Artist.prototype.newItem() - handles invalid argument types', () => {
    const artist = new Artist('Namie', '86231', '2817');
    // In response to non-string `type` arguments,
    //   throws a `TypeError`
    expect(() => { artist.newItem(123, 5) }).toThrow(TypeError);
    // In response to non-number `price` arguments,
    //   throws a `TypeError`
    expect(() => { artist.newItem('shirt', 'thisIsWrong') }).toThrow(TypeError);
    // In response to `price` arguments that are either negative or zero,
    //   throws a `RangeError`;
    expect(() => { artist.newItem('shirt', 0) }).toThrow(RangeError);
    expect(() => { artist.newItem('shirt', -1) }).toThrow(RangeError);
  })

  it('Artist.prototype.restockItem() - simulates restocking an item type', () => {
    const artist = new Artist('Namie', '86231', '2817');
    const type = 'shirt';
    const price = 5;
    artist.newItem(type, price);
    const qty = 50;
    const returnObj = artist.restockItem(type, qty);

    expect(returnObj).toEqual({ price: price, qty: qty });
    expect(log).lastCalledWith(`${artist.name} successfully restocked!.\n${type} current qty: ${returnObj.qty}`);
  })

  it('Artist.prototype.restockItem() - prevents restocking where it should not be possible', () => {
    const artist = new Artist('Namie', '86231', '2817');
    const type1 = 'shirt';
    const price = 5;
    artist.newItem(type1, price);
    const type2 = 'tote';
    const qty = 50;
    const returnObj = artist.restockItem(type2, qty);

    expect(returnObj).toEqual(null);
    expect(log).lastCalledWith(`${artist.name} does not sell ${type2}.\nRestock invalid!`);
  })

  it('Artist.prototype.restockItem() - handles invalid argument types', () => {
    const artist = new Artist('Namie', '86231', '2817');
    artist.newItem('shirt', 5);
    // In response to non-string `type` arguments,
    //   throws a `TypeError`
    expect(() => { artist.restockItem(123, 5) }).toThrow(TypeError);
    // In response to non-number `qty` arguments,
    //   throws a `TypeError`
    expect(() => { artist.restockItem('shirt', 'thisIsWrong') }).toThrow(TypeError);
    // In response to `qty` arguments that are either negative or zero,
    //   throws a `RangeError`;
    expect(() => { artist.restockItem('shirt', 0) }).toThrow(RangeError);
    expect(() => { artist.restockItem('shirt', -1) }).toThrow(RangeError);
  })

  it('Artist.prototype.sellItem() - simulates selling an item type', () => {
    const artist = new Artist('Namie', '86231', '2817');
    const type = 'shirt';
    const price = 5;
    artist.newItem(type, price);
    const qty = 50;
    artist.restockItem(type, qty);
    const returnObj = artist.sellItem(type, 3);
    
    expect(returnObj).toEqual({ price: price, qty: 50-3 });
    expect(log).lastCalledWith(`${artist.name} sold ${type} for ${returnObj.price}!\nQty remaining: ${returnObj.qty}`);
  })

  it('Artist.prototype.sellItem() - prevents selling where it should not be possible', () => {
    const artist = new Artist('Namie', '86231', '2817');
    const type1 = 'shirt';
    const price = 5;
    artist.newItem(type1, price);

    // When the item type is not for sale (invalid)
    const type2 = 'tote';
    const returnObj1 = artist.sellItem(type2, 3);
    expect(returnObj1).toEqual(null);
    expect(log).lastCalledWith(`${artist.name} does not sell ${type2}!\nSale invalid!`);

    // When the item type is out of stock
    const returnObj2 = artist.sellItem(type1);
    expect(returnObj1).toEqual(null);
    expect(log).lastCalledWith(`${artist.name} ran out of ${type1}!`);
  })

  it('Artist.prototype.sellItem() - handles invalid argument types', () => {
    const artist = new Artist('Namie', '86231', '2817');
    artist.newItem('shirt', 5);
    artist.restockItem('shirt', 10);
    // In response to non-string `type` arguments,
    //   throws a `TypeError`;
    expect(() => { artist.sellItem(123, 5) }).toThrow(TypeError);
    // In response to non-number `qty` arguments,
    //   throws a `TypeError`;
    expect(() => { artist.sellItem('shirt', 'thisIsWrong') }).toThrow(TypeError);
    // In response to `qty` arguments that are either negative or zero,
    //   throws a `RangeError`;
    expect(() => { artist.sellItem('shirt', -123) }).toThrow(RangeError);
  })

  it('Artist.prototype.getNetSales() - returns the computed net sales of an instance of Artist using the gross sales and the correct fees', () => {
    // On small artist booths, the fees cut is 25%
    const artistS = new Artist('Namie', '86231', '2817');
    const type = 'shirt';
    const price = 5;
    const qty = 50;
    artistS.newItem(type, price);
    artistS.restockItem(type, qty)
    artistS.sellItem(type, 10);
    expect(artistS.getNetSales()).toEqual(10*5*0.75);

    // On big artist booths, the fees cut is 35%
    const artistB = new Artist('NotNamie', '86232', '1817');
    artistB.newItem(type, price);
    artistB.restockItem(type, qty)
    artistB.sellItem(type, 10);
    expect(artistB.getNetSales()).toEqual(10*5*0.65);
  })

  it('Artist.prototype.getAvgPrice() - returns the average price of all items types sold', () => {
    const artist = new Artist('Namie', '86231', '2817');
    artist.newItem('shirt', 5);
    artist.newItem('tote', 15);
    artist.newItem('pin', 3);
    artist.newItem('poster', 25);

    expect(artist.getAvgPrice()).toEqual((5+15+3+25)/4);
  })

  it('Artist - Artist inherits from Person', () => {
    const artist = new Artist('IRISyi', '85698', '2662');
    expect(artist instanceof Person).toBe(true);
    expect(artist.getType()).toEqual('Artist');
  })

  it('Artist - uses inheritance properly', () => {
    const artist = new Artist('Namie', '86231', '2817');

    // The length of a function is the number of parameters
    // Artist parameter constructor should contain exactly 3 parameters
    expect(artist.constructor.length).toBe(3);

    // Artist constructor should use super
    expect(artist.constructor.toString().includes('super')).toBeTruthy();

    // do some string manipulation to grab the arguments you invoke
    // super with. In the third step, we remove the beginning and ending
    // parentheses, remove white spaces, and then split on the commas.
    const superCallText = artist.constructor.toString().match(/super\(.*\)/g)[0];
    // .match() returns an Array but we need it as a String
    const argsListText = superCallText.match(/\(.*\)/g)[0];
    const argValues = argsListText.replaceAll(" ", "").slice(1, -1).split(',')

    // check to make sure that super takes in exactly TWO arguments
    expect(argValues.length).toEqual(2);
  });
});

