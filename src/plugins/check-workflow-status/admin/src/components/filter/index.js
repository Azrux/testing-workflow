import React, { useEffect, useState } from "react";
import { Option, Select } from "@strapi/design-system";
import s from "./index.module.css";

const Filter = ({ workflows, setFilteredWorkflows }) => {
  const [filterByStatus, setFilterByStatus] = useState('');
  const [filterByConclusion, setFilterByConclusion] = useState('');

  useEffect(() => {
    if (filterByStatus) {
      setFilteredWorkflows(workflows.filter((workflow) => (
        workflow.status === filterByStatus
      )));
    } else if (filterByConclusion) {
      setFilteredWorkflows(workflows.filter((workflow) => (
        workflow.conclusion === filterByConclusion
      )));
    }
  }, [filterByStatus, filterByConclusion]);

  return (
    <div className={s.filter}>
      <label>Filter by:</label>
      <Select
        value={filterByStatus}
        placeholder={'Status'}
        onChange={setFilterByStatus}
      >
        <Option value="completed">Completed</Option>
        <Option value="in-progress">In progress</Option>
        <Option value="queued">Queued</Option>
      </Select>
      <Select
        value={filterByConclusion}
        placeholder={'Conclusion'}
        onChange={setFilterByConclusion}
      >
        <Option value="success">Success</Option>
        <Option value="failure">Failure</Option>
      </Select>
    </div>
  );
}

export default Filter;