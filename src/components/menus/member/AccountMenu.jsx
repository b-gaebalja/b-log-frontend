import React from 'react';
import {Account, AuthenticationContext, SessionContext} from "@toolpad/core";
import CustomMenuItems from "./CustomMenu.jsx";
import {getCookie} from "../../../util/cookieUtil.jsx";
import useCustomLogin from "../../../hooks/useCustomLogin.jsx";

function AccountMenu() {

  const memberInfo = getCookie('user')
  const{doLogout,moveToPath} = useCustomLogin()

  const demoSession = {
    user: {
      name: memberInfo.username,
      email: memberInfo.email,
      image: "https://ddipddipddip.s3.amazonaws.com/post/4/1728981670006_5.jpg"
    },
  };
  const [session, setSession] = React.useState(demoSession);
  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession(demoSession);
      },
      signOut: () => {
        doLogout()
        moveToPath('/')
      },
    };
  }, []);


  return (
      <AuthenticationContext.Provider value={authentication}>
        <SessionContext.Provider value={session}>
          <Account
              slots={{
                menuItems: CustomMenuItems,
              }}
          />
        </SessionContext.Provider>
      </AuthenticationContext.Provider>
  );
}

export default AccountMenu;