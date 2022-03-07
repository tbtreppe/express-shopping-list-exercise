const items = require("./fakeDb");

class Item {
  constructor(name, price) {
    this.name = name;
    this.price = price;

    items.push(this);
  }

  findAll() {
    return items;
  }

  update(name, data) {
    let foundItem = Item.find(name);
    if (foundItem === undefined) {
      throw { message: "Not Found", status: 404 };
    }
    foundItem.name = data.name;
    foundItem.price = data.price;

    return foundItem;
  }

  find(name) {
    const foundItem = items.find((f) => f.name === name);
    if (foundItem === undefined) {
      throw { message: "Not Found", status: 404 };
    }
    return foundItem;
  }
  remove(name) {
    let foundIdx = items.findIndex((f) => f.name === name);
    if (foundIdx === undefined) {
      throw { message: "Not Found", status: 404 };
    }
    items.splice(foundIdx, 1);
  }
}

module.exports = Item;
