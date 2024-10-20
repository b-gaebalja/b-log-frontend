import Button from "@mui/material/Button";
import { BiBookmark } from "react-icons/bi";
import axios from "axios";

const PostDetailComponent = ({postId}) => {
    const handleShare = async () => {
        try {
            const response = await axios.post(`/posts/${postId}/shares`);
            if (response.status === 201) {
                alert("게시글이 성공적으로 스크랩되었습니다~");
            }
        }catch(error){
            console.error("스크랩 중 오류 발생: ", error);
            alert("스크랩에 실패했습니다ㅠ");
        }
    }

    return (
        <div>
            <h1>게시글 상세</h1>
            <p>게시글 내용~~~</p>
            <Button onClick={handleShare}><BiBookmark/></Button>


        </div>
    )
}
export default PostDetailComponent;