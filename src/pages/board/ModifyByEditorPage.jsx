import React from 'react';
import ModifyByEditorComponent from "../../components/board/ModifyByEditorComponent.jsx";
import {useParams} from "react-router-dom";

function ModifyByEditorPage() {
    const {id} = useParams();
    return (
        <div>
            <ModifyByEditorComponent/>
        </div>
    );
}

export default ModifyByEditorPage;
