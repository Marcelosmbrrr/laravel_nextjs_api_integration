import * as React from 'react';
import { usePage } from '@/context/Page';
import { useRouter } from 'next/router';
import Header from './Header';
import Sidebar from './Sidebar';

export function Layout({ children }) {

    const { page } = usePage();
    const router = useRouter();

    return (
        <div className='w-screen h-screen flex flex-col bg-gray-100'>
            <Header />
            <main className='grow grid grid-cols-main'>
                <Sidebar />
                <div className='grid grid-rows-content gap-5 px-10 py-5'>
                    <div>
                        <h1 className='text-gray-600 text-page_title'>{page}</h1>
                    </div>
                    <div className='self-start h-full'>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}