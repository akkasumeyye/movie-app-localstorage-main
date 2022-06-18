import React, { useState } from "react";

import Cast from "../Cast/Cast";
import Videos from "../Videos/Videos";
import Photos from "../Photos/Photos";


const TabNavItem = ({ title, Tab, tabName, setTabName }) => {
  const handleClick = () => {
    setTabName(Tab);
  };

  return (
    <div className={tabName === Tab ? "active-tab" : ""} onClick={handleClick}>
      {title}
    </div>
  );
};

const TabContent = ({ Tab, tabName, children }) => {
  return tabName === Tab ? <>{children}</> : null;
};

const Tabs = ({ id }) => {
  const [tabName, setTabName] = useState("Cast");

  return (
    <div>
      <div className="TabNav">
        <TabNavItem
          title="Cast"
          tab="Cast"
          tabName={tabName}
          setTabName={setTabName}
        />
        <TabNavItem
          title="Videos"
          tab="Videos"
          tabName={tabName}
          setTabName={setTabName}
        />
        <TabNavItem
          title="Photos"
          tab="Photos"
          tabName={tabName}
          setTabName={setTabName}
        />
      </div>

      <TabContent Tab="Cast" tabName={tabName}>
        <Cast id={id} />
      </TabContent>
      <TabContent Tab="Videos" tabName={tabName}>
        <Videos id={id} />
      </TabContent>
      <TabContent Tab="Photos" tabName={tabName}>
        <Photos id={id} />
      </TabContent>
    </div>
  );
};

export default Tabs;