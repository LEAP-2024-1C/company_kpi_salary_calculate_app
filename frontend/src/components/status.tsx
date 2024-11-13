import React from "react";

type Status = "review" | "in progress" | "done";

interface StatusIndicatorProps {
  status: Status;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "review":
        return "blue";
      case "in progress":
        return "orange";
      case "done":
        return "green";
      default:
        return "gray";
    }
  };

  const color = getStatusColor(status);

  return (
    <div
      className="border-2 p-1 text-center rounded-full"
      style={{ borderColor: color }}
    >
      {status}
    </div>
  );
};

export default StatusIndicator;
