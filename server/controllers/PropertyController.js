import {
  postAd,
} from '../helpers/propertyHelper';


// Post properties.
class propertyController {
  static createPropAd(req, res) {
    const newAd = postAd(req.body);
    return res.status(201).json({
      status: 'success',
      data: newAd,
    });
  }
}
export default propertyController;
