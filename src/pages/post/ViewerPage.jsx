import React from 'react';
import ViewerComponent from "../../components/post/ViewerComponent.jsx";
import {useSelector} from "react-redux";

function ViewerPage(props) {

    const content = useSelector(state => state.postSlice)

    return (
        <div>
            <ViewerComponent content={content}/>
        </div>
    );
}

export default ViewerPage;