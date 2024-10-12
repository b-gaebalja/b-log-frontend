import React from 'react';
import LoginComponent from "../../components/user/LoginComponent.jsx";
import KakaoLoginComponent
  from "../../components/user/KakaoLoginComponent.jsx";

function LoginPage(props) {
  return (
      <>
      <div>
        로그인 페이지
      </div>
        <KakaoLoginComponent/>
        <LoginComponent/>
      </>
  );
}

export default LoginPage;