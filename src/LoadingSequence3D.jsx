import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, MeshReflectorMaterial, Stars, Instances, Instance, Sparkles, Html } from '@react-three/drei';
import * as THREE from 'three';

// ----------------------------------------------------
// 1. Dynamic Traffic System
// ----------------------------------------------------
function DynamicTraffic() {
    const carCount = 15; // Reduced for performance and short sequence
    const roadLength = 100;
    const speed = 25; // units per second

    // Arrays for instance data
    const headlights = useMemo(() => Array.from({ length: carCount }, () => ({
        x: -1.5 - Math.random() * 2, // Left lanes (oncoming)
        y: 0.4,
        z: (Math.random() - 0.5) * roadLength,
        speed: speed + Math.random() * 5
    })), []);

    const taillights = useMemo(() => Array.from({ length: carCount }, () => ({
        x: 1.5 + Math.random() * 2,  // Right lanes (going away)
        y: 0.4,
        z: (Math.random() - 0.5) * roadLength,
        speed: speed * 1.2 + Math.random() * 8
    })), []);

    const headRef = useRef();
    const tailRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame((state, delta) => {
        if (!headRef.current || !tailRef.current) return;

        // Animate Headlights (moving towards positive Z)
        headlights.forEach((car, i) => {
            car.z += car.speed * delta;
            if (car.z > roadLength / 2) car.z -= roadLength; // loop
            dummy.position.set(car.x, car.y, car.z);
            dummy.scale.set(0.1, 0.1, 1.2); // stretch into light streaks
            dummy.updateMatrix();
            headRef.current.setMatrixAt(i, dummy.matrix);
        });
        headRef.current.instanceMatrix.needsUpdate = true;

        // Animate Taillights (moving towards negative Z)
        taillights.forEach((car, i) => {
            car.z -= car.speed * delta;
            if (car.z < -roadLength / 2) car.z += roadLength; // loop
            dummy.position.set(car.x, car.y, car.z);
            dummy.scale.set(0.1, 0.1, 1.5); // long red streaks
            dummy.updateMatrix();
            tailRef.current.setMatrixAt(i, dummy.matrix);
        });
        tailRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group>
            <instancedMesh ref={headRef} args={[null, null, carCount]}>
                <boxGeometry />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={5} toneMapped={false} />
            </instancedMesh>
            <instancedMesh ref={tailRef} args={[null, null, carCount]}>
                <boxGeometry />
                <meshStandardMaterial color="#ff0000" emissive="#ff0000" emissiveIntensity={8} toneMapped={false} />
            </instancedMesh>
        </group>
    );
}

// ----------------------------------------------------
// 2. High-Fidelity Modular Street Buildings
// ----------------------------------------------------
function DetailedStreetAvenue() {
    const blocksPerSide = 8;
    const blockWidth = 5;
    const blockDepth = 8;
    const streetWidth = 10; // 5 units on each side of Z axis

    const { walls, windows, ledges, storefronts, hvacs } = useMemo(() => {
        const _walls = [], _windows = [], _ledges = [], _storefronts = [], _hvacs = [];

        for (let side = -1; side <= 1; side += 2) { // Left (-1) and Right (1) side of street
            for (let i = 0; i < blocksPerSide; i++) {
                // Pos Z is behind camera, Neg Z is towards skyscraper.
                // Start buildings from z=20 down to z=-60
                const z = 20 - (i * (blockDepth + 2));
                const x = side * (streetWidth / 2 + blockWidth / 2);

                const floors = 4 + Math.floor(Math.random() * 6); // 4 to 9 floors high
                const bHeight = floors * 1.2;

                // Main Wall Core (Matte dark grey concrete)
                _walls.push({ position: [x, bHeight / 2, z], scale: [blockWidth, bHeight, blockDepth] });

                // Rooftop HVAC units and parapets
                _ledges.push({ position: [x, bHeight + 0.1, z], scale: [blockWidth + 0.2, 0.2, blockDepth + 0.2] }); // Parapet
                for (let h = 0; h < 3; h++) {
                    const hx = x + (Math.random() - 0.5) * (blockWidth - 1);
                    const hz = z + (Math.random() - 0.5) * (blockDepth - 1);
                    _hvacs.push({ position: [hx, bHeight + 0.4, hz], scale: [0.6, 0.6, 0.8] });
                }

                // Glowing Storefront Lobbies (Ground Floor)
                _storefronts.push({ position: [x - side * (blockWidth / 2 - 0.1), 0.6, z], scale: [0.4, 1.2, blockDepth - 0.4] });

                // Modular Facade Details (Floors 1+)
                for (let f = 1; f < floors; f++) {
                    const floorY = f * 1.2 + 0.6;

                    // Overhanging concrete ledge/balcony separating floors
                    _ledges.push({ position: [x - side * (blockWidth / 2 + 0.2), floorY - 0.5, z], scale: [0.6, 0.1, blockDepth + 0.2] });

                    // Recessed glowing windows pointing towards the street
                    // We generate a grid of small windows per floor rather than one big strip
                    for (let w = -blockDepth / 2 + 0.8; w < blockDepth / 2 - 0.4; w += 1.2) {
                        if (Math.random() > 0.2) { // 80% chance of lights being on
                            _windows.push({ position: [x - side * (blockWidth / 2 - 0.1), floorY, z + w], scale: [0.3, 0.8, 0.6] });
                        }
                    }
                }
            }
        }
        return { walls: _walls, windows: _windows, ledges: _ledges, storefronts: _storefronts, hvacs: _hvacs };
    }, []);

    return (
        <group>
            {/* Concrete Structural Walls */}
            <Instances limit={walls.length} range={walls.length}>
                <boxGeometry />
                <meshStandardMaterial color="#0b0b0d" roughness={0.9} />
                {walls.map((d, i) => <Instance key={`wa-${i}`} position={d.position} scale={d.scale} />)}
            </Instances>

            {/* Balconies, Parapets, and HVAC units */}
            <Instances limit={ledges.length + hvacs.length} range={ledges.length + hvacs.length}>
                <boxGeometry />
                <meshStandardMaterial color="#1a1a1f" roughness={0.8} />
                {ledges.map((d, i) => <Instance key={`l-${i}`} position={d.position} scale={d.scale} />)}
                {hvacs.map((d, i) => <Instance key={`h-${i}`} position={d.position} scale={d.scale} rotation={[0, Math.random(), 0]} />)}
            </Instances>

            {/* Glowing Office/Apartment Windows */}
            <Instances limit={windows.length} range={windows.length}>
                <boxGeometry />
                <meshStandardMaterial color="#D4AF37" emissive="#D4AF37" emissiveIntensity={1.2} toneMapped={false} />
                {windows.map((d, i) => <Instance key={`wi-${i}`} position={d.position} scale={d.scale} />)}
            </Instances>

            {/* Ultra-Bright Ground Floor Storefronts */}
            <Instances limit={storefronts.length} range={storefronts.length}>
                <boxGeometry />
                <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={2} toneMapped={false} />
                {storefronts.map((d, i) => <Instance key={`s-${i}`} position={d.position} scale={d.scale} />)}
            </Instances>
        </group>
    );
}

// ----------------------------------------------------
// 3. Staggering Diagrid Skyscraper
// ----------------------------------------------------
function DiagridSkyscraper({ logoPhase }) {
    const radius = 6;
    const height = 40;
    const coreRadius = 3.5;

    // We construct the "diagrid" casing manually. We'll use instanced cylinders overlapping.
    const segments = 12; // vertical slices
    const rings = 10;    // horizontal levels

    const diagrids = useMemo(() => {
        const beams = [];
        const ringHeight = height / rings;

        for (let r = 0; r < rings; r++) {
            const y1 = r * ringHeight;
            const y2 = (r + 1) * ringHeight;

            for (let s = 0; s < segments; s++) {
                const angle1 = (s / segments) * Math.PI * 2;
                const angle2 = ((s + 1) / segments) * Math.PI * 2;

                // Spiral UP and RIGHT
                const p1 = new THREE.Vector3(Math.cos(angle1) * radius, y1, Math.sin(angle1) * radius);
                const p2 = new THREE.Vector3(Math.cos(angle2) * radius, y2, Math.sin(angle2) * radius);
                beams.push({ start: p1, end: p2 });

                // Spiral UP and LEFT
                const angle3 = ((s - 1) / segments) * Math.PI * 2;
                const p3 = new THREE.Vector3(Math.cos(angle1) * radius, y1, Math.sin(angle1) * radius);
                const p4 = new THREE.Vector3(Math.cos(angle3) * radius, y2, Math.sin(angle3) * radius);
                beams.push({ start: p3, end: p4 });
            }
        }
        return beams;
    }, []);

    const beamRef = useRef();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    useFrame(() => {
        if (!beamRef.current) return;
        diagrids.forEach((beam, i) => {
            const center = new THREE.Vector3().addVectors(beam.start, beam.end).multiplyScalar(0.5);
            dummy.position.copy(center);
            dummy.lookAt(beam.end);
            dummy.scale.set(0.15, 0.15, beam.start.distanceTo(beam.end)); // Cylinder lies along Z after lookAt
            dummy.updateMatrix();
            beamRef.current.setMatrixAt(i, dummy.matrix);
        });
        beamRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <group position={[0, 0, -60]}>
            {/* Grand Plaza Entrance */}
            <mesh position={[0, 1, 0]}>
                <boxGeometry args={[16, 2, 16]} />
                <meshStandardMaterial color="#050505" roughness={0.1} metalness={0.9} />
            </mesh>
            <mesh position={[0, 2.5, 0]}>
                <boxGeometry args={[14, 1, 14]} />
                <meshStandardMaterial color="#111" />
            </mesh>

            {/* Glowing Golden Core (Intense) */}
            <mesh position={[0, height / 2, 0]}>
                <cylinderGeometry args={[coreRadius, coreRadius, height, 32]} />
                <meshStandardMaterial color="#FFC000" emissive="#FFB000" emissiveIntensity={3} toneMapped={false} />
            </mesh>

            {/* Dark Translucent Glass Shell */}
            <mesh position={[0, height / 2, 0]}>
                <cylinderGeometry args={[radius - 0.2, radius - 0.2, height + 0.2, 32]} />
                <meshStandardMaterial color="#020202" metalness={1} roughness={0.05} transparent={true} opacity={0.6} envMapIntensity={3} />
            </mesh>

            {/* Distinct Structural Diagrid Frame */}
            <instancedMesh ref={beamRef} args={[null, null, diagrids.length]}>
                <boxGeometry /> {/* Using boxes instead of cylinders for sharp architectural edges */}
                <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.9} />
            </instancedMesh>

            {/* Horizontal Ring Ties (Floor lines cutting through the diagrid) */}
            {Array.from({ length: rings + 1 }).map((_, i) => (
                <mesh key={`ring-${i}`} position={[0, i * (height / rings), 0]}>
                    <torusGeometry args={[radius, 0.2, 8, 32]} />
                    <meshStandardMaterial color="#111" metalness={1} roughness={0.2} />
                </mesh>
            ))}

            {/* Intricate Spire with Aviation Light */}
            <group position={[0, height + 0.5, 0]}>
                <mesh position={[0, 1, 0]}><cylinderGeometry args={[coreRadius * 0.8, radius, 2, 16]} /><meshStandardMaterial color="#000" /></mesh>
                <mesh position={[0, 4, 0]}><cylinderGeometry args={[0.2, 1.5, 4, 8]} /><meshStandardMaterial color="#D4AF37" metalness={1} /></mesh>
                <mesh position={[0, 9, 0]}><cylinderGeometry args={[0.02, 0.1, 6, 8]} /><meshStandardMaterial color="#FFF" /></mesh>
                <mesh position={[0, 12, 0]}><sphereGeometry args={[0.15]} /><meshStandardMaterial color="#F00" emissive="#F00" emissiveIntensity={5} toneMapped={false} /></mesh>
            </group>

            {/* 3D Company Logo embedded on Skyscraper Front */}
            <group position={[0, 15, 6.1]}>
                <Html transform center distanceFactor={22}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', pointerEvents: 'none', filter: 'drop-shadow(0 0 20px rgba(212,175,55,0.3))', opacity: logoPhase ? 0 : 1, transition: 'opacity 0.1s ease-out' }}>
                        <div style={{ width: 140, height: 140, border: '4px solid #D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, background: '#0A0A0A', boxShadow: '0 0 60px rgba(212, 175, 55, 0.4)' }}>
                            <h1 style={{ margin: 0, fontSize: '3.5rem', fontFamily: 'Inter, sans-serif', color: '#D4AF37' }}>RC</h1>
                        </div>
                        <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, letterSpacing: '0.15em', fontSize: '3.5rem', margin: 0, textTransform: 'uppercase', textShadow: '0 4px 30px rgba(0,0,0,0.9)', color: '#D4AF37' }}>Radiant</h1>
                        <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, letterSpacing: '0.4em', fontSize: '1.8rem', color: '#FFF' }}>Construction</h2>
                    </div>
                </Html>
            </group>
        </group>
    );
}

