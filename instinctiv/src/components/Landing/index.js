import React from "react";
import MC104 from "./MC104.png";
import MC102 from "./MC102.png";
import MC103 from "./MC103.png";
import MC101 from "./MC101.png";

function Header() {
  return (
    <div>
      <img src={MC104} alt="MC104" />
      <img src={MC102} alt="MC102" />
      <img src={MC103} alt="MC103" />
      <img src={MC101} alt="MC101" />
    </div>
  );
}

export default Header;
