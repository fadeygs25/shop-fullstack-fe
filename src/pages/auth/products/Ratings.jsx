import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { useUsers } from "@/store/context/UserContext";
import { useCarts } from "@/store/context/CartContext";
import Rating from '@mui/material/Rating';

export function Ratings({ rating }) {
  const { deleteCart } = useCarts();
  const { usersById, getUserById } = useUsers();
  const [users, setUsers] = React.useState({});
  React.useEffect(() => {
    getUserById(rating.userId)
  }, [rating.userId])

  React.useEffect(() => {
    if (usersById?._id === rating?.userId) {
      setUsers(usersById)
    }
  }, [usersById, rating?.userId])




  return (
    <div className="flex items-center justify-between gap-4" >
      <div className="flex items-center gap-4">
        <Avatar
          src={users.pic}
          alt={rating.fullName}
          className="shadow-lg shadow-blue-gray-500/25"
        />
        <div>
          <Typography
            variant="small"
            color="blue-gray"
            className="mb-1 font-semibold"
          >
            {users.username}
          </Typography>

          <Typography className="text-xs font-normal text-blue-gray-400 ">
            <Rating
              name="simple-controlled"
              value={rating.start}
              readOnly
              className="w-50"
            />
          </Typography>

          <Typography className="text-xs font-normal text-blue-gray-400 ">
            {rating.message}
          </Typography>
        </div>
      </div>
      {rating.date}
    </div>
    // <tr key={rating._id}>
    //   <td className="py-3 px-5 border-b border-blue-gray-50">
    //     <div className="flex items-center gap-4">
    //       <Avatar src={users.pic} size="sm" />
    //       <div>
    //         <Typography
    //           variant="small"
    //           color="blue-gray"
    //           className="font-semibold"
    //         >
    //           {users.username}
    //         </Typography>
    //         <Typography className="text-xs font-normal text-blue-gray-500">
    //           <Rating
    //             name="simple-controlled"
    //             value={rating.start}
    //             readOnly
    //             className="w-50"
    //           />
    //         </Typography>
    //         <Typography className="text-xs font-normal text-blue-gray-500">
    //           {rating.date}
    //         </Typography>
    //       </div>
    //     </div>
    //   </td>
    //   <td className="py-3 px-5 border-b border-blue-gray-50">
    //     <Typography className="text-xs font-normal text-blue-gray-500">
    //       {rating.message}
    //     </Typography>
    //   </td>
    //   {/* <td className={className}>
    //     <Chip
    //       variant="gradient"
    //       color={online ? "green" : "blue-gray"}
    //       value={online ? "online" : "offline"}
    //       className="py-0.5 px-2 text-[11px] font-medium"
    //     />
    //   </td>
    //   <td className={className}>
    //     <Typography className="text-xs font-semibold text-blue-gray-600">
    //       {date}
    //     </Typography>
    //   </td>
    //   <td className={className}>
    //     <Typography
    //       as="a"
    //       href="#"
    //       className="text-xs font-semibold text-blue-gray-600"
    //     >
    //       Edit
    //     </Typography>
    //   </td> */}
    // </tr>

  );
}

export default Ratings;
