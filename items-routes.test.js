process.env.NODE_ENV = "test";

const request = require("supertest");

const app = require("./app");
const items = require("./fakeDb");

let item = { name: "milk", price: 2 };

beforeEach(async function () {
  items.push(milk);
});

afterEach(async function () {
  items.length = 0;
});

describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const resp = await request(app).get(`/items`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ items: [milk] });
  });
});
// end

/** GET /items/[name] - return data about one item: `{item: item}` */

describe("GET /items/:name", function () {
  test("Gets a single item", async function () {
    const resp = await request(app).get(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);

    expect(resp.body).toEqual({ name: milk });
  });

  test("Responds with 404 if can't find item", async function () {
    const resp = await request(app).get(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** POST /items - create item from data; return `{item: item}` */

describe("POST /items", function () {
  test("Creates a new item", async function () {
    const resp = await request(app).post(`/items`).send({
      name: "apple",
      price: 0.99,
    });
    expect(resp.statusCode).toBe(201);
    expect(resp.body).toEqual({
      item: { name: "apple", price: "$.99" },
    });
  });
});
// end

/** PATCH /items/[name] - update item; return `{item: item}` */

describe("PATCH /items/:name", function () {
  test("Updates a single item", async function () {
    const resp = await request(app).patch(`/items/${item.name}`).send({
      name: "Skim-milk",
    });
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({
      name: { name: "Skim-milk" },
    });
  });

  test("Responds with 404 if id invalid", async function () {
    const resp = await request(app).patch(`/items/0`);
    expect(resp.statusCode).toBe(404);
  });
});
// end

/** DELETE /items/[name] - delete item,
 *  return `{message: "Item deleted"}` */

describe("DELETE /items/:name", function () {
  test("Deletes a single item", async function () {
    const resp = await request(app).delete(`/items/${item.name}`);
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ message: "Deleted" });
  });
});
// end
