import React from "react";
import { Box, Stack } from "@strapi/design-system";

const Workflows = ({ workflows }) => {
  return (
    <>
      <Stack spacing={4} background="secondary200" padding={3}>
        {workflows?.map((workflow) => {
          return (
            <Box color="neutral800" background="primary100" padding={4}>
              <h3>{workflow.display_title}</h3>
              <p>Status: {workflow.status}</p>
              <p>Conclusion: {workflow.conclusion}</p>
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

export default Workflows;