import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import census  from 'citysdk'


import Table from "./table"
import './table.css'
import {useQuery} from "react-query";
import csvjson from './csvjson.json'



function App2() {
    const columns = useMemo(
        () => [
            {
                Header: "County",
                columns: [
                    {
                        Header: "Name",
                        accessor: "NAME"
                    }
                ]
            },
            {
                Header: " ",
                columns: [
                    {
                        Header: "Population (15 to 44 years)",
                        accessor: "POP"
                    },

                ]
            }
        ],
        []
    );



    const [dataTable, setDataTable] = React.useState([])

    function censusPromise(args) {
        return new Promise(function(resolve, reject) {
            census(args, function(err, json) {
                if (!err) {
                    resolve(json);
                } else {
                    reject(err);
                }
            });
        });
    }


    function getCensusA() {
        return censusPromise({
            vintage: "2019",
            geoHierarchy: {
                state: "23",
                county: "*"
            },
            sourcePath: ["pep", "charagegroups"],
            values: ["NAME", "AGEGROUP", "POP"],
            predicates: {
                AGEGROUP: "30" // number range separated by `:`
            },
            statsKey: "a019e5781e0a1ae25a17230a2e4404585c4ac414"
        })
    }

    const { data } = useQuery('test', getCensusA);

    React.useEffect(() => {

        if (!data) {
        } else {
            if (data) {
                setDataTable(data)
            }
        }
    }, [data])




    return (
        <div className="tablePop">
            <Table columns={columns} data={dataTable} />
        </div>
    );
}

export default App2;