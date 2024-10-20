import ScrapedListComponent2 from "../../components/post/ScrapedListComponent2.jsx";
import PostDetailComponent from "../../components/post/PostDetailComponent.jsx";

function ScrapPage2(props){
    const sharerId = sessionStorage.getItem('sharerId');
    return (
        <>
            <div>
                <h1>공유된 Posts</h1>
                <ScrapedListComponent2 sharerId={sharerId} />
                <PostDetailComponent/>
            </div>
        </>
    )
}
export default ScrapPage2;