import React from 'react';
import SimpleLayout from "../../layouts/SimpleLayout.jsx";
import {Outlet} from "react-router-dom";

function IndexPage(props) {
  return (
      <SimpleLayout>
        <Outlet/>
      </SimpleLayout>
  );
}

export default IndexPage;