const BASE_URL = "http://localhost:3000";

export type formDataType = {
  id: string;
  sponsor: string;
  city: string;
  state: string;
  address: string;
  complement: string;
  email: string;
  phone: string;
  date: string;
  eventName: string;
};

//all events
export const getUsers = async () => {
  const reponse = await fetch(`${BASE_URL}/api/events`);
  const json = await reponse.json();

  return json;
};

//single event
export const getUser = async (eventId: string) => {
  const response = await fetch(`${BASE_URL}/api/events/${eventId}`);
  const json = await response.json();

  if (json) return json;
  return {};
};

//posting a new user
export async function addUser(formData: formDataType) {
  try {
    const Options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const response = await fetch(`${BASE_URL}/api/events`, Options);
    const json = await response.json();

    return json;
  } catch (error) {
    return error;
  }
}

//updating a user

export async function updateUser(eventId, formData) {
  const Options = {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  };

  const response = await fetch(
    `${BASE_URL}/api/events/?eventId=${eventId}`,
    Options
  );
  const json = await response.json();
  return json;
}

//deleting a user

export async function deleteUser(eventId: string) {
  const Options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(
    `${BASE_URL}/api/events/?eventId=${eventId}`,
    Options
  );
  const json = await response.json();

  return json;
}
