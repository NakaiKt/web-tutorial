import { Typography, Box } from "@mui/material";

const Home = () => {
  return (
    <div>
      <Typography>
        これはCSS, MUI, React, ReactHookFormのチュートリアルです
        <br />
        環境は以下を参考にしてください
      </Typography>
      <Box
        component="pre"
        sx={{
          backgroundColor: "grey.100",
        }}
      >
        <code>
          Next: 15.3.1
          <br />
          React: 19.0.0
          <br />
          ReactDOM: 19.0.0
          <br />
          ReactHookForm: 7.56.1
          <br />
          MUI: 7.0.2
        </code>
      </Box>
    </div>
  );
};
export default Home;
