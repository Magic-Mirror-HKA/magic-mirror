import React, {forwardRef, Ref, useEffect} from 'react';
import {useLoader} from "@react-three/fiber";
// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader";
import {MeshType, PropsMaskModel} from "@/context/ApplicationContext";

export const GraduationHatMask = forwardRef((props: PropsMaskModel, ref: Ref<MeshType>) => {
    const texture = useLoader(TextureLoader, "/graduation-hat2.png");

    useEffect(() => {
        props.setPosition("HEAD");
    }, [ref]);

    return (
        <mesh ref={ref}>
            <planeGeometry args={[7, 3.5]} />
            <meshPhysicalMaterial map={texture} transparent />
        </mesh>
    );
});

