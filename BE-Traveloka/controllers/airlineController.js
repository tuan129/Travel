const Airline = require('../models/airlinesModel');

// Lớp State cơ bản
class AirlineState {
  handle() {
    throw new Error('Phương thức handle() cần được triển khai.');
  }
}

// Trạng thái tìm kiếm hãng bay
class SearchState extends AirlineState {
  async handle(req, res) {
    try {
      const { keyword } = req.query;
      const airlines = await Airline.find({
        nameAirline: { $regex: keyword, $options: 'i' },
      });

      res.status(200).json({
        status: 'success',
        results: airlines.length,
        data: {
          airlines,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: 'Airline not found',
      });
    }
  }
}

// Trạng thái lấy tất cả hãng bay
class GetAllState extends AirlineState {
  async handle(req, res) {
    try {
      const airlines = await Airline.find(req.query);

      res.status(200).json({
        status: 'success',
        results: airlines.length,
        data: {
          airlines,
        },
      });
    } catch (err) {
      res.status(404).json({
        status: 'fail',
        message: 'Airline not found',
      });
    }
  }
}

// Trạng thái tạo hãng bay
class CreateState extends AirlineState {
  async handle(req, res) {
    try {
      const newAirline = await Airline.create(req.body);

      res.status(200).json({
        status: 'success',
        data: {
          airline: newAirline,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  }
}

// Trạng thái cập nhật hãng bay
class UpdateState extends AirlineState {
  async handle(req, res) {
    try {
      const airline = await Airline.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: 'success',
        data: {
          airline,
        },
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  }
}

// Trạng thái xóa hãng bay
class DeleteState extends AirlineState {
  async handle(req, res) {
    try {
      await Airline.findByIdAndDelete(req.params.id);
      res.status(200).json({
        status: 'success',
        data: null,
      });
    } catch (err) {
      res.status(400).json({
        status: 'fail',
        message: err.message,
      });
    }
  }
}

// Lớp Context quản lý trạng thái
class AirlineContext {
  setState(state) {
    this.state = state;
  }

  execute(req, res) {
    if (this.state) {
      this.state.handle(req, res);
    } else {
      res.status(500).json({ status: 'fail', message: 'No state set' });
    }
  }
}

// Tạo instance của context
const airlineContext = new AirlineContext();

// Các controller sử dụng Context để gọi trạng thái phù hợp
const searchAirline = (req, res) => {
  airlineContext.setState(new SearchState());
  airlineContext.execute(req, res);
};

const getAllAirlines = (req, res) => {
  airlineContext.setState(new GetAllState());
  airlineContext.execute(req, res);
};

const createAirline = (req, res) => {
  airlineContext.setState(new CreateState());
  airlineContext.execute(req, res);
};

const updateAirline = (req, res) => {
  airlineContext.setState(new UpdateState());
  airlineContext.execute(req, res);
};

const deleteAirline = (req, res) => {
  airlineContext.setState(new DeleteState());
  airlineContext.execute(req, res);
};

// Xuất module
module.exports = {
  searchAirline,
  getAllAirlines,
  createAirline,
  updateAirline,
  deleteAirline,
};
