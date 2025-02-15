"use client";

import EmailLogin from "@/components/EmailLogin/EmailLogin";
import SignUp from "@/components/SignUp/SignUp";
import UserInfo from "@/components/UserInfo/UserInfo";

export default function LoginPage() {
  return (
    <div>
      <h1>ログイン画面</h1>
      <SignUp />
      <EmailLogin />
      <UserInfo />
    </div>
  );
}