// ----------------------------------------------------
// 4. Intimate Camera Controller (10 Seconds)
// ----------------------------------------------------
function SceneController({ onComplete, setLogoPhase, logoPhase }) {
    const { camera } = useThree();
    const duration = 3.0; // 3-second rapid immersive sequence

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (t <= duration) {
            const progress = t / duration;

            // Phase 1: Sprinting down the avenue (0 - 2s)
            if (progress < 0.65) {
                const p = progress / 0.65; // 0 to 1
                // Drive down the center of the wet street rapidly
                camera.position.x = 0;
                camera.position.z = THREE.MathUtils.lerp(20, -20, p * p);

                // Camera height simulates human/car height, lifting slightly
                camera.position.y = THREE.MathUtils.lerp(1.5, 4.0, p);

                // Gaze tilts up quickly towards the tower top
                const targetY = THREE.MathUtils.lerp(10, 40, p);
                camera.lookAt(0, targetY, -60);
            }
            // Phase 2: Aggressive Dive directly into the Skyscraper Logo
            else {
                const diveP = (progress - 0.65) / 0.35;
                const ease = diveP * diveP * diveP; // Cubic ease-in

                const startZ = -20;
                const startY = 4.0;

                const logoGlobalY = 15;
                const logoGlobalZ = -53.9;

                // Dive straight towards the logo, stopping precisely in front to fill the screen seamlessly
                camera.position.x = 0;
                camera.position.z = THREE.MathUtils.lerp(startZ, logoGlobalZ + 3.0, ease);
                camera.position.y = THREE.MathUtils.lerp(startY, logoGlobalY, ease);

                const currentTargetY = THREE.MathUtils.lerp(40, logoGlobalY, ease);
                camera.lookAt(0, currentTargetY, logoGlobalZ);
            }
        }

        // Trigger seamless gapless glow transition right before hitting the log
        if (t > duration - 0.2) setLogoPhase(true);
        if (t > duration + 0.8) onComplete();
    });

    return (
        <group>
            <DiagridSkyscraper logoPhase={logoPhase} />
            <DetailedStreetAvenue />
            <DynamicTraffic />

            {/* Wet Asphalt / Reflective Ground completely surrounding everything */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]}>
                <planeGeometry args={[400, 400]} />
                <MeshReflectorMaterial
                    blur={[300, 100]}
                    resolution={256} // Optimized resolution to prevent Context Loss
                    mixBlur={1.5}
                    mixStrength={60}
                    roughness={0.15}
                    depthScale={1.2}
                    minDepthThreshold={0.4}
                    maxDepthThreshold={1.4}
                    color="#040404"
                    metalness={0.9}
                />
            </mesh>

            {/* Atmospheric Dust floating in the neon light */}
            <Sparkles count={500} scale={100} size={2} color="#D4AF37" opacity={0.6} speed={1.2} position={[0, 10, -20]} />
        </group>
    );
}

