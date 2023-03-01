import * as React from 'react';
import { Layout } from '@/components/layout/Layout';
import { usePage } from '@/context/Page';

export default function Users() {

    const { setPage } = usePage();

    React.useEffect(() => {
        setPage("Users");
    }, []);

    return (
        <Layout>
            <h1>Users</h1>
        </Layout>
    )
}