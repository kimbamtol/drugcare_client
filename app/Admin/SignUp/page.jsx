'use client';

import { useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import Input from "@/components/ui/Input"; // default import로 변경
import axios from 'axios'; // 서버와 통신하기 위해 axios 추가

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [error, setError] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/signup`, {
                email,
                password,
                authCode
            });
            // 성공적으로 회원가입이 되면 로그인 페이지로 리디렉션
            if (response.status === 200) {
                window.location.href = '/Admin/Login';
            }
        } catch (err) {
            setError('회원가입에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl lg:text-6xl/none">
                            회원가입
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 text-center">
                            정보를 입력하여 회원가입하세요.
                        </p>
                    </div>
                    <form onSubmit={handleSignUp} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">아이디</Label>
                            <Input
                                id="email"
                                placeholder="Your_ID"
                                type="text"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">비밀번호</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="authCode">인증 코드</Label>
                            <Input
                                id="authCode"
                                placeholder="4자리 인증 코드"
                                type="text"
                                value={authCode}
                                onChange={(e) => setAuthCode(e.target.value)}
                            />
                        </div>
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <Button type="submit" className="w-full">회원가입</Button>
                    </form>
                    <div className="text-center text-sm">
                        이미 계정이 있으신가요?
                        <Link className="underline" href="/Admin/Login">
                            로그인
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
