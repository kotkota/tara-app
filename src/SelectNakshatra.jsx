import React, { useState, useEffect } from "react";
import { Select, Option } from "@mui/joy";
import { nakshatras } from "./nakshatra";

export default function SelectBasic() {
  let storedNakshatra = localStorage.getItem("nakshatra");
  const [value, setValue] = useState(storedNakshatra || null);

  function handleSelect(newValue) {
    localStorage.setItem("nakshatra", newValue);
    console.log(localStorage.getItem("nakshatra"));
    setValue(newValue);
  }

  return (
    <Select
      size="sm"
      variant="soft"
      placeholder="Выбрать…"
      value={value}
      onChange={(e, newValue) => handleSelect(newValue)}
      sx={{ minWidth: 150, backgroundColor: "white" }}
    >
      {nakshatras.map((item) => (
        <Option
          color="neutral"
          value={item.id}
          sx={{ backgroundColor: "white" }}
        >
          {item.name}
        </Option>
      ))}
    </Select>
  );
}
