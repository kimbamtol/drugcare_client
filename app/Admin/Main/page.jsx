'use client';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { getFcmToken } from '../../../firebase';

export default function Component() {
    const [fcmToken, setFcmToken] = useState('');

    useEffect(() => {
        const fetchFcmToken = async () => {
            const token = await getFcmToken();
            setFcmToken(token);
        };
        fetchFcmToken();
    }, []);

    const handlePushNotification = async () => {
        if (!fcmToken) {
            alert('FCM 토큰을 가져오지 못했습니다.');
            return;
        }

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/admin/sendNotification`, {
                title: '테스트 알림',
                body: '이것은 테스트 알림입니다.',
                token: fcmToken
            });
            alert('푸시 알림이 전송되었습니다.');
        } catch (error) {
            console.error('푸시 알림 전송 오류:', error);
            alert('푸시 알림 전송에 실패했습니다.');
        }
    };

    return (
        <div className="flex flex-col min-h-[100dvh]">
            <main className="flex-1">
                <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
                    <div className="container px-4 md:px-6">
                        <div className="flex flex-col items-center space-y-4 text-center">
                            <div className="space-y-2">
                                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                                    사용자 관리
                                </h1>
                                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                                    사용자 별 카테고리 및 약품을 확인하세요.
                                </p>
                            </div>
                            <div className="w-full max-w-md space-y-4">
                                <Button onClick={handlePushNotification} className="w-full mt-4">푸시 알림 테스트</Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}
