import React from "react";

const DetailList = (props) => {
  const { heading, list } = props;
  return (
    <>
      <ul className="showInfo__details--list list__inline">
        <h4>{heading} </h4>
        {list.map((item) => {
          return <li key={item.id}>{item.name}</li>;
        })}
      </ul>
    </>
  );
};

export default DetailList;
