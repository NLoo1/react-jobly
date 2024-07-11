import React, { useState, useEffect } from "react";
import JoblyApi from "./api";
import { Link } from "react-router-dom";
import ReactSearchBox from "react-search-box";

export function List({ type }) {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        async function getItems() {
            let items;
            switch (type) {
                case 'companies':
                    items = await JoblyApi.getCompanies();
                    break;
                case 'jobs':
                    items = await JoblyApi.getJobs();
                    break;
                case 'users':
                    items = await JoblyApi.getUsers();
                    break;
                default:
                    console.log('Invalid type');
                    items = [];
                    break;
            }
            items = items.sort((a, b) => a.id - b.id);
            setData(items);
            setFilteredData(items);
            setIsLoading(false);
        }
        getItems();
    }, [type]);

    // Update filteredData when searchTerm changes
    useEffect(() => {
        const filtered = data.filter(item => {
            // Ensure item and fields are defined before accessing them
            const name = item.name ? item.name.toLowerCase() : '';
            const title = item.title ? item.title.toLowerCase() : '';
            const username = item.username ? item.username.toLowerCase() : '';
    
            return (
                name.includes(searchTerm.toLowerCase()) ||
                title.includes(searchTerm.toLowerCase()) ||
                username.includes(searchTerm.toLowerCase())
            );
        });
        setFilteredData(filtered);
    }, [data, searchTerm]);
    

    // While fetching data from API, show loading icon
    if (isLoading) {
        return <p>Loading &hellip;</p>;
    }

    return (
        <section>
           <ReactSearchBox
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e)}
/>

            <table className='table table-responsive table-striped table-dark'>
                <thead>
                    {type === 'companies' && (
                        <tr>
                            <th scope='col'>Company</th>
                            <th scope='col'>Number of employees</th>
                            <th scope='col'>Description</th>
                        </tr>
                    )}
                    {type === 'jobs' && (
                        <tr>
                            <th>ID</th>
                            <th>Title</th>
                            <th>Salary</th>
                            <th>Equity</th>
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
                    {filteredData.map((d) => (
                        <Item key={d.id} data={d} type={type} />
                    ))}
                </tbody>
            </table>
        </section>
    );
}

// An individual company, user, or job
export function Item({ data, type }) {
    switch (type) {
        case 'companies':
            return (
                <tr>
                    <td><Link to={'/companies/' + data.handle}>{data.name}</Link></td>
                    <td>{data.numEmployees}</td>
                    <td>{data.description}</td>
                </tr>
            );
        case 'jobs':
            return (
                <tr>
                    <td><Link to={'/jobs/' + data.id}>{data.id}</Link></td>
                    <td>{data.title}</td>
                    <td>${data.salary}</td>
                    <td>${data.equity}</td>
                </tr>
            );
        case 'users':
            return (
                <tr key={data.id}>
                    <td>{data.id}</td>
                    <td>{data.username}</td>
                    <td>{data.email}</td>
                </tr>
            );
        default:
            console.log('Invalid type');
            return null;
    }
}
