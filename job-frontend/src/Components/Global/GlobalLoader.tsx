import { LoadingOverlay } from "@mantine/core";
import { useEffect, useState } from "react";

const GlobalLoader = ({ delay = 500 }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return (
    <LoadingOverlay
      visible={loading}
      zIndex={1000}
      overlayProps={{
        style: { backdropFilter: "blur(4px)", backgroundColor: "rgba(0, 0, 0, 0.4)" },
      }}
      loaderProps={{
        color: "yellow",
        size: "lg",
        type: "bars", // spinner, dots, oval, bars
      }}
    />
  );
};

export default GlobalLoader;