// ----------------------------------------------------
// Main Canvas App
// ----------------------------------------------------
export default function LoadingSequence3D({ onComplete }) {
    const [logoPhase, setLogoPhase] = useState(false);

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999, background: '#000' }}>
            <Canvas camera={{ position: [0, 1.5, 30], fov: 60 }} style={{ width: '100%', height: '100%' }}>
                {/* Heavy volumetric fog to hide procedural boundaries and sell scale */}
                <fog attach="fog" args={['#020202', 15, 120]} />

                {/* Ambient darkness */}
                <ambientLight intensity={0.05} />

                {/* Massive SpotLight washing down over the skyscraper */}
                <spotLight position={[0, 80, -40]} angle={0.5} penumbra={1} intensity={15} color="#FFF" />

                {/* Street level ambient glow (simulating bounce light from traffic/storefronts) */}
                <pointLight position={[0, 5, 0]} intensity={4} color="#D4AF37" distance={60} />
                <pointLight position={[0, 5, -30]} intensity={4} color="#FFF" distance={60} />

                <Stars radius={150} depth={50} count={6000} factor={4} saturation={0} fade speed={1} />
                {/* City night environment map for crucial metallic glass reflections */}
                <Environment preset="city" />

                <SceneController onComplete={onComplete} setLogoPhase={setLogoPhase} logoPhase={logoPhase} />
            </Canvas>

            {/* UI Overlay: Seamless Glow Transition (Pre-rendered for zero lag) */}
            <div
                style={{
                    position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexDirection: 'column', color: '#D4AF37', textAlign: 'center', pointerEvents: 'none',
                    background: 'transparent',
                    opacity: logoPhase ? 1 : 0,
                    transition: 'opacity 0.05s linear',
                    animation: logoPhase ? 'gaplessFade 1.0s cubic-bezier(0.2, 0, 0, 1) forwards' : 'none',
                    willChange: 'opacity, background, box-shadow'
                }}
            >
                <style>
                    {`
                        @keyframes gaplessFade {
                            0% { background: rgba(5,5,5,0); }
                            20% { background: rgba(5,5,5,0.95); }
                            100% { background: rgba(5,5,5,1); }
                        }
                        @keyframes intenseGlow {
                            0% { box-shadow: 0 0 60px rgba(212, 175, 55, 0.4); background: #0A0A0A; transform: scale(1.0); }
                            30% { box-shadow: 0 0 200px rgba(212, 175, 55, 0.8), inset 0 0 50px rgba(212,175,55,1); background: rgba(212,175,55,0.8); transform: scale(1.03); color: #000; }
                            100% { box-shadow: 0 0 60px rgba(212, 175, 55, 0.4); background: #0A0A0A; transform: scale(1.0); color: #D4AF37; }
                        }
                    `}
                </style>

                <div style={{ width: 140, height: 140, border: '4px solid #D4AF37', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24, animation: logoPhase ? 'intenseGlow 1.0s ease-out forwards' : 'none' }}>
                    <h1 style={{ margin: 0, fontSize: '3.5rem', fontFamily: 'Inter, sans-serif', color: 'inherit' }}>RC</h1>
                </div>
                <h1 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 800, letterSpacing: '0.15em', fontSize: '3.5rem', margin: 0, textTransform: 'uppercase', color: '#D4AF37', animation: logoPhase ? 'gaplessFade 1.0s ease-out forwards' : 'none', textShadow: '0 4px 30px rgba(0,0,0,0.9)' }}>Radiant</h1>
                <h2 style={{ fontFamily: 'Inter, sans-serif', fontWeight: 300, letterSpacing: '0.4em', fontSize: '1.8rem', color: '#FFF', animation: logoPhase ? 'gaplessFade 1.0s ease-out forwards' : 'none' }}>Construction</h2>
            </div>
        </div>
    );
}
