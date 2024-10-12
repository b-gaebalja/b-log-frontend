import React, { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import SimpleLayout from "../../layouts/SimpleLayout.jsx";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";

function IndexPage(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabNumber = (path) => {
    return path === '/users/join' ? '2' : '1';
  };

  const [value, setValue] = useState(getTabNumber(location.pathname));

  useEffect(() => {
    setValue(getTabNumber(location.pathname));
  }, [location.pathname]);

  return (
      <SimpleLayout>
        <div>
          <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList aria-label="lab API tabs example">
                  <Tab label="로그인" value="1" onClick={() => navigate("login")} />
                  <Tab label="회원가입" value="2" onClick={() => navigate("join")} />
                </TabList>
              </Box>
            </TabContext>
          </Box>
        </div>
        <Outlet />
      </SimpleLayout>
  );
}

export default IndexPage;
