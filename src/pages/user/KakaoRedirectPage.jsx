import React, {useEffect} from 'react';
import {useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import useCustomLogin from "../../hooks/useCustomLogin.jsx";
import {getAccessToken, getUserWithAccessToken} from "../../api/kakaoApi.js";
import {login} from "../../slices/loginSlice.jsx";

function KakaoRedirectPage(props) {

 const [searchParams] = useSearchParams()
  const authCode = searchParams.get('code')
  const dispatch = useDispatch()
  const {moveToPath} = useCustomLogin()

  useEffect(() => {
    getAccessToken(authCode).then(accessToken => {
      getUserWithAccessToken(accessToken).then(
          data => {
            console.log(data)
            dispatch(login(data))
            moveToPath('/')
          }
      ).catch(err=>{
        console.log('고장남',err)
      })
    })
  }, [authCode]);

  return (
      <div>
        <div>Kakao</div>
        <div>{authCode}</div>
      </div>
  );
}

export default KakaoRedirectPage;