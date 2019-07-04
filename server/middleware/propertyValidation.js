

class PropertyValidators {
  static postAdValidator(req, res, next) {
    const {
      owner, status, price, state, city, address, type, imageUrl,
    } = req.body;

    if (!owner || !status || !price || !state || !city || !address || !type || !imageUrl) {
      return res.status(400).json({
        status: 'error',
        data: {
          message: 'All required fields are expected',
          requiredFields: ['owner', 'status', 'price', 'state', 'city', 'address', 'type', 'image_url'],
        },
      });
    }
    const userOwner = parseFloat(owner);
    if (!Number(userOwner)) {
      return res.status(400)
        .json({
          status: 'error',
          message: 'Property owner must be a integer',
        });
    }

    if (typeof price !== Number) {
      return res.status(400)
        .json({
          status: 'error',
          message: 'Property price is required to be an integer',
        });
    }

    return next();
  }
}
const { postAdValidator } = PropertyValidators;


export { postAdValidator };
