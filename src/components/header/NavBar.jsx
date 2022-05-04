import React from "react";
import Search from "./Search";
import NavLeft from "./NavLeft";
// import AccountMenu from "./AccountMenu";

const NavBar = (props) => {
  const {
    homepageLists,
    getItem,
    onSignOut,
    setShow,
    show,
    showList,
    setShowList,
    addButtonHandler,
  } = props;
  return (
    <>
      <NavLeft
        homepageLists={homepageLists}
        getItem={getItem}
        onSignOut={onSignOut}
        setShow={setShow}
        show={show}
        showList={showList}
        setShowList={setShowList}
      />

      <Search setShowList={setShowList} />

      {/* <button onClick={onSignOut}>Logout</button> */}
    </>
  );
};

export default NavBar;
