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
  const [counter, setCounter] = useState(0);
  const [status, setStatus] = useState("completed");

  const octokit = new Octokit({
    auth: "",
  });

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
      setWorkflows(null);
      setStatus(null);
    } catch (error) {
      console.error(error);
    }
  };

  const getLastWorkflow = async () => {
    try {
      const headers= {
        "X-GitHub-Api-Version": "2022-11-28",
      }
      const response = await octokit.request(
        "GET /repos/Azrux/testing-workflow/actions/runs?per_page=1", { headers }
      );
      const workflow = response.data.workflow_runs[0];
      setWorkflows(workflow);
      setStatus(workflow.status)
      setCounter(counter + 1)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (!workflows) {
      getLastWorkflow();
    } else {
      let intervalId = setInterval(() => {
        if (status !== "completed") {
          getLastWorkflow();
        }
      }, 5000);
      return () => clearInterval(intervalId);
    }
  }, [workflows, counter, status]);

  return (
    <div className={s.container}>
      <div className={s.header}>
        <Button
          onClick={dispatchWorkflow}
          className={s.button}
          disabled={workflows && workflows.status !== "completed"}
        >
          Dispatch workflow
        </Button>
      </div>
      {workflows && <Workflows workflows={workflows} />}
    </div>
  );
};

export default HomePage;
