import React, {forwardRef, Ref, useEffect} from 'react';
import {MeshType, PropsMaskModel} from "@/context/ApplicationContext";
import {useLoader} from "@react-three/fiber";
// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader";

export const RegularGlassesMask = forwardRef((props: PropsMaskModel, ref: Ref<MeshType>) => {
    const texture = useLoader(TextureLoader, "/brille-image-2.png");

    useEffect(() => {
        props.setPosition("BOTH-EYES");
    }, [ref]);

    return (
        <mesh ref={ref}>
            <planeGeometry args={[3, 3]} />
            <meshPhysicalMaterial map={texture} transparent />
        </mesh>
    );
});

