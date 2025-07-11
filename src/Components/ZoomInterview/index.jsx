import React from "react";

export default function ZoomInterview() {
    const [userName, setUserName] = React.useState("");
    const getNationalityApi = (u) => `https://api.nationalize.io/?name=${u}`;
    const getGenderApi = (u) => `https://api.genderize.io/?name=${u}`;
    const getAgeApi = (u) => `https://api.agify.io/?name=${u}`;

    function handleSubmit(submittedValue) {
        setUserName(submittedValue);
    }

    const borderStyle = { border: "1px solid black" };

    return (
        <>
            <div style={{ margin: "30px" }}>
                <Form handleSubmit={handleSubmit} />
            </div>
            <table style={{ margin: "30px" }}>
                <thead>
                    <tr style={borderStyle}>
                        <th style={borderStyle}>Age</th>
                        <th style={borderStyle}>Gender</th>
                        <th style={borderStyle}>Nationality</th>
                    </tr>
                </thead>
                <tbody>
                    <tr key={1} style={borderStyle}>
                        <td style={borderStyle}>
                            <Cell
                                userName={userName}
                                getApi={getAgeApi}
                                handleData={(data) => data.age}
                            />
                        </td>
                        <td key={2} style={borderStyle}>
                            <Cell
                                userName={userName}
                                getApi={getGenderApi}
                                handleData={(data) => data.gender}
                            />
                        </td>
                        <td key={3} style={borderStyle}>
                            <Cell
                                userName={userName}
                                getApi={getNationalityApi}
                                handleData={(data) =>
                                    data.country[0].country_id
                                }
                            />
                        </td>
                    </tr>
                </tbody>
            </table>
        </>
    );
}

function Cell({ userName, getApi, handleData }) {
    const [data, setData] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);
    const [error, setError] = React.useState("");

    React.useEffect(() => {
        if (userName !== "") {
            async function fetchData() {
                setIsLoading(true);

                try {
                    const response = await fetch(getApi(userName))
                        .then((resp) => {
                            if (resp.status !== 200) {
                                setError("x");
                            } else {
                                setError("");
                                return resp.json();
                            }
                        })
                        .then((resp) => handleData(resp));

                    setData(response);
                } catch {
                    setError("x");
                } finally {
                    setIsLoading(false);
                }
            }
            fetchData();
        }
    }, [userName, getApi, handleData]);

    if (isLoading) {
        return (
            <div style={{ color: "yellow", padding: "10px" }}>Loading...</div>
        );
    } else if (error) {
        return <div style={{ color: "red", padding: "10px" }}>{error}</div>;
    } else {
        return <div style={{ padding: "10px" }}>{data}</div>;
    }
}

function Form({ handleSubmit }) {
    const [userName, setUserName] = React.useState("");
    return (
        <>
            <input
                name={userName}
                onChange={(e) => setUserName(e.target.value)}
            />
            <button
                onClick={() => {
                    handleSubmit(userName);
                }}
            >
                Submit
            </button>
        </>
    );
}
