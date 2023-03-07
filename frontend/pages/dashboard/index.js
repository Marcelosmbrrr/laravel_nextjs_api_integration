import * as React from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { parseCookies } from 'nookies';
import { usePage } from '@/context/Page';
import { axios } from '@/services/api';

export default function Dashboard(props) {

    const { setPage } = usePage();

    React.useEffect(() => {
        setPage("Dashboard");
    }, []);

    function handleDragCard(e) {
        console.log(e)
    }

    return (
        <DashboardLayout>
            <div className='w-full h-full grid grid-cols-none gap-2 grid-rows-min_dash sm:grid-rows-sm_dash md:grid-rows-md_dash lg:grid-rows-lg_dash'>
                <div className='grid grid-cols-none grid-rows-4 gap-2 sm:grid-rows-sm_dash_cards sm:grid-cols-2 md:grid-rows-md_dash_cards md:grid-cols-2 lg:grid-cols-4 lg:grid-rows-lg_dash_cards'>
                    <div className='rounded-lg shadow-card max-h-48' draggable onDrag={handleDragCard}>
                        A
                    </div>
                    <div className='rounded-lg shadow-card max-h-48' draggable onDrag={handleDragCard}>
                        B
                    </div>
                    <div className='rounded-lg shadow-card max-h-48' draggable onDrag={handleDragCard}>
                        C
                    </div>
                    <div className='rounded-lg shadow-card max-h-48' draggable onDrag={handleDragCard}>
                        D
                    </div>
                </div>
                <div className='rounded-lg shadow-card min-h-fit' draggable onDrag={handleDragCard}>
                    G
                </div>
            </div>
        </DashboardLayout>
    )
}

export async function getServerSideProps(context) {
    const { "next.auth": token } = parseCookies(context);
    console.log('dashboard')
    console.log(token)

    return {
        props: {}, // will be passed to the page component as props
    }
}