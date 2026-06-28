import {

    RadialBarChart,

    RadialBar,

    ResponsiveContainer

} from "recharts";

export default function SAIFIChart({

    value

}){

    const data=[

        {

            value

        }

    ];

    return(

        <div className="card shadow-sm">

            <div className="card-header">

                SAIFI

            </div>

            <div className="card-body">

                <ResponsiveContainer
                    width="100%"
                    height={250}
                >

                    <RadialBarChart

                        data={data}

                    >

                        <RadialBar

                            dataKey="value"

                        />

                    </RadialBarChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}