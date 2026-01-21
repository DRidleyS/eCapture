// components/MatterportEmbed.js
interface MatterportEmbedProps {
  modelId: string;
}

export default function MatterportEmbed({ modelId }: MatterportEmbedProps) {
  return (
    <div style={{ position: "relative", paddingTop: "56.25%" }}>
      <iframe
        src={`https://my.matterport.com/show/?m=${modelId}`}
        frameBorder="0"
        allow="fullscreen; vr"
        allowFullScreen
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      ></iframe>
    </div>
  );
}
