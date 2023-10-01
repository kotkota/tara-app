import React, { useContext } from "react";
import { Box, Switch, Typography } from "@mui/joy";
import SelectPeriod from "./SelectPeriod";
import { AppContext } from "./AppContext";

export default function SelectSex() {
  const { isFemale, setIsFemale } = useContext(AppContext);
  //   console.log("user in female:", isFemale);

  function handleSelect(newValue) {
    localStorage.setItem("isFemale", newValue);
    setIsFemale(newValue);
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography level="label" fontWeight="md" fontSize="md">
          Пол
        </Typography>
        <Switch
          checked={Boolean(isFemale)}
          onChange={(e) => handleSelect(e.target.checked)}
          size="md"
          variant="soft"
          startDecorator={"М"}
          endDecorator={"Ж"}
        />
      </Box>
      {isFemale && <SelectPeriod />}
    </>
  );
}
