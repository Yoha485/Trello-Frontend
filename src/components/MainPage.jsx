import React, { useEffect } from "react";
import { Navbar } from "./Navbar";
import { Column } from "./Column";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../features/user/userSlice";
import { BsFillPlusCircleFill } from "react-icons/bs";
import {
  createColumn,
  selectColumnsByUserId,
  fetchColumns,
} from "../features/columns/columnSlice";

export const MainPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userId } = useParams();
  const user = useSelector(selectUser);
  const columns = useSelector((state) => state.columns.columns);
  const columnsStatus = useSelector((state) => state.columns.status);

  // useEffect(() => {
  //   if (userId != user.id) {
  //     navigate("/");
  //   }
  // }, [user]);

  useEffect(() => {
    if (user.token) {
      dispatch(fetchColumns(user.token));
    }
  }, [user, dispatch]);

  const onClickAddColumn = async () => {
    try {
      const data = {
        name: { name: "" },
        token: user.token,
      };
      const res = await dispatch(createColumn(data));
    } catch (error) {
      console.error(error.message);
    }
  };

  const sortedColumns = columns.slice().sort(
    (a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()
  );

  return (
    <div>
      <Navbar />

      <div className="flex flex-row overflow-auto">
        <div className="mt-24 flex fex-row">
          {sortedColumns.map((column) => (
            <Column
              key={column.id}
              colName={column.name}
              id={column.id}
              userToken={user.token}
            />
          ))}
          <div>
            <BsFillPlusCircleFill
              size={50}
              className="cursor-pointer mx-5 mt-5 text-[#6d86da]"
              onClick={onClickAddColumn}
            >
              AddColumn
            </BsFillPlusCircleFill>
          </div>
        </div>
      </div>
    </div>
  );
};
