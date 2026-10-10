import { ImageResponse } from "next/og";

export const alt = "TechXpert, Sinergi Teknologi Expert";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#0B2545",
          color: "#FFFFFF",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ width: 96, height: 8, background: "#F4B942", marginBottom: 40 }} />
        <div style={{ fontSize: 88, fontWeight: 700 }}>TechXpert</div>
        <div style={{ fontSize: 40, color: "#F4B942", marginTop: 12 }}>Sinergi Teknologi Expert</div>
        <div style={{ fontSize: 30, color: "#CBD5E1", marginTop: 40, maxWidth: 960 }}>
          Pengembangan software, website, managed service, sewa perangkat jaringan, dan pengelolaan infrastruktur IT.
        </div>
      </div>
    ),
    size,
  );
}
