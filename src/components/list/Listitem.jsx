import React from "react";

const ListItem = (props) => {
  const { itemName, onClick, styleName } = props;
  return (
    <>
      <li onClick={onClick} className={styleName}>
        {itemName}
      </li>
    </>
  );
};

export default ListItem;
