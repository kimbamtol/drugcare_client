'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Label } from "@/components/ui/label";
import Input from "@/components/ui/Input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getFcmToken } from '../../../firebase'; // 올바르게 import 되어 있는지 확인

export default function Component() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fcmToken, setFcmToken] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const requestPermission = async () => {
            try {
                const status = await Notification.requestPermission();
                if (status === 'granted') {
                    const token = await getFcmToken();
                    if (token) {
                        setFcmToken(token);
                    } else {
                        setError('FCM 토큰을 받아오지 못했습니다. 다시 시도해주세요.');
                    }
                } else {
                    setError('알림 권한이 거부되었습니다.');
                }
            } catch (err) {
                console.error('Error fetching FCM token:', err);
                setError('FCM 토큰을 받아오지 못했습니다. 다시 시도해주세요.');
            }
        };
        requestPermission();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!fcmToken) {
            setError('FCM 토큰을 받아오지 못했습니다. 알림 권한을 요청해주세요.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/login`, { email, password, fcmToken });
            localStorage.setItem('token', response.data.token);
            router.push('/Admin/Main');  // MainScreen으로 리디렉션
        } catch (err) {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1 flex items-center justify-center">
                <div className="w-full max-w-md space-y-4">
                    <div className="space-y-2">
                        <h1 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl md:text-5xl lg:text-6xl/none">
                            관리자 로그인
                        </h1>
                        <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 text-center">
                            아이디와 비밀번호를 입력하여 로그인하세요.
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
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
                        {error && <p className="text-red-500 text-center">{error}</p>}
                        <Button type="button" className="w-full" onClick={handleRequestPermission}>알림 권한 요청</Button>
                        <Button type="submit" className="w-full">로그인</Button>
                    </form>
                    <div className="text-center text-sm">
                        계정이 없으신가요?
                        <Link className="underline" href="/Admin/SignUp">
                            회원가입
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
