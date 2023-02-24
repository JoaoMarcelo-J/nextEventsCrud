import { Schema, models, model } from "mongoose";

const eventSchema = new Schema({
  sponsor: String,
  email: String,
  date: String,
  eventName: String,
  city: String,
  state: String,
  address: String,
  complement: String,
  phone: String,
});

const Event = models.event || model("event", eventSchema);

export default Event;
