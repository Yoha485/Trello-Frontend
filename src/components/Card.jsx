import React, { useState } from "react";
import { useDrag } from "react-dnd";
import { ItemTypes } from "../types/types";
import { MdOutlineClear } from "react-icons/md";
import {
  deleteCard,
  updateCard,
  changeName,
  changeDescription,
} from "../features/cards/cardSlice";
import { useDispatch } from "react-redux";
import Textarea from "react-expanding-textarea";

export const Card = ({
  id,
  cardName,
  cardDescription,
  columnId,
  userToken,
}) => {
  const [name, setName] = useState(cardName);
  const [description, setDescription] = useState(cardDescription);
  const dispatch = useDispatch();

  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemTypes.CARD,
    item: {
      id: id,
      columnId: columnId,
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const onCardNameChange = (e) => {
    setName(e.target.value);
    try {
      const data = {
        cardId: id,
        cardData: {
          columnId: columnId,
          name: e.target.value,
          description: description,
        },
        token: userToken,
      };
      dispatch(
        changeName({
          id: id,
          columnId: columnId,
          name: e.target.value,
        })
      );
      dispatch(updateCard(data));
    } catch (error) {
      console.log(error);
    }
  };

  const onCardDescriptionChange = (e) => {
    setDescription(e.target.value);
    try {
      const data = {
        cardId: id,
        cardData: {
          columnId: columnId,
          name: name,
          description: e.target.value,
        },
        token: userToken,
      };
      dispatch(
        changeDescription({
          id: id,
          columnId: columnId,
          description: e.target.value,
        })
      );
      dispatch(updateCard(data));
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteCardClicked = () => {
    try {
      const data = {
        columnId: columnId,
        cardId: id,
        token: userToken,
      };
      dispatch(deleteCard(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      ref={drag}
      className="border-2 m-2 min-h-[4rem] rounded-lg w-inherit max-w-[16rem] "
    >
      <div>
        <div className="flex justify-end mr-2">
          <MdOutlineClear
            size={14}
            className="mt-1 ml-1 cursor-pointer"
            onClick={onDeleteCardClicked}
          />
        </div>

        <form className="font-medium" onSubmit={(e) => e.preventDefault()}>
          <Textarea
            type="text"
            value={name}
            onChange={onCardNameChange}
            className="w-[40%] p-0 bg-inherit mx-3 text-lg font-medium border-transparent focus:border-transparent focus:ring-0 resize-none"
            placeholder="New Card"
          />

          <Textarea
            type="text"
            value={description}
            onChange={onCardDescriptionChange}
            className="p-0 bg-inherit ml-3 w-[80%] text-md font-sm border-transparent focus:border-transparent focus:ring-0 resize-none"
            placeholder="Description"
          />
        </form>
      </div>
    </div>
  );
};
