import React, {forwardRef, Ref, useEffect} from "react";
import {useLoader} from "@react-three/fiber";
// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader";
import {MeshType, PropsMaskModel} from "@/context/ApplicationContext";

const GlassesMesh = forwardRef((props: PropsMaskModel, ref: Ref<MeshType>) => {
    const texture = useLoader(TextureLoader, '/sunglasses.png');

    useEffect(() => {
        props.setPosition("BOTH-EYES");
    }, [ref]);

    return (
        <mesh ref={ref}>
            <planeGeometry args={[2, 1]} />
            <meshBasicMaterial map={texture} transparent />
        </mesh>
    );
});

export default GlassesMesh;