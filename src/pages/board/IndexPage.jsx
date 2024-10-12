import React, {useState} from 'react';
import SimpleLayout from "../../layouts/SimpleLayout.jsx";
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import Tab from "@mui/material/Tab";

function IndexPage(props) {

    const location = useLocation()
    const initState = () => {
        if (location.pathname === '/board/add') {
            return '2'
        } else if (location.pathname === '/board/scrap') {
            return '3'
        } else {
            return '1'
        }
    }

    const navigate = useNavigate()

    const [value, setValue] = useState(initState);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <SimpleLayout>
            <div>
                <Box sx={{width: '100%', typography: 'body1'}}>
                    <TabContext value={value}>
                        <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} aria-label="lab API tabs example">
                                <Tab label="내 스터디" value="1" onClick={() => navigate("listMy")}/>
                                <Tab label="글 작성하기" value="2" onClick={() => navigate("add")}/>
                                <Tab label="스크랩" value="3" onClick={() => navigate("scrap")}/>
                            </TabList>
                        </Box>
                    </TabContext>
                </Box>
            </div>
            <div>
                <Outlet/>
            </div>

        </SimpleLayout>
    );
}

export default IndexPage;
