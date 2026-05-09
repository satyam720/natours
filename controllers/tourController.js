import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const checkBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'fail',
      message: 'Missing name or price',
    });
  }
  next();
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    // results: tours.length,
    // data: {
    //   tours,
    // },
  });
};

const getTour = (req, res) => {
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // if (!tour) {
  //   return res.status(404).json({
  //     status: 'fail',
  //     message: 'Tour not found',
  //   });
  // }
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour,
    // },
  });
};

const createTour = (req, res) => {
  res.status(201).json({
    status: 'success',
    // data: {
    //   tour: newTour,
    // },
  });
};

const updateTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour: updatedTour,
    // },
  });
};

const deleteTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    // data: {
    //   tour: null,
    // },
  });
};

export {
  checkBody,
  getAllTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
};
