import React from "react";
import ListResult from "./ListResult";

const SearchResult = (props) => {
  const { addButtonHandler, show, setShow, showList, setShowList } = props;

  return (
    <>
      <ListResult
        setShowList={setShowList}
        showList={showList}
        addButtonHandler={addButtonHandler}
        setShow={setShow}
        show={show}
      />
    </>
  );
};

export default SearchResult;
