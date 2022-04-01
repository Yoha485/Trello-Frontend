import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, clearUser, updateUser } from "../features/user/userSlice";
import { clearColumns } from "../features/columns/columnSlice";
import { clearCards } from "../features/cards/cardSlice";
import { AiOutlineEdit } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

export const Navbar = () => {
  const user = useSelector(selectUser);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editUsername, setEditUsername] = useState(user.username);
  const [editPassword, setEditPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutClicked = () => {
    dispatch(clearUser());
    dispatch(clearColumns());
    dispatch(clearCards());
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    setEditEmail(user.email), setEditUsername(user.username);
  }, [user]);

  const onEditProfileClick = async () => {
    try {
      const data = {
        userData: {
          email: editEmail,
          username: editUsername,
          password: editPassword,
        },
        token: user.token,
      };
      dispatch(updateUser(data));
    } catch (error) {
      console.log(error);
    }
  };

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "31%",
      left: "74%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "350px",
    },
    overlay: {
      zIndex: 20,
    },
  };

  return (
    <div className="mb-6 bg-white z-10 fixed top-0 left-0 right-0">
      <div className="flex h-16 w-full">
        <div className="flex-1 flex justify-start items-center text-[#2c4cbc] ml-5">
          <div
            className="cursor-pointer  w-20 h-12 text-xl font-medium flex justify-center items-center rounded-lg border-[#2c4cbc]"
            onClick={onLogoutClicked}
          >
            Logout
          </div>
        </div>

        <div className="flex-1 flex text-4xl justify-center items-center text-[#2c4cbc] font-bold font-sriracha">
          Drello
        </div>

        <div className="flex-1 flex justify-end items-center">
          <div className="flex mr-3 font-medium text-[#2c4cbc]">{user.username}</div>
          <div className="flex pr-6">
            <AiOutlineEdit
              className="w-10 h-8 text-[#2c4cbc] cursor-pointer border-[#2c4cbc] rounded-lg"
              onClick={openModal}
            />
            <Modal
              style={customStyles}
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Example Modal"
            >
              <form className="w-full">
                <div className="text-lg font-medium text-[#2546bd]">
                  Edit Profile
                </div>
                <div>
                  <input
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="New Email"
                    className="my-2 w-full border-2 outline-none rounded-md p-2 border-stone-300 placeholder:text-gray-400 text-sm"
                  />
                </div>

                <div>
                  <input
                    value={editUsername}
                    onChange={(e) => setEditUsername(e.target.value)}
                    placeholder="New Username"
                    className="my-2 w-full border-2 outline-none rounded-md p-2 border-stone-300 placeholder:text-gray-400 text-sm"
                  />
                </div>

                <div>
                  <input
                    value={editPassword}
                    onChange={(e) => setEditPassword(e.target.value)}
                    placeholder="New Password"
                    className="my-2 w-full border-2 outline-none rounded-md p-2 border-stone-300 placeholder:text-gray-400 text-sm"
                  />
                </div>

                <div className="flex justify-end">
                  <div
                    className="cursor-pointer border-2 w-16 h-10 text-xl font-medium flex justify-center items-center rounded-lg border-[#2c4cbc]"
                    onClick={onEditProfileClick}
                  >
                    Edit
                  </div>
                </div>
              </form>
            </Modal>
          </div>
        </div>
      </div>

      <div className="h-[1px] w-full bg-gray-400 mt-1" />
    </div>
  );
};
