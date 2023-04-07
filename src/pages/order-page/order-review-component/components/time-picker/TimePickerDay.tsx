import { useState } from "react";

export const TimePickerDay = () => {
  const [startsAt, setStartsAt] = useState("");
  return (
    <div>
      <input
        value={startsAt}
        type="datetime-local"
        min={new Date().toJSON().slice(0, 10)}
      />
    </div>
  );
};
