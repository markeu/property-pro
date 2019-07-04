import property from '../models/property';
import users from '../models/user';


// eslint-disable-next-line import/prefer-default-export
export const postAd = (data) => {
  const newPropAd = {
    id: property.length + 1,
    owner: users[users.length - 1].id,
    status: 'available',
    price: JSON.parse(10000),
    state: data.state,
    city: data.city,
    address: users[users.length - 1].address,
    type: data.type,
    createdOn: Date(),
    imageUrl: data.imageUrl,
    ownerEmail: users[users.length - 1].ownerEmail,
    ownerPhoneNumber: users[users.length - 1].ownerPhoneNumber,
  };
  property.push(newPropAd);
  return newPropAd;
};