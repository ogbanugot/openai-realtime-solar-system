import React, { useEffect, useState } from "react";

interface ToolCall {
  name: string;
  arguments: any;
}

interface SceneProps {
  toolCall: ToolCall;
}

const Scene: React.FC<SceneProps> = ({ toolCall }) => {
  const [displayText, setDisplayText] = useState<string | null>(null);

  useEffect(() => {
    if (!toolCall) return;

    const { name, arguments: toolArgs } = toolCall;

    let args: any = {};
    try {
      args = typeof toolArgs === "string" ? JSON.parse(toolArgs) : toolArgs;
    } catch (error) {
      console.error("Failed to parse toolCall arguments:", error);
      return;
    }

    // Generate text to display based on toolCall
    let text = "";
    switch (name) {
      case "focus_planet":
        text = `Focusing on planet: ${args.planet}`;
        break;

      case "display_data":
        text = `Displaying data: ${args.title || "Untitled"} - ${args.text || ""}`;
        break;

      case "show_moons":
        text = `Showing moons: ${(args.moons || []).join(", ")}`;
        break;

      case "get_iss_position":
        text = `Fetching ISS position...`;
        break;

      case "reset_camera":
        text = `Resetting camera to default view`;
        break;

      case "show_orbit":
        text = `Switching to orbit view`;
        break;

      default:
        text = `Unknown tool call: ${name}`;
        break;
    }

    setDisplayText(text);
  }, [toolCall]);

  return (
    <div className="w-full h-full flex items-center justify-center bg-black text-white p-4">
      {displayText && <div className="text-xl text-center">{displayText}</div>}
    </div>
  );
};

export default Scene;
