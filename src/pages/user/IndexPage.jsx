import React, {useEffect, useState} from 'react';
import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import SimpleLayout from "../../layouts/SimpleLayout.jsx";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";
import {getKakaoLink} from "../../api/kakaoApi.js";

function IndexPage(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const getTabNumber = (path) => {
    return path === '/users/login' ? '1' : '2';
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
                    <Tab
                        label={
                          <Link to={getKakaoLink()}
                                style={{ textDecoration: 'none', color: 'inherit' }}
                          >회원가입</Link>
                        }
                         value="2"
                       />
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
