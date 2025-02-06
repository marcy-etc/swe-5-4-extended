# Assignment

- [Setup](#setup)
- [Testing Your Code](#testing-your-code)
  - [Submitting On Time](#submitting-on-time)
  - [playground.js](#playgroundjs)
  - [npm test](#npm-test)
- [Questions](#questions)

## Setup

For guidance on setting up and submitting this assignment, refer to the Marcy lab School Docs How-To guide for [Working with Short Response and Coding Assignments](https://marcylabschool.gitbook.io/marcy-lab-school-docs/fullstack-curriculum/how-tos/working-with-assignments#how-to-work-on-assignments).

After cloning your repository, make sure to run the following commands:

```sh
npm i
git checkout -b draft
npm t
```

## Testing Your Code

### Submitting On Time

You have to understand that "grades" don't exist at Marcy. We only need performance data in order to know how you're doing, and make sure the people who need help get it as quickly as they can. It's ok if you didn't finish by the deadline! Just show us what you have. We'll have office hours and reviews, and we want to know what you are all struggling with so we can use those meetings effectively. **This is not about grades, its about seeing what you know, and where we can help!**

### playground.js

The most straightforward way to test your code is to test your code by hand as you work. Invoke your functions and use `console.log()` to print out the results. Then, `cd` into the `src/` directory and use the `node <file_name>` command to run your JavaScript files.

You can also create what's called a "playground" (or "sandbox") file where you import any code you need, and then mess around with that file. We've included one in the `src` directory so you can see it. Run that program using `node src/playground.js`.

### npm test

Before submitting your code, make sure you got things right by running the provided automated tests.

You can do this using the commands:

```sh
npm test # run the automated tests
npm run test:w # run the automated tests and rerun them each time you save a change
```

You will know that you have "completed" an assignment once you have passed 75% or more of the automated tests!

## Questions

### Person
The `Person` class is a simple representation of an individual in a hypothetical comic convention.

It has the following static properties/methods:
- `Person.rsvpList` - an array containing every created instance of `Person`

It has the following instance properties/methods:
- `this.name`
- `this.uid`
- `Person.prototype.getType()` - a function that returns the `type` of `this` instance of `Person`

Basic structure:
```js
{
  name: 'Dave',
  uid: '12710'
}
```

### Artist
The `Artist` class is an extension of `Person`, and serves as a representation of an artist that owns a booth in a hypothetical comic convention.

It has the following static properties/methods:
- `Artist.#artistList` - an array containing every created instance of `Artist`
- `Artist.getBigBooths()` - returns the number of artists that own big booth spots
- `Artist.getSmallBooths()` - returns the number of artists that own small booth spots
- and everything else inherited from `Person`

It has the following instance properties/methods:
- `Artist.prototype.boothId`
- `Artist.prototype.#grossSales`
- `Artist.prototype.stock`
- `Artist.prototype.getNetSales()` - computes the net sales, also accounts for booth type (small and big booth types have different fees %)
- `Artist.prototype.getItemTypes()` - returns all the types of items that `this` instance of `Artist` sells
- `Artist.prototype.getAvgPrice()` - returns the average price of items `this` `Artist` has for sale
- `Artist.prototype.newItem(type, price)` - creates a new item type under `this` `Artist`
- `Artist.prototype.restockItem(type, qty)` - adds stock to a specified item type under `this` `Artist`
- `Artist.prototype.sellItem(type, qty=1)` - sells an item type under `this` `Artist`
- and everything else inherited from `Person.prototype`

Basic structure:
```js
{
  name: 'Luigi',
  uid: '82314',
  boothId: '1234',
  #grossSales: 151.00,
  stock = {
    'shirt': {
      price: 5,
      qty: 47,
    },
    'tote': {
      price: 15,
      qty: 8,
    },
    'pin': {
      price: 3,
      qty: 13,
    },
    'poster': {
      price: 25,
      qty: 2,
    }
  }
}
```

