"use client";

import { Button } from "@/components/ui/button";
import { Suspense } from "@suspensive/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  accountListQueryOptions,
  useDeleteUserMutation,
  useLinkSocialMutation,
  useUnlinkSocialMutation,
} from "@/lib/auth/hooks";
import { Prompt } from "@/components/ui/prompt";
import { Tooltip } from "@/components/ui/tooltip";

export default function AccountPage() {
  return (
    <main className="mt-8 flex flex-col max-w-sm mx-auto w-full">
      <Suspense>
        <Account />
      </Suspense>
    </main>
  );
}

const Account = () => {
  const { data: accounts } = useSuspenseQuery({
    ...accountListQueryOptions,
  });

  const googleAccount = accounts.find(
    (account) => account.provider === "google"
  );

  const linkSocialMutation = useLinkSocialMutation();

  return (
    <div className="flex flex-col">
      <h3 className="mt-8 font-semibold">소셜 계정 관리</h3>
      <div className="flex justify-between items-center gap-4 mt-4">
        <span>구글</span>
        {!!googleAccount ? (
          <GoogleUnlinkButton />
        ) : (
          <Button
            size="xsmall"
            onClick={() =>
              linkSocialMutation.mutate({
                provider: "google",
              })
            }
          >
            연결하기
          </Button>
        )}
      </div>
      <UnregisterButton />
    </div>
  );
};

const UnregisterButton = () => {
  const deleteUserMutation = useDeleteUserMutation();

  return (
    <Prompt>
      <Prompt.Trigger
        render={
          <Button size="xsmall" className="mt-12 w-fit" variant="error">
            회원탈퇴
          </Button>
        }
      />
      <Prompt.Content>
        <Prompt.Header>
          <Prompt.Title>회원탈퇴</Prompt.Title>
          <Prompt.Description>
            정말로 회원탈퇴를 하시겠습니까?
          </Prompt.Description>
        </Prompt.Header>
        <Prompt.Footer>
          <Prompt.Cancel>취소</Prompt.Cancel>
          <Prompt.Action
            variant="error"
            onClick={() => deleteUserMutation.mutate()}
          >
            탈퇴하기
          </Prompt.Action>
        </Prompt.Footer>
      </Prompt.Content>
    </Prompt>
  );
};

const GoogleUnlinkButton = () => {
  const { data: accounts } = useSuspenseQuery({
    ...accountListQueryOptions,
  });

  const unlinkSocialMutation = useUnlinkSocialMutation();

  const isLastAccount = accounts.length === 1;

  return isLastAccount ? (
    <Tooltip content="마지막 소셜 계정은 연결 해제할 수 없습니다.">
      <div>
        <Button size="xsmall" variant="primaryOutlined" disabled>
          연결 해제
        </Button>
      </div>
    </Tooltip>
  ) : (
    <Button
      size="xsmall"
      variant="primaryOutlined"
      onClick={() => unlinkSocialMutation.mutate({ providerId: "google" })}
    >
      연결 해제
    </Button>
  );
};
