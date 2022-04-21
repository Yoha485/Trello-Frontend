import axios from "axios";
import React, { useState, useEffect } from "react";
import Input from "./Input";
import inputs from "./inputs";
import {
  createUser,
  loginUser,
  selectFormError,
  clearErrorMessage,
} from "../../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Welcome = () => {
  const formError = useSelector(selectFormError);
  const [registerFormSwitch, setRegisterFormSwitch] = useState(true); //true == Register false == Login
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clearValues = () => {
    setValues({
      username: "",
      email: "",
      password: "",
    });
    dispatch(clearErrorMessage());
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onRegisterClicked = async () => {
    try {
      const res = await dispatch(createUser(values));
      console.log(res);
      navigate(`/user/${res.payload.user.id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  const onLoginClicked = async () => {
    try {
      const data = {
        email: values.email,
        password: values.password,
      };
      const res = await dispatch(loginUser(data));
      navigate(`/user/${res.payload.user.id}`);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col tablet:flex-row items-center justify-center h-screen">
      <div className="pr-7">
        <h1 className="font-semibold text-3xl sm:text-5xl">
          Plan your life <br /> with{" "}
          <span className="text-[#233c8e]">Drello</span>
        </h1>
        <p className="text-gray-500">
          Create, process and complete your tasks <br /> in a convenient way
        </p>
      </div>

      <div className="mt-4 p-5 w-11/12 phone:w-11/12 tablet:w-96 flex flex-col justify-start items-center rounded-xl bg-gradient-to-r from-[#2546bd] to-[#7b8fd7]">
        {registerFormSwitch ? (
          <div className="cursor-pointer text-gray-900">
            <button
              onClick={() => setRegisterFormSwitch(true)}
              className="text-white font-semibold"
            >
              Register
            </button>{" "}
            /{" "}
            <button
              onClick={() => {
                setRegisterFormSwitch(false);
                clearValues();
              }}
              className = "font-semibold"
            >
              Login
            </button>
          </div>
        ) : (
          <div className="cursor-pointer text-gray-900">
            <button
              onClick={() => {
                setRegisterFormSwitch(true);
                clearValues();
                
              }}
              className="font-semibold"
            >
              Register
            </button>{" "}
            /{" "}
            <button
              onClick={() => setRegisterFormSwitch(false)}
              className="text-white font-semibold"
            >
              Login
            </button>
          </div>
        )}

        {registerFormSwitch ? (
          <>
            {inputs.map((input) => (
              <Input
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
          </>
        ) : (
          <>
            <Input
              key={inputs[1].id}
              {...inputs[1]}
              value={values[inputs[1].name]}
              onChange={onChange}
            />
            <Input
              key={inputs[2].id}
              {...inputs[2]}
              value={values[inputs[2].name]}
              onChange={onChange}
            />
          </>
        )}

        <div className="h-[1px] w-full bg-gray-400 my-2" />

        <div className="flex flex-row w-full h-full">
          <p className="flex-1 text-white">{formError}</p>

          <button className="flex-1 flex justify-end text-white cursor-pointer w-full pt-2">
            {registerFormSwitch ? (
              <div
                className="w-20 h-8 pt-1 bg-white text-black font-semibold rounded-lg"
                onClick={onRegisterClicked}
              >
                Register
              </div>
            ) : (
              <div
                className="w-20 h-8 pt-1 bg-white text-black font-semibold rounded-lg"
                onClick={onLoginClicked}
              >
                Login
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
