import React from 'react';
import ScrapComponent from "../../components/post/ScrapComponent.jsx";
// import SnsShareComponent from "../../components/post/SnsShareComponent.jsx";
import SnsShareComponent2 from "../../components/post/SnsShareComponent2.jsx";
import CopyUrlComponent from "../../components/post/CopyUrlComponent.jsx";

function ScrapPage(props) {
    return (
        <>
            <div>
                포스트 스크랩 페이지
            </div>
            <ScrapComponent/>
            {/*<SnsShareComponent/>*/}
            <SnsShareComponent2/>
            <CopyUrlComponent/>
        </>
    );
}

export default ScrapPage;