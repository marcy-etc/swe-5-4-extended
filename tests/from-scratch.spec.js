const {
  Person,
  Artist
} = require('../src/from-scratch');

const testSuiteName = 'Person Tests';
const log = jest.spyOn(console, 'log').mockImplementation(() => { });

describe(testSuiteName, () => {
  it('Person.prototype - creates a person object with a name and uid property', () => {
    const p = new Person('Dorothy', '11111');
    expect(p.name).toEqual('Dorothy');
    expect(p.uid).toEqual('11111');
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

  it('Artist.prototype - creates an artist object with the correct properties', () => {
    const artist = new Artist('Namie', '86231', '2817');

    // Artist.prototype.#grossSales is private,
    // so we use .getNetSales() to check if it's initialized
    expect(artist.boothId).toEqual('2817');
    expect(artist.getNetSales()).toEqual(0);
    expect(typeof artist.stock).toEqual('object');
  })

  it('Artist.prototype.getNetSales() - works as intended', () => {
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

  it('Artist.prototype.getAvgPrice() - works as intended', () => {
    const artistS = new Artist('Namie', '86231', '2817');
    artistS.newItem('shirt', 5);
    artistS.newItem('tote', 15);
    artistS.newItem('pin', 3);
    artistS.newItem('poster', 25);

    expect(artistS.getAvgPrice()).toEqual((5+15+3+25)/4);
  })
  
  it('Artist.prototype.newItem() - adds a new item type properly (happy path)', () => {
    const artist = new Artist('Namie', '86231', '2817');
    const type = 'shirt';
    const price = 5;

    expect(artist.newItem(type, price)).toEqual({ price: price, qty: 0 });
    expect(log).lastCalledWith(`${artist.name} has put up ${type} for sale!`);
  })

  it('Artist.prototype.newItem() - accounts for unhappy path :(', () => {
    const artist = new Artist('Namie', '86231', '2817');
    const type = 'shirt';
    const price = 5;

    // Unhappy path is mostly handling for duplicate types
    artist.newItem(type, price);
    expect(artist.newItem(type, price)).toEqual(null);
    expect(log).lastCalledWith(`${artist.name} already sells ${type}.\nNo new items added.`);
  })

  it('Artist.prototype.restockItem() - restocks an item type properly (happy path)', () => {
    const artist = new Artist('Namie', '86231', '2817');
    const type = 'shirt';
    const price = 5;
    artist.newItem(type, price);
    const qty = 50;
    const returnObj = artist.restockItem(type, qty);

    expect(returnObj).toEqual({ price: price, qty: qty });
    expect(log).lastCalledWith(`${artist.name} successfully restocked!.\n${type} current qty: ${returnObj.qty}`);
  })

  it('Artist.prototype.restockItem() - accounts for unhappy path :(', () => {
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

  it('Artist.prototype.sellItem() - sells an item properly (happy path)', () => {
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

  it('Artist.prototype.sellItem() - accounts for unhappy paths :(', () => {
    const artist = new Artist('Namie', '86231', '2817');
    const type1 = 'shirt';
    const price = 5;
    artist.newItem(type1, price);

    // When the item type is not for sale (invalid)
    const type2 = 'tote';
    const returnObj1 = artist.sellItem(type2, 3);
    expect(returnObj1).toEqual(null);
    expect(log).lastCalledWith(`${artist.name} does not sell ${type2}!\nSale invalid!`);

    // When the item type os out of stock
    const returnObj2 = artist.sellItem(type1);
    expect(returnObj1).toEqual(null);
    expect(log).lastCalledWith(`${artist.name} ran out of ${type1}!`);
  })

  it('Artist - Artist inherits from Person', () => {
    const artist = new Artist('IRISyi', '85698', '2662');
    expect(artist instanceof Person).toBe(true);
    expect(artist.getType()).toEqual('Artist');
  })
});
