import React from "react";
import { Box } from "@mui/material";
import '../../../../styles/page.module.css';

export default function AgendarConsultas({ children }: { children: React.ReactNode }) {
    return (
      <Box>{children}</Box>
  );
}