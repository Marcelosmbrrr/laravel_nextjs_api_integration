import * as React from 'react';
import dns from 'dns/promises';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useSnackbar } from 'notistack';
import Router from 'next/router';
import { env } from '@/next.config';
import nookies from 'nookies';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { CreateUser } from '@/components/formulary/user/CreateUser';
import { UpdateUser } from '@/components/formulary/user/UpdateUser';
import { DeleteUser } from '@/components/formulary/user/DeleteUser';
import { usePage } from '@/context/Page';
import { axios } from "../../services/api";
import { useAuth } from '@/context/Auth';

export default function Users(props) {

    const { setPage } = usePage();
    const { user } = useAuth();
    const { enqueueSnackbar } = useSnackbar();

    const [selections, setSelections] = React.useState([]);

    React.useEffect(() => {
        setPage("Users");
        enqueueSnackbar(props.message, { variant: props.error ? "error" : "success" });
    }, []);

    function renderTableRows() {
        if (props.users.length > 0) {

            const rows = props.users.map((record, index) =>

                <tr className="bg-white border-b dark:border-gray-100 hover:bg-gray-50" key={record.id}>
                    <td className="w-4 p-4">
                        <div className="flex items-center">
                            <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" onClick={(e) => handleSelect(e, "one", index)} />
                        </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {record.id}
                    </th>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {record.name}
                    </th>
                    <td className="px-6 py-4">
                        {record.email}
                    </td>
                    <td className="px-6 py-4">
                        {record.created_at}
                    </td>
                </tr>

            )

            return rows;

        } else {
            return <h1>Nothing found.</h1>
        }
    }

    function handleSelect(e, type, index) {
        console.log('select');
    }

    return (
        <DashboardLayout>
            <div className='w-full h-full rounded-lg shadow-card p-2'>
                <div className="w-full h-full flex flex-col">
                    <div className="basis-10 grid grid-rows-none grid-cols-table_head">
                        <div>
                            <CreateUser disabled={selections.length > 0} />
                        </div>
                        <div>
                            <UpdateUser disabled={selections.length > 1 || selections.length === 0} />
                        </div>
                        <div>
                            <DeleteUser disabled={selections.length === 0} />
                        </div>
                        <div onClick={() => Router.replace(Router.asPath)}>
                            <IconButton>
                                <RefreshIcon />
                            </IconButton>
                        </div>
                    </div>
                    <div className="grow p-2">
                        <div className="relative overflow-x-auto">

                            <div className="relative overflow-x-auto shadow-md">
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 border dark:text-red-400">
                                        <tr>
                                            <th scope="col" className="p-4">
                                                <div className="flex items-center">
                                                    <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 focus:ring-2" onClick={(e) => handleSelect(e, "all", null)} />
                                                </div>
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Identifier
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Name
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Email
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Created at
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {renderTableRows()}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout >
    )
}

export async function getServerSideProps(context) {

    dns.setDefaultResultOrder('ipv4first');

    let props = {
        users: [],
        error: false,
        message: ""
    }

    try {

        const cookies = nookies.get(context);

        if (!cookies["XSRF-TOKEN"]) {
            throw new Error("Session Token expired!");
        }

        if (!cookies["next.auth"]) {
            throw new Error("Authentication Token expired!");
        }

        const headers = {
            'X-CSRF-Token': cookies["XSRF-TOKEN"],
            'Authorization': `Bearer ${cookies["next.auth"]}`
        };

        const response = await axios.get(`${env.API_URL}/api/user`, headers);

        props.users = response.data.users;
        props.message = response.data.message;

        return {
            props: props
        }

    } catch (e) {
        console.log(e);
        props.error = true;
        if (e.response) {
            props.message = e.response.data.message;
        } else {
            props.message = e.message;
        }

        return {
            props: props
        }

    }

}