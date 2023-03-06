import * as React from 'react';
import { parseCookies } from 'nookies';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePage } from '@/context/Page';

export default function Users() {

    const { setPage } = usePage();

    React.useEffect(() => {
        setPage("Users");
    }, []);

    return (
        <DashboardLayout>
            <h1>Users</h1>
        </DashboardLayout>
    )
}

export async function getServerSideProps(context) {
    const { "next.auth": token } = parseCookies(context);
    console.log('users');
    console.log(token);

    return {
        props: {}, // will be passed to the page component as props
    }
}