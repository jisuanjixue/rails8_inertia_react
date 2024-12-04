"use client";
import React from "react";
import { Label } from "@/components/ui/motion-label";
import { Input } from "@/components/ui/motion-input";
import LabelInputContainer from "@/components/ui/label-input-container";
import BottomGradient from "@/components/ui/bottom-gradient";
import {
    IconBrandGithub,
} from "@tabler/icons-react";
import { router, useForm } from '@inertiajs/react'

const LoginForm = ({ is_developer }: { is_developer: boolean }) => {
    const redirect_to_path = new URLSearchParams(window.location.search).get('redirect_to') || '/';
    const form = useForm({
        email: '',
        password: ''
    })
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        form.post('/sign_in')
    };

    const { data, setData, errors, processing } = form

    return (
        <div className="flex flex-col items-center justify-center min-h-screen ">
            <div className="w-full max-w-md p-4 mx-auto bg-white rounded-none md:rounded-2xl md:p-8 shadow-input dark:bg-black">
                <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                    欢迎您的到来！
                </h2>
                <p className="max-w-sm mt-2 text-sm text-neutral-600 dark:text-neutral-300">
                    登录账号开始您的欢快之旅
                </p>

                <form className="my-8" onSubmit={handleSubmit}>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">电子邮箱</Label>
                        <Input id="email" placeholder="projectmayhem@fc.com" type="email" name="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                        {errors.email && (
                            <div className="px-3 py-2 font-medium text-red-500">
                                {errors.email.join(', ')}
                            </div>
                        )}
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="password">密码</Label>
                        <Input id="password" placeholder="••••••••" type="password" name="password" value={data.password} onChange={(e) => setData('password', e.target.value)} />
                        {errors.password && (
                            <div className="px-3 py-2 font-medium text-red-500">
                                {errors.password.join(', ')}
                            </div>
                        )}
                    </LabelInputContainer>

                    <button
                        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                        type="submit"
                        disabled={processing}
                    >
                        登录 &rarr;
                        <BottomGradient />
                    </button>
                    <div className="flex items-center text-sm font-light text-gray-500 dark:text-gray-400">
                        还没有账号? <div onClick={() => { router.get(`/sign_up`) }} className="ml-1 font-medium text-primary-600 hover:underline dark:text-primary-500">点击注册</div>
                    </div>

                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                    <div className="flex flex-col space-y-4" onClick={() => { router.post(`/auth/github?redirect_to=${redirect_to_path}`) }}>
                        <button
                            className=" relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                            type="button"
                        >
                            <IconBrandGithub className="w-4 h-4 text-neutral-800 dark:text-neutral-300" />
                            <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                GitHub
                            </span>
                            <BottomGradient />
                        </button>
                    </div>
                    <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                    {is_developer && (
                        <div className="flex flex-col space-y-4">
                            <button
                                className="relative group/btn flex space-x-2 items-center justify-start px-4 w-full text-black rounded-md h-10 font-medium shadow-input bg-gray-50 dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
                                type="button"
                                onClick={() => router.post('/auth/developer')}
                            >
                                <span className="text-sm text-neutral-700 dark:text-neutral-300">
                                    用github登录 (开发环境)
                                </span>
                                <BottomGradient />
                            </button>
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default LoginForm