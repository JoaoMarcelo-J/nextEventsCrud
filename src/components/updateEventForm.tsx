import { BiBrush } from "react-icons/bi";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { formDataType, getUser, updateUser, getUsers } from "../lib/helper";

export default function UpdateEventForm({ formId, formData, setFormData }) {
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery(["event", formId], () =>
    getUser(formId)
  );

  const UpdateMutation = useMutation((newData) => updateUser(formId, newData), {
    onSuccess: async (data) => {
      // queryClient.setQueryData('users', (old) => [data])
      queryClient.prefetchQuery("event", getUsers);
    },
  });

  if (isLoading) return <div>Loading...!</div>;
  if (isError) return <div>Error</div>;

  const {
    sponsor,
    city,
    state,
    address,
    complement,
    email,
    phone,
    date,
    eventName,
  } = data;

  const handleSubmit = async (e) => {
    e.preventDefault();

    let updated = Object.assign({}, data, formData);
    await UpdateMutation.mutate(updated);
  };

  return (
    <form className="grid lg:grid-cols-2 w-4/6 gap-4" onSubmit={handleSubmit}>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={eventName}
          name="eventName"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Event Name"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={sponsor}
          name="sponsor"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Sponsor"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={city}
          name="city"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="City"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={state}
          name="state"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="State"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={address}
          name="address"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Address"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={complement}
          name="complement"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Complement"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={email}
          name="email"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Email"
        />
      </div>
      <div className="input-type">
        <input
          type="text"
          onChange={setFormData}
          defaultValue={phone}
          name="phone"
          className="border w-full px-5 py-3 focus:outline-none rounded-md"
          placeholder="Phone"
        />
      </div>
      <div className="input-type">
        <input
          type="date"
          onChange={setFormData}
          defaultValue={date}
          name="date"
          className="border px-5 py-3 focus:outline-none rounded-md"
        />
      </div>

      <button className="flex justify-center text-md w-2/6 bg-yellow-400  text-white px-4 py-4 border rounded-md hover:bg-gray-50 hover:border-green-500 hover:text-green-500">
        Edit{" "}
        <span className="px-1">
          <BiBrush size={24}></BiBrush>
        </span>
      </button>
    </form>
  );
}
