import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DatePicker, Space } from "antd";
dayjs.extend(customParseFormat);

export default function SetBirthTime() {
  return (
    <Space direction="horizontal" size={12}>
      <DatePicker
        format="YYYY-MM-DD HH:mm:ss"
        showTime={{
          defaultValue: dayjs("00:00:00", "HH:mm:ss"),
        }}
      />
    </Space>
  );
}
