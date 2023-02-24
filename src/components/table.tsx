import { getUsers } from "../lib/helper";
import { useQuery } from "react-query";
import { useSelector, useDispatch } from "react-redux";
import { BiEdit, BiTrashAlt } from "react-icons/bi";
import {
  toggleChangeAction,
  updateAction,
  deleteAction,
} from "../redux/reducer";

export function Table() {
  const state = useSelector((state: any) => state.app.client.toggleForm);

  const { isLoading, isError, data, error } = useQuery("event", getUsers);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <>Error: {error}</>;

  return (
    <table className="table-auto min-w-full">
      <thead>
        <tr className="bg-gray-800">
          <th className="px-3 py-4">
            <span className="text-gray-200">Date</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">Event Name</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">Sponsor</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">City</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">State</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">Address</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">Complement</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">Email</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">Phone</span>
          </th>
          <th className="px-3 py-2">
            <span className="text-gray-200">Actions</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-gray-200">
        {data.map((obj: TrProps, i: number) => (
          <Tr {...obj} key={i} />
        ))}
      </tbody>
    </table>
  );
}

interface TrProps {
  _id: any;
  sponsor: string;
  city: string;
  state: string;
  address: string;
  complement: string;
  email: string;
  phone: string;
  date: string;
  eventName: string;
}

function Tr({
  _id,
  sponsor,
  city,
  state,
  address,
  complement,
  email,
  phone,
  date,
  eventName,
}: TrProps) {
  const visible = useSelector((state: any) => state.app.client.toggleForm);
  const dispatch = useDispatch();

  const onUpdate = () => {
    dispatch(toggleChangeAction(_id));
    if (visible) {
      dispatch(updateAction(_id));
    }
  };

  const onDelete = () => {
    if (!visible) {
      dispatch(deleteAction(_id));
    }
  };

  return (
    <tr className="bg-gray-50 text-center">
      <td className="">
        <span className="text-center ml-2 font-semibold">{date}</span>
      </td>
      <td className="px-3 py-4">
        <span>{eventName || "Unknow"}</span>
      </td>
      <td className="px-3 py-4">
        <span>{sponsor || "Unknow"}</span>
      </td>
      <td className="px-3 py-4">
        <span>{city || "Unknow"}</span>
      </td>
      <td className="px-3 py-4">
        <span>{state || "Unknow"}</span>
      </td>

      <td className="px-3 py-4">
        <span>{address || "Unknow"}</span>
      </td>
      <td className="px-3 py-4">
        <span>{complement || "Unknow"}</span>
      </td>
      <td className="px-3 py-4">
        <span>{email || "Unknow"}</span>
      </td>
      <td className="px-3 py-4">
        <span>{phone || "Unknow"}</span>
      </td>
      <td className="px-3 py-2 flex justify-around gap-5">
        <button onClick={onUpdate} className="cursor mt-2">
          <BiEdit size={25} color={"rgb(34,197,94)"}></BiEdit>
        </button>
        <button onClick={onDelete} className="cursor mt-2">
          <BiTrashAlt size={25} color={"rgb(244,63,94)"}></BiTrashAlt>
        </button>
      </td>
    </tr>
  );
}
