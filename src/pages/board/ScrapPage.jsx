import React from 'react';
import ScrapComponent from "../../components/board/ScrapComponent.jsx";
// import SnsShareComponent from "../../components/board/SnsShareComponent.jsx";
import SnsShareComponent2 from "../../components/board/SnsShareComponent2.jsx";
import CopyUrlComponent from "../../components/board/CopyUrlComponent.jsx";

function ScrapPage(props) {
  return (
      <>
      <div>
        보드 스크랩 페이지
      </div>
        <ScrapComponent/>
          {/*<SnsShareComponent/>*/}
          <SnsShareComponent2/>
          <CopyUrlComponent/>
      </>
  );
}

export default ScrapPage;