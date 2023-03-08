import * as React from 'react';
import nookies from 'nookies'
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePage } from '@/context/Page';
import { AreaChart } from '@/components/charts/AreaChart';
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
                        <AreaChart />
                    </div>
                    <div className='rounded-lg shadow-card max-h-48' draggable onDrag={handleDragCard}>
                        <AreaChart />
                    </div>
                    <div className='rounded-lg shadow-card max-h-48' draggable onDrag={handleDragCard}>
                        <AreaChart />
                    </div>
                    <div className='rounded-lg shadow-card max-h-48' draggable onDrag={handleDragCard}>
                        <AreaChart />
                    </div>
                </div>
                <div className='rounded-lg shadow-card min-h-fit' draggable onDrag={handleDragCard}>
                    G
                </div>
            </div>
        </DashboardLayout>
    )
}

// https://nextjs.org/docs/basic-features/data-fetching/get-static-props
// https://nextjs.org/docs/basic-features/data-fetching/incremental-static-regeneration
export async function getStaticProps(context) {

    const cookies = nookies.get(context);
    console.log(cookies);

    return {
        props: {},
        revalidate: 60 * 60 * 1, // In seconds
    }
}