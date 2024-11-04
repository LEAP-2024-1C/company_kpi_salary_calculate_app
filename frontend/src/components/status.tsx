import React from "react";

type Status = "pending" | "in progress" | "complete";

interface StatusIndicatorProps {
  status: Status;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getStatusColor = (status: Status) => {
    switch (status) {
      case "pending":
        return "red";

      case "in progress":
        return "orange";

      case "complete":
        return "green";

      default:
        return "gray";
    }
  };

  const color = getStatusColor(status);

  return <div style={{ color }}>Төлөв: {status}</div>;
};

export default StatusIndicator;
