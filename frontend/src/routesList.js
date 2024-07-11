import { useState, useEffect } from "react";
import JoblyApi from "./api";

export function List({ type }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);

    useEffect(() => {
        async function getItems() {
            let items;
            switch (type) {
                case 'companies':
                    items = await JoblyApi.getCompanies();
                    items = items.sort((a, b) => a.id - b.id);
                    break;
                case 'jobs':
                    items = await JoblyApi.getJobs();
                    items = items.sort((a, b) => a.id - b.id);
                    break;
                case 'users':
                    items = await JoblyApi.getUsers();
                    items = items.sort((a, b) => a.id - b.id);
                    break;
                default:
                    console.log('Invalid type');
                    items = [];
                    break;
            }
            setData(items);
            setIsLoading(false);
        }
        getItems();
    }, [type]);

    // While fetching data from API, show loading icon
    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <table>
            <thead>
                {type === 'companies' && (
                    <tr>
                        <th>Company</th>
                        <th>Number of employees</th>
                    </tr>
                )}
                {type === 'jobs' && (
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Salary</th>
                    </tr>
                )}
                {type === 'users' && (
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Email</th>
                    </tr>
                )}
            </thead>
            <tbody>
                {type === 'companies' && data.map((d) => (
                    <tr key={d.name}>
                        <td>{d.name}</td>
                        <td>{d.numEmployees}</td>
                    </tr>
                ))}
                {type === 'jobs' && data.map((d) => (
                    <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.title}</td>
                        <td>{d.salary}</td>
                    </tr>
                ))}
                {type === 'users' && data.map((d) => (
                    <tr key={d.id}>
                        <td>{d.id}</td>
                        <td>{d.username}</td>
                        <td>{d.email}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export function Item() {
    return null;
}
