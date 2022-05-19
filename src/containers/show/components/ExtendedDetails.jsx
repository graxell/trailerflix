import React from "react";
import { headingFormat } from "../../../utils/DataUtils";
import List from "../../../components/list/List";

const ExtendedDetails = (props) => {
  const { credits, production_companies, networks, created_by } = props.show;

  const { cast } = credits;

  const newArr = {
    cast,
    production_companies,
    networks,
    created_by,
  };

  const newKeys = Object.keys(newArr);
  return (
    <>
      {newKeys &&
        newKeys.map((key, index) => {
          return (
            newArr[key] &&
            newArr[key].length > 0 && (
              <ul key={index} className="showInfo__details--list list__inline">
                <h4 key={key}>{headingFormat(key)}:</h4>
                <List list={newArr[key]} />
              </ul>
            )
          );
        })}
    </>
  );
};

export default ExtendedDetails;
