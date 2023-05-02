import React, { useContext, useEffect } from "react";
import { Box, Select, Option } from "@mui/joy";
import { AppContext } from "./AppContext";

export default function SelectPeriod() {
  const { period, setPeriod } = useContext(AppContext);

  useEffect(() => {
    localStorage.setItem("period", JSON.stringify(period));
    console.log("new period:", period);
  }, [period]);

  const cycleDuration = [
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  ];
  const menstruationDuration = [2, 3, 4, 5, 6, 7, 8, 9];

  function handleCycleSelect(newValue) {
    setPeriod((prevState) => {
      return { ...prevState, cycle: newValue };
    });
  }
  function handleDurationSelect(newValue) {
    setPeriod((prevState) => {
      return { ...prevState, duration: newValue };
    });
  }

  return (
    <Box sx={{ display: "flex", gap: 1.5 }}>
      <Select
        size="xs"
        variant="soft"
        placeholder="…"
        value={period.cycle}
        onChange={(e, newValue) => handleCycleSelect(newValue)}
        sx={{ pl: 1, py: 0.5 }}
      >
        {cycleDuration.map((item, index) => (
          <Option
            key={"c_" + index.toString()}
            variant="soft"
            color="neutral"
            value={item}
            sx={{ px: 1, py: 0.5 }}
          >
            {item}
          </Option>
        ))}
      </Select>
      <Select
        size="xs"
        variant="soft"
        placeholder="…"
        value={period.duration}
        onChange={(e, newValue) => handleDurationSelect(newValue)}
        sx={{ pl: 1, py: 0.5 }}
      >
        {menstruationDuration.map((item, index) => (
          <Option
            key={"d_" + index.toString()}
            variant="soft"
            color="neutral"
            value={item}
            sx={{ px: 1, py: 0.5 }}
          >
            {item}
          </Option>
        ))}
      </Select>
    </Box>
  );
}
