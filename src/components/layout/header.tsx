"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { sessionQueryOptions, useSignOutMutation } from "@/lib/auth/hooks";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Header = () => {
  return (
    <header className="flex justify-end items-center h-14 px-4">
      <Suspense clientOnly>
        <HeaderRight />
      </Suspense>
    </header>
  );
};

const HeaderRight = () => {
  const { data: session } = useSuspenseQuery(sessionQueryOptions);

  const signOutMutation = useSignOutMutation();

  return (
    <div className="flex items-center">
      {session === null && (
        <div className="flex items-center gap-2">
          <Button
            size="xsmall"
            variant="outlined"
            render={<Link href="/login">로그인</Link>}
          />
          <Button
            size="xsmall"
            render={<Link href="/register">회원가입</Link>}
          />
        </div>
      )}
      {session !== null && (
        <DropdownMenu>
          <DropdownMenu.Trigger className="bg-background-100 size-8 rounded-full" />
          <DropdownMenu.Content>
            <DropdownMenu.Item
              render={<Link href="/account">계정 관리</Link>}
            />
            <DropdownMenu.Item
              onClick={() => signOutMutation.mutate()}
              disabled={signOutMutation.isPending}
            >
              로그아웃
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      )}
    </div>
  );
};
