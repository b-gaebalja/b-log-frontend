import CopyToClipboard from "react-copy-to-clipboard"
import Button from "@mui/material/Button";

const currentUrl = window.location.href;

const CopyUrlComponent = () => {

    return (
        <CopyToClipboard text={currentUrl} onCopy={()=> alert('주소 카피캣 =^,,^=')}>
            <Button>URL 복사</Button>
        </CopyToClipboard>
    )
}
export default CopyUrlComponent;