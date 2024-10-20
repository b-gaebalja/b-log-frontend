import React from 'react';
import ViewerComponent from "../../components/post/ViewerComponent.jsx";
import {useSelector} from "react-redux";
// import SnsShareComponent2 from "../../components/post/SnsShareComponent2.jsx";
// import CopyUrlComponent from "../../components/post/CopyUrlComponent.jsx";

function ViewerPage(props) {

    //const postSlice = useSelector(state => state.postSlice);
    // console.log("Post Slice State:", postSlice);

    const content = useSelector(state => state.postSlice)
    //되나 확인
    //const postId = useSelector(state => state.post.id)
    const postId = content?.id; // content에서 postId 추출하기



    return (
        <div>
            <ViewerComponent content={content} postId={postId}/>
        </div>
    );
}

export default ViewerPage;