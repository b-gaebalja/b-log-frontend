import React from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import FileCopyIcon from '@mui/icons-material/FileCopyOutlined';
import SaveIcon from '@mui/icons-material/Save';
import PrintIcon from '@mui/icons-material/Print';
import ShareIcon from '@mui/icons-material/Share';
import EditIcon from '@mui/icons-material/Edit';

function AddComponent(props) {
    const actions = [
        {icon: <FileCopyIcon/>, name: 'Copy'},
        {icon: <SaveIcon/>, name: 'Save'},
        {icon: <PrintIcon/>, name: 'Print'},
        {icon: <ShareIcon/>, name: 'Share'},
    ];

    return (
        <Box sx={{display: 'flex', position: 'relative', alignItems: 'flex-start', gap: 2}}>
            <TextField
                label="내용"
                multiline
                rows={3}
                defaultValue="내용을 입력해주세요."
                fullWidth
                sx={{
                    height: '500px',
                    '& .MuiInputBase-root': {
                        height: '100%',
                    },
                    '& .MuiInputBase-input': {
                        height: '100% !important',
                        overflow: 'auto',
                    },
                }}
            />
            <Box sx={{position: 'absolute', bottom: 16, right: 16}}> {/* 절대 위치 설정 */}
                <SpeedDial
                    ariaLabel="SpeedDial openIcon example"
                    icon={<SpeedDialIcon openIcon={<EditIcon/>}/>}
                >
                    {actions.map((action) => (
                        <SpeedDialAction
                            key={action.name}
                            icon={action.icon}
                            tooltipTitle={action.name}
                            onClick={() => console.log(`클릭함 ${action.name}`)}
                        />
                    ))}
                </SpeedDial>
            </Box>
        </Box>
    );
}

export default AddComponent;
