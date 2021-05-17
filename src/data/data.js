import faker from "faker";

faker.seed(123);

export const data = [...Array(50)].map((item) => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  image: faker.random.image(),
  fastDelivery : faker.datatype.boolean(),
  inStock: faker.datatype.boolean(),
  rating: faker.random.arrayElements([1, 2, 3, 4, 5]),
  level: faker.random.arrayElements([
    "amateur",
    "beginner",
    "intermediate",
    "professional"
  ]),
  bikes: faker.random.arrayElements([
    "mountain bikes",
    "road bikes",
    "hybrid bikes",
    "kids bikes"
  ]),
  count: 1,
}))