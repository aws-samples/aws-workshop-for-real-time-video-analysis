import React from "react";
import { CLOUDFRONT_URL } from "../config"

const EntityList = ({ results }) => {

  const filtered = results.filter((ele, index) => results.findIndex(obj => obj.name === ele.name && obj._source.ts === ele._source.ts) === index)

  const generateDatabaseDateTime = (date) => {
    return date.toLocaleString().replace(",", " ");
  }

  return (
    <div>
      {filtered?.length > 0 ?
        <h3 className="entity_search"> Search Results</h3> : null
      }
      {filtered?.map((result, index) => {
        const video_url = result._source.videoClipName;

        const absolute_video_url = 'https://' + CLOUDFRONT_URL + "/" + video_url
        const base_ts = result._source.base_timestamp
        const ts = result._source.ts
        const timestamp = new Date(parseInt(base_ts) + parseInt(ts))
        return (
          <div key={index}>
            <hr />
            <div className="entity" key={result.name}>
              <video className="video" controls>
                <source src={`${absolute_video_url}`} type="video/mp4" />
              </video>
              <section className="entity_info">
                <div ><b>Entity Detected:</b> {result._source.name}</div>
                <div ><b>Entity Detection Time:</b> {generateDatabaseDateTime(timestamp)}</div>
              </section>
            </div>
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default EntityList;
