import React from 'react';
import ListMyComponent
  from "../../../components/board/list/ListMyComponent.jsx";

function ListMyPage(props) {
  return (
      <>
      <div>나의 게시글</div>
        <ListMyComponent/>
      </>
  );
}

export default ListMyPage;