import React, { useState } from 'react';
import { FacebookIcon, FacebookShareButton, FacebookShareCount, TwitterShareButton, XIcon } from "react-share";
import CopyToClipboard from "react-copy-to-clipboard";
import Button from "@mui/material/Button";
import { SlLink } from "react-icons/sl";
import {useLocation} from "react-router-dom";

// 현재 페이지 변수 저장
// const currentUrl = window.location.href

const SnsShareComponent = () => {

    const url = useLocation().pathname;
    const currentUrl = `http://localhost:5174${url}`;

    return (
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                    {/* 페이스북 공유 버튼 */}
                    <FacebookShareButton url={currentUrl}>
                        <FacebookIcon size={25} round={true} />
                    </FacebookShareButton>
                    <FacebookShareCount url={currentUrl}>
                        {count => <span>{count} 공유됨</span>}
                    </FacebookShareCount>

                    {/* 트위터 공유 버튼 */}
                    <TwitterShareButton url={currentUrl}>
                        <XIcon size={25} round={true} />
                    </TwitterShareButton>

                    {/* URL 복사 버튼 */}
                    <CopyToClipboard text={currentUrl} onCopy={() => alert('주소 카피캣 =^,,^=')}>
                        <Button><SlLink/></Button>
                    </CopyToClipboard>
                </div>
    );
};

export default SnsShareComponent;
