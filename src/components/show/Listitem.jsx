import React from "react";

const ListItem = (props) => {
  const { itemName, onClick, style, key } = props;
  return (
    <>
      <li onClick={onClick} className={style} key={key}>
        {itemName}
      </li>
    </>
  );
};

export default ListItem;
