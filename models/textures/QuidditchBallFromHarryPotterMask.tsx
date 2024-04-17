import React, {forwardRef, Ref, useEffect} from 'react';
import {MeshType, PropsMaskModel} from "@/context/ApplicationContext";
import {useLoader} from "@react-three/fiber";
// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader";

export const QuidditchBallFromHarryPotterMask = forwardRef((props: PropsMaskModel, ref: Ref<MeshType>) => {
    const texture = useLoader(TextureLoader, "/quidditch-harry-potter-image.png");

    useEffect(() => {
        props.setPosition("HEAD");
    }, [ref]);

    return (
        <mesh ref={ref}>
            <planeGeometry args={[3, 2.5]} />
            <meshPhysicalMaterial map={texture} transparent />
        </mesh>
    );
});
