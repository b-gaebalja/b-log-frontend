import React from 'react';
import ViewerComponent from "../../components/board/ViewerComponent.jsx";
import {useSelector} from "react-redux";

function ViewerPage(props) {

 const content = useSelector(state => state.boardSlice)

  return (
      <div>
        <ViewerComponent content={content}/>
      </div>
  );
}

export default ViewerPage;