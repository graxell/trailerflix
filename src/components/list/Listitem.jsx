import React from "react";

const ListItem = (props) => {
  const { itemName, onClick, styleName, key } = props;
  return (
    <>
      <li onClick={onClick} className={styleName} key={key}>
        {itemName}
      </li>
    </>
  );
};

export default ListItem;
