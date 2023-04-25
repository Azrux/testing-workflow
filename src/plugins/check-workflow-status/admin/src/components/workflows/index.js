import React from "react";
import { Box, Stack } from "@strapi/design-system";

const Workflows = ({ workflows }) => {
  return (
    <>
      <Stack spacing={4} background="secondary200" padding={3}>
        {workflows && (
            <Box color="neutral800" background="primary100" padding={4}>
              <p>Id: {workflows.id}</p>
              <br />
              <p>{workflows.display_title}</p>
              <p>Status: {workflows.status}</p>
              <p>Conclusion: {workflows.conclusion}</p>
            </Box>
          )}
      </Stack>
    </>
  );
};

export default Workflows;