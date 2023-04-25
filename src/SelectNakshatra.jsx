import React, { useState } from "react";
import { Select, Option } from "@mui/joy";
import { nakshatras } from "./nakshatra";

export default function SelectNakshatra() {
  let storedNakshatra = localStorage.getItem("nakshatra");
  const [value, setValue] = useState(storedNakshatra || null);

  function handleSelect(newValue) {
    if (newValue) localStorage.setItem("nakshatra", newValue);
    console.log("stored userNakshatra", localStorage.getItem("nakshatra"));
    setValue(newValue);
    window.location.reload();
  }

  return (
    <Select
      size="sm"
      variant="soft"
      placeholder="Выбрать…"
      value={value}
      onChange={(e, newValue) => handleSelect(newValue)}
      sx={{ minWidth: 150 }}
    >
      {nakshatras.map((item) => (
        <Option key={item.id} variant="soft" color="neutral" value={item.id}>
          {item.name}
        </Option>
      ))}
    </Select>
  );
}
