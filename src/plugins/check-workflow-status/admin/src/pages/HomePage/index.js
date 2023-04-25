/*
 *
 * HomePage
 *
 */

import React, { useEffect, useState } from "react";
import Workflows from "../../components/workflows";
import s from "./index.module.css";
import { Button } from "@strapi/design-system";
import { Octokit } from "@octokit/core";

// to get one: https://api.github.com/repos/Azrux/testing-workflow/actions/runs?per_page=1
// to get all: https://api.github.com/repos/Azrux/testing-workflow/actions/runs

const HomePage = () => {
  const [workflows, setWorkflows] = useState();
  const [ internalInterval, setInternalInterval ] = useState();

  const octokit = new Octokit({
    auth: "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",
  });

  // POST a new workflow
  const dispatchWorkflow = async () => {
    try {
      const owner = "Azrux";
      const repo = "testing-workflow";
      const workflow_id = "main.yml";
      const ref = "master";
      const headers = {
        "X-GitHub-Api-Version": "2022-11-28",
      };

      await octokit.request(
        "POST /repos/{owner}/{repo}/actions/workflows/{workflow_id}/dispatches",
        {
          owner,
          repo,
          workflow_id,
          ref,
          headers,
        }
      );
      setTimeout(() => {
        const intervalId = setInterval(() => {
          getLastWorkflow();
        }
        , 5000);
        setInternalInterval(intervalId);
      }, 40000);
      setWorkflows({id: "pending", status: "queued", conclusion: "pending"}); 
    } catch (error) {
      console.error(error);
    }
  };

  // GET last workflow
  const getLastWorkflow = async () => {
    try {
      const response = await octokit.request(
        "GET /repos/Azrux/testing-workflow/actions/runs?per_page=1"
      );
      const workflow = response.data.workflow_runs[0];
      setWorkflows(workflow);
      console.log(response.data)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!workflows) {
      getLastWorkflow();
    } else {
      if (internalInterval && workflows.status === "completed") {
        clearInterval(internalInterval);
      }
    }
  }, [workflows]);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Button
          onClick={dispatchWorkflow}
          className={s.button}
          loading={workflows && workflows.status !== "completed"}
        >
          Dispatch workflow
        </Button>
        <Button onClick={getLastWorkflow}>
          Get last workflow
        </Button>
      </div>
      {workflows && <Workflows workflows={workflows} />}
    </div>
  );
};

export default HomePage;
