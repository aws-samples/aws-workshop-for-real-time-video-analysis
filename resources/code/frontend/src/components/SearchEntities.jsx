import { Typeahead } from 'react-bootstrap-typeahead';
import { useEffect, useState } from 'react';
import { API_GW_URL } from '../config';
import { TimeFilter } from './TimeFilter';

const SearchEntities = (props) => {

  const nextDay = new Date()
  nextDay.setDate(nextDay.getDate() + 1);
  const prevDay = new Date()
  prevDay.setDate(prevDay.getDate() - 1)
  const [entities, setEntites] = useState([])
  const [selected] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [startTime, setStartTime] = useState(prevDay);
  const [endTime, setEndTime] = useState(nextDay);

  useEffect(() => {
    fetchEntities().then((entities) => {
      setEntites(entities);
    });

  }, []);

  useEffect(() => {
    fetchEntities().then((entities) => {
      setEntites(entities);
    });
  }, [selected]);


  useEffect(() => {
    changeHandler()
  }, [startTime, endTime])


  const onStartTimeChange = (value) => {
    console.log(1)
    setStartTime(value)
  }

  const onEndTimeChange = (value) => {
    setEndTime(value)

  }


  const changeHandler = async (current) => {
    console.log(2)
    const search_term = current && current.length > 0 ? current[0].name : searchTerm
    setSearchTerm(search_term)
    return fetch(
      `${API_GW_URL}?q=${search_term}`
    )
      .then((res) => res.json())
      .then((entitiesData) => {
        const results = entitiesData?.hits?.hits
        const filtered = results ? results.filter((ele, index) => {
          if (ele._source.base_timestamp > startTime && ele._source.base_timestamp < endTime) {
            return true
          }
          return false;
        }) : []
        props.handleOnChange(filtered)
      });
  };


  const fetchEntities = async () => {
    return fetch(
      `${API_GW_URL}`
    )
      .then((res) => res.json())
      .then((entitiesData) => {
        const result = entitiesData?.hits?.hits;
        const entities = result ? result.map(e => e._source) : []
        const unique_entities = entities.filter((ele, index) => entities.findIndex(obj => obj.name === ele.name) === index)
        return unique_entities
      });
  };

  return (
    <div className="searchbar">
      <div className="search">
        <label className="searchLabel"><b>Search Labels:</b></label>
        <div className='typeahead'>
          <Typeahead
            id="search-typeahead"
            labelKey="name"
            onChange={changeHandler}
            options={entities}
            placeholder="Search Entity..."
            selected={selected}
          />
        </div>
        <div className="timefilter">
          <TimeFilter startTime={startTime} endTime={endTime} onStartTimeChange={onStartTimeChange} onEndTimeChange={onEndTimeChange} />
        </div>
      </div>
    </div>


  )
}

export default SearchEntities;
