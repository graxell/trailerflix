import React from "react";
import ListItem from "./Listitem";

const DetailList = (props) => {
  const { list, style, onClick } = props;
  return (
    <>
      {list.map((item) => {
        const { id, name } = item;
        return (
          <ListItem
            onClick={onClick}
            className={style}
            key={id}
            itemName={name}
          />
          // <li onClick={onClick} className={style} key={id}>
          //   {name}
          // </li>
        );
      })}
    </>
  );
};

export default DetailList;
