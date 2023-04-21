/*
 *
 * HomePage
 *
 */

import React from "react";
// import PropTypes from 'prop-types';
// import pluginId from '../../pluginId';
import axios from "axios";
import { Box, Button, Stack } from "@strapi/design-system";
import s from "./index.module.css";

const HomePage = () => {

  const config = {
    headers: {
      Authorization: `token ${process.env.REACT_APP_TOKEN}`,
      'X-GitHub-Api-Version': '2022-11-28'
    }
  };

  const handleOnClick = () => {
    axios.get(`https://api.github.com/repos/Azrux/testing-workflow/actions/runs?per_page=1`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  return (
    <div className={s.container}>
      <Button 
        className={s.button}
        onClick={handleOnClick}
      >
        Refresh workflows status
      </Button>
      <Stack spacing={4} background="secondary200" padding={3}>
        <Box color="neutral800" background="primary100" padding={4}>
          First
        </Box>
      </Stack>
    </div>
  );
};

export default HomePage;
