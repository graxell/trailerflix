import React from "react";
import Banner from "../shared/Banner";
import DisplayShowListSlider from "../layout/DisplayShowListSlider";
import { homepageHeadings } from "../../utils/PageUtils";

const Homepage = (props) => {
  const { addButtonHandler, setShow, banner, homepageLists, show } = props;

  return (
    <>
      <div className="homepage--container">
        {banner && (
          <Banner
            show={show}
            setShow={setShow}
            bannerShow={banner}
            addButtonHandler={addButtonHandler}
          />
        )}

        <DisplayShowListSlider
          lists={homepageLists}
          headingHandler={homepageHeadings}
          addButtonHandler={addButtonHandler}
          setShow={setShow}
        />
      </div>
    </>
  );
};

export default Homepage;
