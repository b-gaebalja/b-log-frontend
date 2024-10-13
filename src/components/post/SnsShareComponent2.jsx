import {FacebookIcon, FacebookShareButton, FacebookShareCount, TwitterShareButton, XIcon} from "react-share";

//현재 페이지 변수 저장
const currentUrl = window.location.href;

const SnsShareComponent2 = () => {
    return (
        <div>
            {/*페이스북*/}
            <FacebookShareButton url={currentUrl}>
                <FacebookIcon size={25} round={true}/>
            </FacebookShareButton>
            <FacebookShareCount url={currentUrl}>
                {count => <span>{count} 공유됨</span>}
            </FacebookShareCount>

            {/*트위터*/}
            <TwitterShareButton url={currentUrl}>
                <XIcon size={25} round={true}/>
            </TwitterShareButton>


        </div>
    )
}
export default SnsShareComponent2
