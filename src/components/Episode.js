import React from "react";

const Episode = ({ episodes }) => {
  // console.log("getall", episodes);
  return (
    <section className="container">
      <div className="row justify-content-center">
        {episodes &&
          episodes.map((data, index) => (
            <div key={index} className="episode-box shadow-sm">
              <h4>{data.name}</h4>
              <p>{data.air_date} </p>
              <h5> {data.episode} </h5>
            </div>
          ))}
      </div>
    </section>
  );
};

export default Episode;
