import ApiError from '../exceptions/api-error.js';

// eslint-disable-next-line no-unused-vars
export default function(err, req, res, next) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({message: err.message, errors: err.errors});
  }
  return res.status(500).json({message: 'Unexpected server Error'});
}