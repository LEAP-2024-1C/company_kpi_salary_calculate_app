import React from "react";

interface StatusIndicatorProps {
  status: string;
}

const StatusIndicator: React.FC<StatusIndicatorProps> = ({ status }) => {
  const getStatusColor = (status: string) => {
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
