import React, {useState} from 'react';
import {useSearchParams} from "react-router-dom";
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import {getAccessToken, getUserWithAccessToken} from "../../api/kakaoApi.js";
import {getUser} from "../../api/userApi.js";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import ResultModal from "../../components/common/ResultModal.jsx";
import {useQuery} from "@tanstack/react-query";

function KakaoRedirectPage() {

 const [searchParams] = useSearchParams()
  const authCode = searchParams.get('code')
  const {moveToKakao,moveToLogin} = useCustomLogin()
  const {data,isSuccess} = useQuery({queryKey:[authCode],queryFn:()=>getAccessToken(authCode)})
  const [result, setResult] = useState(false)
  if(isSuccess) {
    getUserWithAccessToken(data).then(res => {
      const email = {email: res.kakao_account.email}
      const name = res.properties.nickname
      getUser(email).then(result => {
        if (result.ERROR) {
          moveToKakao('join', email.email, name)
        } else {
          setResult(email.email)
        }
      })
    })
  }

  const closeModal = () => {
    moveToLogin()
    setResult(false)
  }

  return (
      <div>
        <Box sx={{ display: 'flex' }}><CircularProgress /></Box>
        {result?
        <ResultModal
        title={"이미 계정이 있습니다"}
        content={`해당 카카오 계정으로 가입된 계정이 있습니다 \n ${result}`}
        handleClose={closeModal}
        />
          :<></>
        }
      </div>
  );
}

export default KakaoRedirectPage;