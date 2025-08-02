import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Sky, PointerLockControls } from "@react-three/drei";
import * as THREE from "three";

/* ---------- Component treo tranh ---------- */
function WallPhoto({ position, rotation, photo }) {
  const texture = useLoader(THREE.TextureLoader, photo.url);
  return (
    <mesh position={position} rotation={rotation}>
      <planeGeometry args={[3, 2]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  );
}

/* ---------- Player điều khiển bằng W A S D ---------- */
function Player({ onPositionUpdate, resetSignal, roomWidth }) {
  const playerRef = useRef();
  const { camera } = useThree();
  const speed = 0.1;
  const keys = useRef({});

  const boundary = roomWidth / 2 - 0.5;

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.position.set(0, 0.5, 8);
      camera.position.set(0, 2, 8);
    }
  }, [resetSignal, camera]);

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

    // Giới hạn trong phòng
    obj.position.x = Math.max(-boundary, Math.min(boundary, obj.position.x));
    obj.position.z = Math.max(-boundary, Math.min(boundary, obj.position.z));

    camera.position.set(obj.position.x, obj.position.y + 1.5, obj.position.z);
    onPositionUpdate(obj.position.clone());
  });

  return (
    <mesh ref={playerRef} position={[0, 0.5, 8]}>
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

/* ---------- Phòng ---------- */
function Room({ width = 20, height = 5 }) {
  return (
    <>
      {/* Sàn */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[width, width]} />
        <meshStandardMaterial color="#555" />
      </mesh>

      {/* 4 tường */}
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

      {/* Mái nhà */}
      <mesh position={[0, height, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[width, width]} />
        <meshStandardMaterial color="#444" />
      </mesh>
    </>
  );
}

function PaintingPlayer({ onExit }) {
  const speed = 1;
  const keys = useRef({});
  const { camera } = useThree();
  const playerRef = useRef();

  useEffect(() => {
    const handleExit = (e) => {
      if (e.key.toLowerCase() === "e") onExit();
    };
    const handleKeyDown = (e) => (keys.current[e.key.toLowerCase()] = true);
    const handleKeyUp = (e) => (keys.current[e.key.toLowerCase()] = false);

    window.addEventListener("keydown", handleExit);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleExit);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [onExit]);

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

    // Camera follow player
    camera.position.copy(obj.position);
  });

  return <mesh ref={playerRef} position={[0, 0, 0]} visible={false} />;
}

function PaintingWorld({ photo, onExit }) {
  const texture = useLoader(THREE.TextureLoader, photo.url);

  return (
    <Canvas camera={{ position: [0, 0, 0], fov: 75 }}>
      <ambientLight intensity={0.8} />
      <PointerLockControls />

      <PaintingPlayer onExit={onExit} />

      {/* Sphere 360° */}
      <mesh scale={[-1, 1, 1]}>
        <sphereGeometry args={[500, 64, 64]} />
        <meshBasicMaterial map={texture} side={THREE.BackSide} />
      </mesh>
    </Canvas>
  );
}



/* ---------- Gallery chính ---------- */
export default function MultiRoomGallery() {
  const [rooms, setRooms] = useState([]);
  const [playerPos, setPlayerPos] = useState(new THREE.Vector3());
  const [showPhotoHint, setShowPhotoHint] = useState(false);
  const [insidePainting, setInsidePainting] = useState(false);
  const [currentPainting, setCurrentPainting] = useState(null);

  const nearPhotoRef = useRef(null);
  const roomWidth = 20;
  const wallSpacing = 4;

  const sampleImages = ["https://threejs.org/examples/textures/2294472375_24a3b8ef46_o.jpg", "/images/image02.jpg", "images/image03.jpg"];

  useEffect(() => {
    setRooms([{ photos: sampleImages.map((url, i) => ({ id: i + 1, url })) }]);
  }, []);

  useEffect(() => {
    if (!rooms.length) return;
    const photos = rooms[0].photos;
    let nearest = null;

    photos.forEach((photo, i) => {
      const wallIndex = Math.floor(i / 2);
      const indexInWall = i % 2;
      const offset = -((2 - 1) * wallSpacing) / 2 + indexInWall * wallSpacing;

      let pos;
      switch (wallIndex % 4) {
        case 0: pos = new THREE.Vector3(offset, 2.5, -roomWidth / 2 + 0.1); break;
        case 1: pos = new THREE.Vector3(roomWidth / 2 - 0.1, 2.5, offset); break;
        case 2: pos = new THREE.Vector3(-offset, 2.5, roomWidth / 2 - 0.1); break;
        case 3: pos = new THREE.Vector3(-roomWidth / 2 + 0.1, 2.5, -offset); break;
        default: return;
      }

      const dist = new THREE.Vector2(playerPos.x, playerPos.z).distanceTo(new THREE.Vector2(pos.x, pos.z));
      if (dist < 2) nearest = photo;
    });

    nearPhotoRef.current = nearest;
    setShowPhotoHint(!!nearest);
  }, [playerPos, rooms]);

  useEffect(() => {
    const handleEnterPainting = (e) => {
      if (e.key.toLowerCase() === "g" && nearPhotoRef.current) {
        setCurrentPainting(nearPhotoRef.current);
        setInsidePainting(true);
      }
    };
    window.addEventListener("keydown", handleEnterPainting);
    return () => window.removeEventListener("keydown", handleEnterPainting);
  }, []);

  if (insidePainting && currentPainting) {
    return <PaintingWorld photo={currentPainting} onExit={() => setInsidePainting(false)} />;
  }

  if (!rooms.length) return null;
  const photos = rooms[0].photos;

  // Tính vị trí treo tranh
  const wallPositions = photos.map((photo, index) => {
    const wallIndex = Math.floor(index / 2);
    const indexInWall = index % 2;
    const offset = -((2 - 1) * wallSpacing) / 2 + indexInWall * wallSpacing;

    switch (wallIndex % 4) {
      case 0: return { photo, position: [offset, 2.5, -roomWidth / 2 + 0.1], rotation: [0, 0, 0] };
      case 1: return { photo, position: [roomWidth / 2 - 0.1, 2.5, offset], rotation: [0, -Math.PI / 2, 0] };
      case 2: return { photo, position: [-offset, 2.5, roomWidth / 2 - 0.1], rotation: [0, Math.PI, 0] };
      case 3: return { photo, position: [-roomWidth / 2 + 0.1, 2.5, -offset], rotation: [0, Math.PI / 2, 0] };
      default: return null;
    }
  });

  return (
    <>
      <Canvas camera={{ position: [0, 2, 15], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Sky sunPosition={[100, 20, 100]} />

        <Room width={roomWidth} />
        <Player onPositionUpdate={setPlayerPos} resetSignal={0} roomWidth={roomWidth} />

        {wallPositions.map((wp) => (
          <WallPhoto key={wp.photo.id} {...wp} />
        ))}

        <PointerLockControls />
      </Canvas>

      {showPhotoHint && (
        <div
          style={{
            position: "fixed",
            bottom: "40%",
            left: "50%",
            transform: "translateX(-50%)",
            color: "yellow",
            fontSize: "28px",
            background: "rgba(0,0,0,0.5)",
            padding: "10px 20px",
            borderRadius: "10px",
            zIndex: 1000,
          }}
        >
          Nhấn G để đi vào bức tranh
        </div>
      )}
    </>
  );
}
