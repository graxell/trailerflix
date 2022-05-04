import React from "react";
import Search from "./Search";
import NavLeft from "./NavLeft";
// import AccountMenu from "./AccountMenu";

const NavBar = (props) => {
  const { onSignOut, setShow, setShowList } = props;
  return (
    <>
      <NavLeft
        onSignOut={onSignOut}
        setShow={setShow}
        setShowList={setShowList}
      />

      <Search setShowList={setShowList} />

      {/* <button onClick={onSignOut}>Logout</button> */}
    </>
  );
};

export default NavBar;
