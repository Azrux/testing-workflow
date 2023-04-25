import React from "react";
import { Box, Stack } from "@strapi/design-system";
import s from './index.module.css'

const Workflows = ({ workflows }) => {
  return (
    <>
      <Stack spacing={4} background="secondary200" padding={3}>
        {workflows && (
            <Box color="neutral800" background="primary100" padding={4}>
              <p className={s.title}>ID:</p>
              <p className={ workflows.id === 'pending' ? s.pending : s.id}>{workflows.id}</p>
              <br />
              <div className={s.container}>
                <p className={s.title}>Title:</p>
                <p className={workflows.display_title ? s.workflowTitle : s.pending}> {workflows.display_title || "pending"}</p>
              </div>
              <div className={s.container}>
                <p className={s.title}>Status:</p>
                <p className={workflows.status === 'queued' ? s.queued : workflows.status === 'in_progress' ? s.pending : s.completed}>{workflows.status}</p>
              </div>
              <div className={s.container}>
                <p className={s.title}>Conclusion:</p>
                <p className={workflows.conclusion === 'success' ? s.completed : workflows.conclusion === 'failure' || workflows.conclusion === 'cancelled' ? s.failure : s.pending}>{workflows.conclusion || "in_progress"}</p>
              </div>
            </Box>
          )}
      </Stack>
    </>
  );
};

export default Workflows;