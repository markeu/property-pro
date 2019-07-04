import property from '../models/property';
import users from '../models/user';


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

export const getSpecificProperty = (id) => {
  const propertyType = property.filter(props => props.id === id);
  return propertyType;
};


export const changePropStatus = (id, status) => {
  const specificProperty = property.find(props => props.id === id);
  const updateStatus = { ...specificProperty, status };
  const propertyIndex = property.indexOf(specificProperty);
  property.splice(propertyIndex, 1, updateStatus);
  return updateStatus;
};


export const deleteOneProperty = (id) => {
  const specificProperty = property.find(props => props.id === id);

  const index = property.indexOf(specificProperty);
  property.splice(index, 1);
  return specificProperty;
};


export const SpecificPropertyData = (id) => {
  const specificPropData = property.find(props => props.id === id);
  return specificPropData;
};
