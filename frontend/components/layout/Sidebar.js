import * as React from 'react';
import { usePage } from '@/context/Page';
import { useRouter } from 'next/router'
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';

export default function Sidebar() {

    const { page } = usePage();
    const router = useRouter();

    function handleChangePage(path) {
        router.push("/dashboard" + path);
    }

    return (
        <div className='w-full h-full shadow-md grid grid-rows-sidebar_items'>
            <div className={`grid grid-rows-2 border border-slate-200 ${page === "Dashboard" && "text-red-400"} hover:text-red-400 cursor-pointer`} onClick={() => handleChangePage("/")}>
                <div className='justify-self-center self-end'>
                    <ComputerOutlinedIcon />
                </div>
                <div className='justify-self-center self-start'>
                    Dashboard
                </div>
            </div>
            <div className={`grid grid-rows-2 border border-slate-200 ${page === "Users" && "text-red-400"} hover:text-red-400 cursor-pointer`} onClick={() => handleChangePage("/users")}>
                <div className='justify-self-center self-end'>
                    <GroupOutlinedIcon />
                </div>
                <div className='justify-self-center self-start'>
                    Users
                </div>
            </div>
            <div className={`grid grid-rows-2 border border-slate-200 ${page === "Roles" && "text-red-400"} hover:text-red-400 cursor-pointer`} onClick={() => handleChangePage("/roles")}>
                <div className='justify-self-center self-end'>
                    <BadgeOutlinedIcon />
                </div>
                <div className='justify-self-center self-start'>
                    Roles
                </div>
            </div>
            <div className="flex flex-col justify-end">
                <div className='self-center px-2 py-4'>
                    <img
                        className="w-10"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Tailwind icon"
                    />
                </div>
                <div className='self-center px-2 py-4'>
                    <img
                        className="w-10"
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-plain.svg"
                        alt="Laravel icon"
                    />
                </div>
                <div className='self-center px-2 py-4'>
                    <img
                        className="w-10"
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"
                        alt="Next icon"
                    />
                </div>
            </div>
        </div>
    )
}