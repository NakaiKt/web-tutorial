import { Typography } from "@mui/material";
import { NormalButton } from "@/components/Mui/Button";
import { useRouter } from "next/router";

const Pages = () => {
  const router = useRouter();
  return (
    <div>
      <Typography variant="h1">tutorial</Typography>
      <Typography>
        これはCSS, MUI, React, ReactHookFormのチュートリアルです
      </Typography>
      <NormalButton onClick={() => router.push("/mui/button")} />
    </div>
  );
};
export default Pages;
