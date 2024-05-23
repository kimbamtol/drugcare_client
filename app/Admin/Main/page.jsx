"use client";

import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { SelectValue, SelectTrigger, SelectContent, Select } from "@/components/ui/select";
import Input from "@/components/ui/Input";
import { getFcmToken } from '../../../firebase'; // Firebase에서 FCM 토큰 가져오는 함수
import axios from 'axios';

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
            await axios.post('https://fcm.googleapis.com/fcm/send', {
                to: fcmToken,
                notification: {
                    title: '테스트 알림',
                    body: '이것은 테스트 알림입니다.'
                }
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `BAMeCRtrCQ_0J0myNY9PShlafJtFJT7Jw8_n1C6JJM-N2fzUnDfx04D2U9bvjXGN-V5-huBUqxpLxJtH4tjHrHA` // FCM 서버 키 
                }
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
                                <div className="flex items-center justify-between">
                                    <h2 className="text-lg font-medium">People</h2>
                                    <div className="flex items-center space-x-2">
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button className="rounded-full" size="icon" variant="outline">
                                                    <ClockIcon className="h-5 w-5" />
                                                    <span className="sr-only">Set Time</span>
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent align="start" className="w-auto p-0">
                                                <div className="grid gap-4 p-4">
                                                    <div className="grid grid-cols-2 gap-2">
                                                        <Label htmlFor="hour">Hour</Label>
                                                        <Select defaultValue="12" id="hour">
                                                            <SelectTrigger className="w-20">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent />
                                                        </Select>
                                                        <Label htmlFor="minute">Minute</Label>
                                                        <Select defaultValue="00" id="minute">
                                                            <SelectTrigger className="w-20">
                                                                <SelectValue placeholder="Select" />
                                                            </SelectTrigger>
                                                            <SelectContent />
                                                        </Select>
                                                    </div>
                                                    <div className="flex justify-end">
                                                        <Button>Set Time</Button>
                                                    </div>
                                                </div>
                                            </PopoverContent>
                                        </Popover>
                                        <Button className="rounded-full" size="icon" variant="outline">
                                            <PlusIcon className="h-5 w-5" />
                                            <span className="sr-only">Add Person</span>
                                        </Button>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Input id="name" placeholder="Enter name" />
                                    <Button className="w-full">Save</Button>
                                </div>
                                <Button onClick={handlePushNotification} className="w-full mt-4">푸시 알림 테스트</Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

function ClockIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    )
}

function PlusIcon(props) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M5 12h14" />
            <path d="M12 5v14" />
        </svg>
    )
}
