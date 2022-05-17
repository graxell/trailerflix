import React from "react";
import ListItem from "./Listitem";

const List = (props) => {
  const { list, styleName, onClick } = props;
  return (
    <>
      {list.map((item) => {
        const { id, name } = item;
        return (
          <ListItem
            onClick={onClick}
            styleName={styleName}
            key={id}
            itemName={name}
          />
        );
      })}
    </>
  );
};

export default List;
