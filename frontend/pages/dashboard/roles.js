import * as React from 'react';
import { parseCookies } from 'nookies';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { usePage } from '@/context/Page';

export default function Roles() {

    const { setPage } = usePage();

    React.useEffect(() => {
        setPage("Roles");
    }, []);

    return (
        <DashboardLayout>
            <h1>Roles</h1>
        </DashboardLayout>
    )
}

export async function getServerSideProps(context) {
    const { "next.auth": token } = parseCookies(context);
    console.log('roles');
    console.log(token);

    return {
        props: {}, // will be passed to the page component as props
    }
}