import { Stack } from "@mui/material";

import Aside from "./Aside";
import Section from "./Section";
import Header from "./Header";

import Modal from "./Modal";

export default function DashboardLayout() {
  return (
    <>
      <Modal />
      <Stack spacing={2} sx={{ height: "100dvh", p: 2 }}>
        <Header />
        <Stack
          component="main"
          sx={{
            height: "100%",
            flexDirection: {
              xs: "column-reverse",
              sm: "column-reverse",
              md: "row",
            },
            gap: 2,
          }}
        >
          <Aside />
          <Section />
        </Stack>
      </Stack>
    </>
  );
}
