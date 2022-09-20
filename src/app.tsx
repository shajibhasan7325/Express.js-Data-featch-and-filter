import React, { Fragment, useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([] as any);
  const [keyword, setKeyword] = useState("");
  const [keyword2, setKeyword2] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    try {
      (async () => {
        fetch("http://localhost:3001/series")
          .then((res) => res.json())
          .then((data) => {
            setData(data);
            setFilteredData(data);
          });
        fetch("http://localhost:3001/score")
          .then((res) => res.json())
          .then((data) => setData2(data));
      })();
    } catch (error) {
      console.log(error);
    }
  }, []);

  console.log(data2);

  useEffect(() => {
    const result = data.filter(
      (v: any) =>
        v.title.toLowerCase().includes(keyword) &&
        v.tournament.name.toLowerCase().includes(keyword2)
    );
    setFilteredData(result);
  }, [data, keyword, keyword2]);

  return (
    <Fragment>
      <div className=" max-w-[1200px] m-auto py-10 bg-black">
        <div className="grid grid-cols-2 gap-2 mb-2">
          <input
            onChange={(e: any) => setKeyword2(e.target.value)}
            type="text"
            className="px-3 py-3 leading-tight text-gray-100 bg-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            placeholder="Filter By tournament name"
          />
          <input
            onChange={(e: any) => setKeyword(e.target.value)}
            className="px-3 py-3 leading-tight text-gray-100 bg-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Filter By Title"
          />
        </div>
        <div className="flex items-center justify-between p-2 mb-2 text-white transition bg-gray-800 rounded cursor-pointer hover:bg-gray-900">
          <p className="flex-1">TITLE</p>
          <p className="flex-1">TIME</p>
          <p className="flex-1">TEAM 1</p>
          <p className="flex-1">TEAM 2</p>
          <p className="flex-1">TOURNAMENT</p>
        </div>
        {filteredData?.map((v: any, i: number) => (
          <div
            key={v.id}
            className="flex items-center justify-between p-2 mb-2 text-white transition bg-gray-800 rounded cursor-pointer hover:bg-gray-900"
          >
            <p className="flex-1">{v.title}</p>
            <p className="flex-1">
              {new Date(v.startTime).toLocaleTimeString()}
            </p>
            {v.teams.map((v2: any) => (
              <Fragment key={v2.id}>
                <img
                  src={v2.logoUrl}
                  alt="img"
                  width={20}
                  height={20}
                  className="mr-2"
                />
                <p className="flex-1">{v2.name}</p>
                <p className="flex-1">
                  {data2?.[i]?.games?.[0]?.teams?.[0]?.score}
                </p>
              </Fragment>
            ))}
            <p className="flex-1">{v.tournament.name}</p>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default App;
