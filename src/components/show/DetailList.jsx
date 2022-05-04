import React from "react";

const DetailList = (props) => {
  const { list } = props;
  return (
    <>
      {list.map((item) => {
        return (
          <>
            <li key={item.id}>{item.name}</li>
          </>
        );
      })}
    </>
  );
};

export default DetailList;
