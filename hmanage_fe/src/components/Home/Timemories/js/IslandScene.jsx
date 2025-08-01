import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Sky, PointerLockControls } from "@react-three/drei";
import * as THREE from "three";

function WallPhoto({ position, rotation, photo, onClick }) {
  const texture = useLoader(THREE.TextureLoader, photo.url);

  return (
    <mesh
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick(photo);
      }}
    >
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

function Player() {
  const playerRef = useRef();
  const { camera } = useThree();
  const speed = 0.1;
  const keys = useRef({});

  useEffect(() => {
    const handleKeyDown = (e) => (keys.current[e.key.toLowerCase()] = true);
    const handleKeyUp = (e) => (keys.current[e.key.toLowerCase()] = false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame(() => {
    const obj = playerRef.current;
    if (!obj) return;

    const direction = new THREE.Vector3();
    camera.getWorldDirection(direction);

    const forward = new THREE.Vector3(direction.x, 0, direction.z).normalize();
    const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).negate();

    if (keys.current["w"]) obj.position.addScaledVector(forward, speed);
    if (keys.current["s"]) obj.position.addScaledVector(forward, -speed);
    if (keys.current["a"]) obj.position.addScaledVector(right, speed);
    if (keys.current["d"]) obj.position.addScaledVector(right, -speed);

    camera.position.set(obj.position.x, obj.position.y + 1.5, obj.position.z);
  });

  return (
    <mesh ref={playerRef} position={[0, 0.5, 8]}>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

function Room({ width = 20, height = 5 }) {
  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, width]} />
        <meshStandardMaterial color="#555" />
      </mesh>
      <mesh position={[0, height / 2, -width / 2]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh position={[0, height / 2, width / 2]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh position={[-width / 2, height / 2, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#888" />
      </mesh>
      <mesh position={[width / 2, height / 2, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[width, height]} />
        <meshStandardMaterial color="#888" />
      </mesh>
    </>
  );
}

export default function GalleryFPS() {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const roomWidth = 20;
  const wallSpacing = 4;

  useEffect(() => {
    const data = Array.from({ length: 16 }, (_, i) => ({
      id: i + 1,
      url: `https://res.cloudinary.com/dzvxim3zn/image/upload/v1753147038/ChatGPT_Image_07_56_52_22_thg_7_2025_n2qkuv.png`,
      caption: `CEO LÊ MINH HOÀNG`,
    }));
    setPhotos(data);
  }, []);

  useEffect(() => {
    const handleClose = (e) => {
      if (e.key.toLowerCase() === "f") {
        setSelectedPhoto(null);
      }
    };
    window.addEventListener("keydown", handleClose);
    return () => window.removeEventListener("keydown", handleClose);
  }, []);

  const wallPositions = [];
  photos.forEach((photo, index) => {
    const wallIndex = Math.floor(index / 4);
    const indexInWall = index % 4;
    const offset = -((4 - 1) * wallSpacing) / 2 + indexInWall * wallSpacing;

    switch (wallIndex % 4) {
      case 0:
        wallPositions.push({ photo, position: [offset, 2.5, -roomWidth / 2 + 0.1], rotation: [0, 0, 0] });
        break;
      case 1:
        wallPositions.push({ photo, position: [roomWidth / 2 - 0.1, 2.5, offset], rotation: [0, -Math.PI / 2, 0] });
        break;
      case 2:
        wallPositions.push({ photo, position: [-offset, 2.5, roomWidth / 2 - 0.1], rotation: [0, Math.PI, 0] });
        break;
      case 3:
        wallPositions.push({ photo, position: [-roomWidth / 2 + 0.1, 2.5, -offset], rotation: [0, Math.PI / 2, 0] });
        break;
      default:
        break;
    }
  });

  return (
    <>
      <Canvas camera={{ position: [0, 2, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Sky sunPosition={[100, 20, 100]} />

        <Room width={roomWidth} />
        <Player />

        {wallPositions.map((wp) => (
          <WallPhoto key={wp.photo.id} {...wp} onClick={setSelectedPhoto} />
        ))}

        <PointerLockControls />
      </Canvas>

      {selectedPhoto && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
            animation: "fadeIn 0.5s ease-in-out",
          }}
        >
          <img
            src={selectedPhoto.url}
            alt="memory"
            style={{ maxHeight: "60%", marginBottom: "20px" }}
          />
          <p style={{ fontSize: "24px" }}>{selectedPhoto.caption}</p>
          <small>(Nhấn F để đóng)</small>
        </div>
      )}

      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
        `}
      </style>
    </>
  );
}
