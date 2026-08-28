import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#000000",
          color: "#f5f5f7",
          fontSize: 30,
          fontWeight: 700,
          letterSpacing: -1.4,
          borderRadius: 14,
          fontFamily: "sans-serif",
        }}
      >
        LS
      </div>
    ),
    size,
  );
}
