import * as React from 'react';
import Router from 'next/router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import MeetingRoomOutlinedIcon from '@mui/icons-material/MeetingRoomOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { useMenuOpen } from '@/context/MenuOpen';
import { useAuth } from '@/context/Auth';
import { useSnackbar } from 'notistack';

export default function Header() {

    const { enqueueSnackbar } = useSnackbar();
    const { logout } = useAuth();
    const { setOpen } = useMenuOpen();

    async function handleLogout() {
        await logout();
        enqueueSnackbar("Your session was finished!", { variant: "success" });
    }

    function handleMenuToggle() {
        setOpen((prev) => !prev);
    }

    return (
        <header className='flex justify-center w-full basis-20 bg-white shadow-md'>
            <div className='grid grid-cols-header grid-rows-none w-header h-full gap-3 justify-items-center items-center'>
                <div>
                    <FontAwesomeIcon icon={faBars} size="xl" color='#4B5563' className='hover:text-red-400 cursor-pointer' onClick={handleMenuToggle} />
                </div>
                <div>
                    <h1 className="pb-0 mb-0 text-gray-400 text-header_title"><span className='text-red-400'>Lara</span>Next</h1>
                </div>
                <div className='flex justify-self-end'>
                    <div className='pr-6'>
                        <SettingsOutlinedIcon className='hover:text-red-400 text-slate-600 cursor-pointer' />
                    </div>
                    <div className='pr-6'>
                        <NotificationsOutlinedIcon className='hover:text-red-400 text-slate-600 cursor-pointer' />
                    </div>
                    <div>
                        <MeetingRoomOutlinedIcon className='hover:text-red-400 text-slate-600 cursor-pointer' onClick={handleLogout} />
                    </div>
                </div>
            </div>
        </header>
    )
}