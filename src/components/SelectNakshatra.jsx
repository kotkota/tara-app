import React, { useContext } from "react";
import { Box, Option, Select, Typography } from "@mui/joy";
// import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { nakshatras } from "../data/nakshatra";
import { AppContext } from "./AppContext";

export default function SelectNakshatra() {
  const { nakshatra, setNakshatra } = useContext(AppContext);
  // console.log("nakshatra in Settings:", nakshatra);

  function handleSelect(newValue) {
    localStorage.setItem("nakshatra", newValue);
    setNakshatra(newValue);
    // console.log("new userNakshatra:", localStorage.getItem("nakshatra"));
  }

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography level="label" fontWeight="md" fontSize="md">
        Накшатра Луны
      </Typography>
      <Select
        size="xs"
        variant="soft"
        placeholder="Выбрать…"
        value={nakshatra}
        onChange={(e, newValue) => handleSelect(newValue)}
        sx={{ minWidth: 150, pl: 1, py: 0.5 }}
      >
        {nakshatras.map((item) => (
          <Option
            key={item.id}
            variant="soft"
            color="neutral"
            value={item.id}
            sx={{ px: 1, py: 0.5 }}
          >
            {item.name}
          </Option>
        ))}
      </Select>
    </Box>
  );
}
