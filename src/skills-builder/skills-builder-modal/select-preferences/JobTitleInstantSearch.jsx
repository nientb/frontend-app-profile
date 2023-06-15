import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Form,
} from '@edx/paragon';
import { useHits, useSearchBox } from 'react-instantsearch-hooks-web';

const JobTitleInstantSearch = ({ jobInput, ...props }) => {
  const { refine } = useSearchBox(props);
  const { hits } = useHits(props);

  // const [jobInput, setJobInput] = useState(defaultValue || '');
  const [jobList, setJobList] = useState([]);

  // const handleAutosuggestChange = (value) => {
  //   setJobInput(value);
  // };

  useEffect(() => {
    if (jobInput.length > 0) {
      refine(jobInput);
      setJobList(hits);
      return;
    }
    setJobList([]);
  }, [jobInput, hits, refine]);

  return (
    <Form.Autosuggest
      value={jobInput}
      // onChange={handleAutosuggestChange}
      name="job-title-suggest"
      autoComplete="off"
      {...props}
    >
      {jobList.map(job => (
        <Form.AutosuggestOption key={job.id} id={job.name.replaceAll(' ', '-').toLowerCase()}>
          {job.name}
        </Form.AutosuggestOption>
      ))}
    </Form.Autosuggest>
  );
};

JobTitleInstantSearch.propTypes = {
  onSelected: PropTypes.func.isRequired,
  jobInput: PropTypes.string.isRequired,
};

export default JobTitleInstantSearch;
