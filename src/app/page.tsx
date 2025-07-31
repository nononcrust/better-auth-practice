"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function Home() {
  const { data: session, isPending } = authClient.useSession();

  return (
    <main className="h-dvh flex justify-center items-center">
      {session === null && isPending === false && (
        <div className="flex gap-2">
          <Button
            variant="primaryOutlined"
            render={<Link href="/login">로그인</Link>}
          />
          <Button render={<Link href="/register">회원가입</Link>} />
        </div>
      )}
      {session !== null && (
        <div className="flex gap-2">
          <Button onClick={() => authClient.signOut()}>로그아웃</Button>
          <Button variant="error" onClick={() => authClient.deleteUser()}>
            회원탈퇴
          </Button>
        </div>
      )}
    </main>
  );
}
