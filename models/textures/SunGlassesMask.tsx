/*
* "Sunglass" (https://skfb.ly/opJNo) by Athos Simões is licensed under Creative Commons Attribution-NonCommercial
* (http://creativecommons.org/licenses/by-nc/4.0/).
* */
import React, {forwardRef, Ref, useEffect} from "react";
import {useLoader} from "@react-three/fiber";
// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader";
import {MeshType, PropsMaskModel} from "@/context/ApplicationContext";

const GlassesMesh = forwardRef((props: PropsMaskModel, ref: Ref<MeshType>) => {
    const texture = useLoader(TextureLoader, "/sunglasses-black-image-4.png");

    useEffect(() => {
        props.setPosition("BOTH-EYES");
    }, [ref]);

    return (
        <mesh ref={ref}>
            <planeGeometry args={[2.8, 1.8]} />
            <meshPhysicalMaterial map={texture} transparent />
        </mesh>
    );
});

export default GlassesMesh;