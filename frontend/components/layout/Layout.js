import * as React from 'react';
import { usePage } from '@/context/Page';
import { useRouter } from 'next/router';
import Header from './Header';
import Sidebar from './Sidebar';
import { useMenuOpen } from '@/context/MenuOpen';
import { useAuth } from '@/context/Auth';

export function Layout(props, { children }) {

    const { verifyAuthentication } = useAuth();
    const { open } = useMenuOpen();
    const { page } = usePage();
    const router = useRouter();

    React.useEffect(() => {
        verifyAuthentication();
    }, []);

    const subtitle = {
        Dashboard: "/",
        Users: "Dashboard / Users",
        Roles: "Dashboard / Roles"
    }

    return (
        <div className='w-screen h-screen flex flex-col bg-gray-100'>
            <Header />
            <main className={`grow grid ${open && "grid-cols-main"}`}>
                {open && <Sidebar />}
                <div className='grid grid-rows-content gap-5 px-10 py-5'>
                    <div className='flex flex-col'>
                        <h1 className='text-gray-600 text-page_title'>{page}</h1>
                        <span>{subtitle[page]}</span>
                    </div>
                    <div className='self-start h-full'>
                        {children}
                    </div>
                </div>
            </main>
        </div>
    )
}