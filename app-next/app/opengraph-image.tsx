import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Jhon Fragozo | Brand Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          padding: "80px 100px",
          background: "#020617",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid texture */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Glow azul */}
        <div
          style={{
            position: "absolute",
            top: "-150px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "700px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(37, 99, 235, 0.18)",
            filter: "blur(100px)",
          }}
        />

        {/* Glow lima derecha */}
        <div
          style={{
            position: "absolute",
            right: "-80px",
            top: "60px",
            width: "400px",
            height: "350px",
            borderRadius: "50%",
            background: "rgba(208, 247, 89, 0.07)",
            filter: "blur(90px)",
          }}
        />

        {/* Contenido */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0px", position: "relative", zIndex: 1 }}>
          {/* Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "6px 16px",
              borderRadius: "999px",
              border: "1px solid rgba(255,255,255,0.1)",
              background: "rgba(255,255,255,0.04)",
              marginBottom: "32px",
              width: "fit-content",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: "#60a5fa",
              }}
            />
            <span style={{ color: "rgba(255,255,255,0.55)", fontSize: "15px", fontWeight: 500, letterSpacing: "0.05em" }}>
              Estrategia · Diseño · Tecnología
            </span>
          </div>

          {/* Nombre */}
          <div style={{ fontSize: "72px", fontWeight: 700, color: "#ffffff", lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "8px" }}>
            Jhon Fragozo
          </div>

          {/* Título */}
          <div style={{ fontSize: "36px", fontWeight: 500, color: "rgba(255,255,255,0.6)", lineHeight: 1.2, marginBottom: "40px" }}>
            Brand Designer
          </div>

          {/* Tagline */}
          <div style={{ fontSize: "22px", color: "rgba(255,255,255,0.38)", maxWidth: "680px", lineHeight: 1.5 }}>
            Marcas y experiencias digitales que convierten visitantes en clientes.
          </div>
        </div>

        {/* Chips inferiores */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            position: "absolute",
            bottom: "70px",
            left: "100px",
          }}
        >
          {["120+ proyectos", "14 sectores", "Colombia"].map((label) => (
            <div
              key={label}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                padding: "6px 14px",
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.08)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#60a5fa" }} />
              <span style={{ color: "rgba(255,255,255,0.5)", fontSize: "14px", fontWeight: 500 }}>{label}</span>
            </div>
          ))}
        </div>

        {/* URL */}
        <div
          style={{
            position: "absolute",
            bottom: "72px",
            right: "100px",
            color: "rgba(255,255,255,0.2)",
            fontSize: "14px",
          }}
        >
          jhonfragozo.com
        </div>
      </div>
    ),
    { ...size },
  );
}
