import property from '../models/v1 models/property';


export const postAd = (data) => {
  const newPropAd = {
    id: property.length + 1,
    owner: data.id,
    status: data.status,
    price: data.price,
    state: data.state,
    city: data.city,
    address: data.address,
    type: data.type,
    createdOn: Date(),
    image_url: data.image_url,
    owner_email: data.owner_email,
    owner_phone_number: data.owner_phone_number,
  };
  property.push(newPropAd);
  return newPropAd;
};

export const getAllProperty = () => property;

export const getSpecificProperty = (id) => {
  const propertyType = property.filter(props => props.id === id);
  return propertyType;
};

export const getSpecificPropType = (propType) => {
  const propertyType = property.filter(props => props.type === propType);
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
