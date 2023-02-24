/** Controller */
import Event from "../model/event";

// get : http://localhost:3000/api/events
export async function getEvents(req, res) {
  try {
    const event = await Event.find({});

    if (!event) return res.status(404).json({ error: "Data not Found" });
    res.status(200).json(event);
  } catch (error) {
    res.status(404).json({ error: "Error While Fetching Data" });
  }
}

// get : http://localhost:3000/api/events/1
export async function getEvent(req, res) {
  try {
    const { eventId } = req.query;

    if (eventId) {
      const event = await Event.findById(eventId);
      res.status(200).json(event);
    }
    res.status(404).json({ error: "User not Selected...!" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the User...!" });
  }
}

// post : http://localhost:3000/api/events
export async function postEvent(req, res) {
  try {
    const formData = req.body;
    if (!formData)
      return res.status(404).json({ error: "Form Data Not Provided...!" });
    Event.create(formData, function (err, data) {
      return res.status(200).json(data);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

// put : http://localhost:3000/api/events/1
export async function putEvent(req, res) {
  try {
    const { eventId } = req.query;

    const formData = req.body;

    if (eventId && formData) {
      const event = await Event.findByIdAndUpdate(eventId, formData);
      res.status(200).json(event);
    }

    res.status(404).json({ error: "Form Data Not Provided...!" });
  } catch (error) {
    res.status(404).json({ error: "Error While Updating Data" });
  }
}

// delete : http://localhost:3000/api/events/1
export async function deleteEvent(req, res) {
  try {
    const { eventId } = req.query;

    if (eventId) {
      const event = await Event.findByIdAndDelete(eventId);
      return res.status(200).json({ deleted: eventId });
    }

    res.status(404).json({ error: "Form Data Not Provided...!" });
  } catch {
    res.status(404).json({ error: "Error While Deleting Data" });
  }
}
