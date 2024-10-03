// time off controller file
const TimeOff = require('./TimeOffModel');

// Create a new time-off request
{
  /*
const createTimeOffRequest = async (req, res) => {
  try {
    const {
      employee,
      admin,
      name,
      email,
      phone,
      empId,
      requestType,
      startDate,
      endDate,
    } = req.body;

    // Validate required fields
    if (
      !employee ||
      !name ||
      !email ||
      !phone ||
      !empId ||
      !requestType ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Create a new time-off request
    const timeOffRequest = new TimeOff({
      employee,
      admin,
      name,
      email,
      phone,
      empId,
      requestType,
      startDate,
      endDate,
    });

    await timeOffRequest.save();

    // Return success message along with the created request
    return res.status(201).json({
      message: 'Time-off request submitted successfully',
      timeOffRequest,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

*/
}
// Create a new time-off request

// Create a new time-off request
const createTimeOffRequest = async (req, res) => {
  try {
    const {
      employee,
      admin,
      name,
      email,
      phone,
      empId,
      requestType,
      startDate,
      endDate,
    } = req.body;

    // Validate required fields
    if (
      !employee ||
      !name ||
      !email ||
      !phone ||
      !empId ||
      !requestType ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if start date is at least two weeks from now
    const currentDate = new Date();
    const twoWeeksFromNow = new Date(currentDate);
    twoWeeksFromNow.setDate(currentDate.getDate() + 14);
    const startDateObj = new Date(startDate);

    if (startDateObj < twoWeeksFromNow) {
      return res.status(400).json({
        error:
          'All time-off requests need two weeks notice from the current date.',
      });
    }

    // Create a new time-off request
    const timeOffRequest = new TimeOff({
      employee,
      admin,
      name,
      email,
      phone,
      empId,
      requestType,
      startDate,
      endDate,
    });

    await timeOffRequest.save();

    // Return success message along with the created request
    return res.status(201).json({
      message: 'Time-off request submitted successfully',
      timeOffRequest,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all time-off requests
const getAllTimeOffRequests = async (req, res) => {
  try {
    const timeOffRequests = await TimeOff.find()
      .populate('employee', 'name email')
      .populate('admin', 'name email');
    res.status(200).json(timeOffRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single time-off request by ID
const getTimeOffRequestById = async (req, res) => {
  try {
    const { id } = req.params;
    const timeOffRequest = await TimeOff.findById(id)
      .populate('employee', 'name email')
      .populate('admin', 'name email');

    if (!timeOffRequest) {
      return res.status(404).json({ error: 'Time-off request not found' });
    }
    res.status(200).json(timeOffRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
// Update a time-off request (e.g., change status)
const updateTimeOffRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body; // Status could be 'Approved' or 'Rejected'

    const timeOffRequest = await TimeOff.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!timeOffRequest) {
      return res.status(404).json({ error: 'Time-off request not found' });
    }
    res.status(200).json(timeOffRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a time-off request
const deleteTimeOffRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const timeOffRequest = await TimeOff.findByIdAndDelete(id);

    if (!timeOffRequest) {
      return res.status(404).json({ error: 'Time-off request not found' });
    }
    res.status(204).json(); // No content to send back
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Exporting all functions
module.exports = {
  createTimeOffRequest,
  getAllTimeOffRequests,
  getTimeOffRequestById,
  updateTimeOffRequest,
  deleteTimeOffRequest,
};
