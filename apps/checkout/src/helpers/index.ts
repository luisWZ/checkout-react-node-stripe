import { faker } from '@faker-js/faker/locale/es_MX';

export const generateFakeUserData = () => {
  const userId = faker.datatype.uuid();
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();
  const email = faker.internet.email(firstName, lastName).toLowerCase();
  const name = `${firstName} ${lastName}`;

  const user = { name, email };

  return { userId, user };
};
