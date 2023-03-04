import * as React from 'react';
import { parseCookies } from 'nookies';
import { Layout } from '@/components/layout/Layout';
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
        <Layout>
            <div className='w-full h-full grid grid-rows-dashboard gap-2'>
                <div className='grid grid-cols-none grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-none gap-5'>
                    <div className='rounded-lg bg-red-200' draggable onDrag={handleDragCard}>
                        A
                    </div>
                    <div className='rounded-lg bg-red-300' draggable onDrag={handleDragCard}>
                        B
                    </div>
                    <div className='rounded-lg bg-red-400' draggable onDrag={handleDragCard}>
                        C
                    </div>
                    <div className='rounded-lg bg-red-400' draggable onDrag={handleDragCard}>
                        D
                    </div>
                </div>
                <div className='rounded-lg bg-green-200' draggable onDrag={handleDragCard}>
                    G
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { "auth-token": token } = parseCookies(context);
    console.log('dashboard')
    console.log(token)

    return {
        props: {}, // will be passed to the page component as props
    }
}