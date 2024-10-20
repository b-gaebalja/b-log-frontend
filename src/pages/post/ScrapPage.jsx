import React from 'react';
import ScrapComponent from "../../components/post/ScrapComponent.jsx";
// import SnsShareComponent from "../../components/post/SnsShareComponent.jsx";
import SnsShareComponent2 from "../../components/post/SnsShareComponent2.jsx";
import CopyUrlComponent from "../../components/post/CopyUrlComponent.jsx";
import ListBookmarkedComponent from "../../components/post/ListBookmarkedComponent.jsx";


function ScrapPage(props) {
    return (
        <>
            <div>
                포스트 스크랩 페이지
            </div>
            <ListBookmarkedComponent/>
        </>
    );
}

export default ScrapPage;