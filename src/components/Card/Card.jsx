import React, { useState } from "react";

const Card = ({
  deleteCard,
  editCardStatus,
  data: {
    _id,
    title,
    createdAt,
    user: { userName },
    description,
    status,
    importance,
  },
  data,
}) => {
  const [showMore, setShowMore] = useState(false);

  const datetime = new Date(createdAt).toLocaleString() + " hs.";

  const limitString = (str) => {
    if (str.length > 40) {
      return { string: str.slice(0, 45).concat("..."), addButton: true };
    }
    return { string: str, addButton: false };
  };

  return (
    <div className="mx-12 mt-10 shadow-2xl bg-slate-100 rounded-md p-6 w-72">
      <div className="flex justify-between">
        <h3 className="font-semibold text-sm">{title}</h3>
        <span onClick={() => deleteCard(_id)} className="cursor-pointer">
          x
        </span>
      </div>
      <h6 className="mt-2 text-sm">{datetime}</h6>
      <h5 className="mt-2 font-semibold">{userName}</h5>
      <div className="mt-2 mb-4">
        <button
          onClick={() => {
            editCardStatus(data);
          }}
          className="bg-blue-500 p-2 text-white font-bold text-sm rounded-md"
        >
          {status.toLowerCase()}
        </button>
        <button className="ml-2 bg-blue-500 p-2 text-white font-bold text-sm rounded-md">
          {importance.toLowerCase()}
        </button>
      </div>
      {!showMore && <p>{limitString(description).string}</p>}
      {showMore && (
        <>
          <p>{description}</p>
          <button
            className="text-blue-500"
            onClick={() => setShowMore(false)}
            type="button"
          >
            Ver menos
          </button>
        </>
      )}
      {!showMore && limitString(description).addButton && (
        <button
          className="text-blue-500"
          onClick={() => setShowMore(true)}
          type="button"
        >
          Ver más
        </button>
      )}
    </div>
  );
};

export default Card;
