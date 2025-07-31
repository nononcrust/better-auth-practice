"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { sessionQueryOptions, useSignOutMutation } from "@/lib/auth/hooks";
import { DropdownMenu } from "../ui/dropdown-menu";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { LogOutIcon, SettingsIcon } from "lucide-react";

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
          <DropdownMenu.Content className="pt-0">
            <div className="flex p-3 border-b border-border gap-3 pr-8 items-center">
              <div className="size-10 rounded-full bg-background-100" />
              <div className="flex flex-col">
                <span className="text-sm font-semibold">
                  {session.user.name}
                </span>
                <span className="block text-[0.8125rem] text-sub">
                  {session.user.email}
                </span>
              </div>
            </div>
            <DropdownMenu.Item
              className="mt-1 disable-focus-ring"
              render={
                <Link href="/account">
                  <SettingsIcon className="text-subtle" size={16} />
                  계정 관리
                </Link>
              }
            />
            <DropdownMenu.Separator />
            <DropdownMenu.Item
              onClick={() => signOutMutation.mutate()}
              disabled={signOutMutation.isPending}
            >
              <LogOutIcon className="text-subtle" size={16} />
              로그아웃
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu>
      )}
    </div>
  );
};
