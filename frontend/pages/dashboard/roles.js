import * as React from 'react';
import { Layout } from '@/components/layout/Layout';
import { usePage } from '@/context/Page';

export default function Roles() {

    const { setPage } = usePage();

    React.useEffect(() => {
        setPage("Roles");
    }, []);

    return (
        <Layout>
            <h1>Roles</h1>
        </Layout>
    )
}