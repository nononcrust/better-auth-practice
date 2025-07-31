"use client";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

const registerFormSchema = z.object({
  name: z.string().nonempty({ message: "이름을 입력해주세요." }),
  email: z.string().nonempty({ message: "이메일을 입력해주세요." }),
  password: z.string().nonempty({ message: "비밀번호를 입력해주세요." }),
});

export default function RegisterPage() {
  const form = useForm({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "노논",
      email: "nononcrust@gmail.com",
      password: "shshs123123!",
    },
  });

  const router = useRouter();

  const onSubmit = form.handleSubmit(async (formData) => {
    const { error } = await authClient.signUp.email(
      {
        email: formData.email,
        password: formData.password,
        name: formData.name,
      },
      {
        onSuccess: () => {
          router.replace("/");
        },
      }
    );

    if (error && error.code === authClient.$ERROR_CODES.USER_ALREADY_EXISTS) {
      console.log("이미 가입된 이메일입니다.");
    }
  });

  return (
    <div className="px-4 md:mx-auto md:max-w-sm">
      <main className="mt-24 w-full">
        <Form onSubmit={onSubmit}>
          <Form.Item error={!!form.formState.errors.name}>
            <Form.Label>이름</Form.Label>
            <Form.Control>
              <Input
                className="h-10"
                placeholder="이름을 입력해주세요"
                {...form.register("name")}
              />
            </Form.Control>
            <Form.ErrorMessage>
              {form.formState.errors.email?.message}
            </Form.ErrorMessage>
          </Form.Item>
          <Form.Item className="mt-4" error={!!form.formState.errors.email}>
            <Form.Label>이메일</Form.Label>
            <Form.Control>
              <Input
                className="h-10"
                placeholder="이메일을 입력해주세요"
                {...form.register("email")}
              />
            </Form.Control>
            <Form.ErrorMessage>
              {form.formState.errors.email?.message}
            </Form.ErrorMessage>
          </Form.Item>
          <Form.Item className="mt-4" error={!!form.formState.errors.password}>
            <Form.Label>비밀번호</Form.Label>
            <div className="relative">
              <Form.Control>
                <Input
                  className="h-10 pr-8"
                  placeholder="비밀번호를 입력해주세요"
                  type="password"
                  {...form.register("password")}
                />
              </Form.Control>
            </div>
            <Form.ErrorMessage>
              {form.formState.errors.password?.message}
            </Form.ErrorMessage>
          </Form.Item>
          <Button className="mt-8 w-full" type="submit" size="large">
            로그인
          </Button>
        </Form>
      </main>
    </div>
  );
}
