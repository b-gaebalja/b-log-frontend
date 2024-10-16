import * as React from 'react';
import {useState} from 'react';
import PageComponent from "../common/PageComponent.jsx";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import {Outlet, useLocation, useNavigate} from "react-router-dom";

export default function MainComponent() {

  const location = useLocation()
  const initState = () => {
    if(location.pathname === '/list/latest'){
      return '2'
    }else if(location.pathname === '/list/feed'){
      return '3'
    }else {
      return '1'
    }
  }

  const [value, setValue] = useState(initState);


  const navigate = useNavigate()

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
      <>
        <Box sx={{ width: '100%', typography: 'body1' }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <TabList onChange={handleChange} aria-label="lab API tabs example">
                <Tab label="트렌딩" value="1" onClick={()=>navigate('list')} />
                <Tab label="최신" value="2" onClick={()=>navigate('list/latest')} />
                <Tab label="피드" value="3" />
              </TabList>
            </Box>
          </TabContext>
        </Box>
        <div>
          <Outlet/>
        </div>
      </>
  );
}
