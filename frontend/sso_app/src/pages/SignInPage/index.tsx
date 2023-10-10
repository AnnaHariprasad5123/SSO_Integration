import React from "react";
import LoginTemplate from "../../components/template/LoginTemplate";
import { SignIn } from "../../components/organisms/SignIn";

const SignInPage = () => {
  return (
    <LoginTemplate
      leftComponent={
        <img
          src="https://blog.cdn.cmarix.com/blog/wp-content/uploads/2020/01/Importance-different-ways-to-Implement-Single-Sign-On-SSO.png"
          alt="SSO"
          height="300px"
          width="600px"
        />
      }
      rightComponent={<SignIn />}
    />
  );
};

export default SignInPage;
