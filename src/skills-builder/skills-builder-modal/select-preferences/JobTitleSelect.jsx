import React, { useContext, useState } from 'react';
import { getConfig } from '@edx/frontend-platform';
import { Form } from '@edx/paragon';
import { useIntl } from '@edx/frontend-platform/i18n';
import { sendTrackEvent } from '@edx/frontend-platform/analytics';
import { InstantSearch } from 'react-instantsearch-hooks-web';
import { setCurrentJobTitle } from '../../data/actions';
import { SkillsBuilderContext } from '../../skills-builder-context';
import JobTitleInstantSearch from './JobTitleInstantSearch';
import messages from './messages';

const JobTitleSelect = () => {
  const { formatMessage } = useIntl();
  const { dispatch, algolia, state } = useContext(SkillsBuilderContext);
  const { searchClient } = algolia;
  const [jobInput, setJobInput] = useState(state.currentJobTitle || '');

  const handleCurrentJobTitleSelect = (value) => {
    dispatch(setCurrentJobTitle(value));
    sendTrackEvent(
      'edx.skills_builder.current_job.select',
      {
        app_name: 'skills_builder',
        category: 'skills_builder',
        learner_data: {
          current_job_title: value,
        },
      },
    );
  };

  const handleAutosuggestChange = (value) => {
    setJobInput(value);
  };

  return (
    <Form.Label>
      <h4 className="mb-3">
        {formatMessage(messages.jobTitlePrompt)}
      </h4>
      <InstantSearch searchClient={searchClient} indexName={getConfig().ALGOLIA_JOBS_INDEX_NAME}>
        <JobTitleInstantSearch
          onSelected={handleCurrentJobTitleSelect}
          onChange={handleAutosuggestChange}
          placeholder={formatMessage(messages.jobTitleInputPlaceholderText)}
          data-testid="job-title-select"
          jobInput={jobInput}
        />
      </InstantSearch>
    </Form.Label>
  );
};

export default JobTitleSelect;
