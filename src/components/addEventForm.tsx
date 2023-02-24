import { useReducer } from "react";
import { BiPlus } from "react-icons/bi";
import { Success } from "./success";
import Bug from "./bug";
import { useQueryClient, useMutation } from "react-query";
import { addUser, formDataType, getUsers } from "../lib/helper";

export default function AddEventForm({ formData, setFormData }) {
  const queryClient = useQueryClient();

  const addMutation = useMutation(addUser, {
    onSuccess: () => {
      queryClient.prefetchQuery("event", getUsers);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (Object.keys(formData).length == 0)
      return console.log("Don't have Form Data");
    let {
      sponsor,
      city,
      state,
      address,
      complement,
      email,
      phone,
      date,
      eventName,
    } = formData;

    const model = {
      sponsor,
      city,
      state,
      address,
      complement,
      email,
      phone,
      date,
      eventName,
    } as formDataType;

    addMutation.mutate(model);
  };

  if (addMutation.isLoading) return <div>Loading!</div>;
  if (addMutation.isError) return <Bug message={"Erroooorr"}></Bug>;
  if (addMutation.isSuccess)
    return <Success message={"Added Successfuly"}></Success>;

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="eventName"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Event Name"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="sponsor"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Sponsor"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="city"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="City"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="state"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="State"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="address"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Address"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="complement"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Complement"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          name="phone"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Phone"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          name="date"
          className="border px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <button className="flex justify-center text-md w-2/6 bg-green-500  text-white px-4 py-4 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Add{" "}
        <span className="px-1">
          <BiPlus size={24}></BiPlus>
        </span>
      </button>
    </form>
  );
}
