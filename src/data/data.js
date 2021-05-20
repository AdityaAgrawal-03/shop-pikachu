import faker from "faker";

faker.seed(123);

export const data = [...Array(50)].map((item) => ({
  id: faker.datatype.uuid(),
  name: faker.commerce.productName(),
  price: faker.commerce.price(),
  material: faker.commerce.productMaterial(),
  image: faker.random.image(),
  fastDelivery: faker.datatype.boolean(),
  inStock: faker.datatype.boolean(),
  rating: faker.random.arrayElements([1, 2, 3, 4, 5]),
  level: faker.random.arrayElement([
    "amateur",
    "beginner",
    "intermediate",
    "professional",
  ]),
  bikes: faker.random.arrayElement([
    { mountainBike: true },
    { roadBike: true },
    { hybridBike: true },
    { kidsBike: true },
  ]),
  count: 1,
}));
