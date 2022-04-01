import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import { MdOutlineClear } from "react-icons/md";
import { deleteColumn, updateColumn } from "../features/columns/columnSlice";
import { useSelector, useDispatch } from "react-redux";
import { ItemTypes } from "../types/types";
import { useDrop } from "react-dnd";
import { BsFillPlusCircleFill } from "react-icons/bs";
import {
  createCard,
  fetchCards,
  replaceCard,
} from "../features/cards/cardSlice";

export const Column = ({ id, colName, userToken }) => {
  const [name, setName] = useState(colName);
  const cards = useSelector((state) => state.cards.cards[id]);
  const dispatch = useDispatch();

  const [, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => {
      try {
        const data = {
          cardId: item.id,
          prevColumnId: item.columnId,
          cardData: {
            columnId: id,
          },
          token: userToken,
        };
        console.log(data);

        dispatch(replaceCard(data));
      } catch (error) {
        console.log(error);
      }
    },
  }));

  useEffect(() => {
    const data = {
      columnId: id,
      token: userToken,
    };

    dispatch(fetchCards(data));
  }, [userToken, dispatch, drop]);

  const onChangeColumnName = async (e) => {
    e.preventDefault();
    try {
      setName(e.target.value);

      const data = {
        columnId: id,
        newName: { name: e.target.value },
        token: userToken,
      };

      dispatch(updateColumn(data));
    } catch (error) {
      console.log(error);
    }
  };

  const onDeleteColumnClick = async () => {
    try {
      const data = {
        columnId: id,
        token: userToken,
      };
      dispatch(deleteColumn(data));
    } catch (error) {
      console.log(error);
    }
  };

  const onClickCreateCard = () => {
    try {
      const data = {
        cardData: {
          columnId: id,
          name: "",
          description: "",
        },
        token: userToken,
      };
      dispatch(createCard(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col drop-shadow-lg border-2 w-50 min-h-[20rem] mx-5 rounded-xl mb-2 overflow-auto"
      ref={drop}
    >
      <div>
        <div className="flex justify-end mr-2">
          <MdOutlineClear
            size={20}
            className="mt-1 ml-1 cursor-pointer text-[#4460c4]"
            onClick={onDeleteColumnClick}
          />
        </div>
        <form
          className="flex justify-center items-center m-2 font-medium"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="text"
            value={name}
            onChange={onChangeColumnName}
            className="text-center p-0 bg-inherit mx-2 text-xl text-[#4460c4] font-medium border-transparent focus:border-transparent focus:ring-0"
            placeholder="New Column"
          />
        </form>
      </div>

      <div>
        {cards &&
          cards.map((card) => {
            return (
              <Card
                key={card.id}
                id={card.id}
                cardName={card.name}
                cardDescription={card.description}
                columnId={id}
                userToken={userToken}
              />
            );
          })}
      </div>

      <BsFillPlusCircleFill
        size={30}
        className="w-full pb-2 cursor-pointer text-[#6d86da]"
        onClick={onClickCreateCard}
      >
        AddColumn
      </BsFillPlusCircleFill>
    </div>
  );
};
