/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
import axios from "axios";
import Workflows from "../../components/workflows";
import Pagination from "../../components/pagination";
import s from "./index.module.css";
import { Button } from "@strapi/design-system";
import Filter from "../../components/filter";

// to get one: https://api.github.com/repos/Azrux/testing-workflow/actions/runs?per_page=1
// to get all: https://api.github.com/repos/Azrux/testing-workflow/actions/runs
// const headers = {
//   Authorization: `token ${process.env.REACT_APP_TOKEN}`,
//   "X-GitHub-Api-Version": "2022-11-28",
// };

const HomePage = () => {
  const [workflows, setWorkflows] = useState();
  const [slicedWorkflows, setSlicedWorkflows] = useState();
  const [filteredWorkflows, setFilteredWorkflows] = useState();
  const [filterSliced, setFilterSliced] = useState();

  useEffect(() => {
    if (filteredWorkflows) {
      setFilterSliced([...filteredWorkflows].slice(0, 5));
    } else if (workflows?.length) {
      setSlicedWorkflows([...workflows].slice(0, 5));
    }
  }, [workflows, filteredWorkflows]);

  const getWorkflows = () => {
    axios
      .get(`https://api.github.com/repos/Azrux/testing-workflow/actions/runs`)
      .then((response) => {
        setWorkflows(response?.data?.workflow_runs);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Button
          className={s.button}
          onClick={() => {
            setWorkflows(getWorkflows());
            setFilteredWorkflows(null);
          }}
        >
          Refresh workflows status
        </Button>
        {workflows && (
          <Filter
            workflows={workflows}
            setFilteredWorkflows={setFilteredWorkflows}
            className={s.filter}
          />
        )}
      </div>
      {workflows && (
        <>
          <Workflows
            workflows={filterSliced ? filterSliced : slicedWorkflows}
          />
          <Pagination
            workflows={workflows}
            setSlicedWorkflows={setSlicedWorkflows}
            filteredWorkflows={filteredWorkflows}
            setFilterSliced={setFilterSliced}
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
