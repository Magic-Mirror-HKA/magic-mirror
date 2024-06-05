/*
 * Mortarboard Graduation Hat
 * (https://skfb.ly/6UyK6) by dupremium3d is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
 */
import React, { forwardRef, Ref, useEffect } from "react";
import { useLoader } from "@react-three/fiber";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { MeshType, PropsMaskModel } from "@/context/ApplicationContext";

export const GraduationHatMask = forwardRef(function GraduationHatMask(
    props: PropsMaskModel,
    ref: Ref<MeshType>,
) {
    const texture = useLoader(TextureLoader, "/graduation-hat3.png");

    useEffect(() => {
        props.setPosition("HEAD");
    }, [props, ref]);

    return (
        <mesh ref={ref}>
            <planeGeometry args={[6, 3]} />
            <meshPhysicalMaterial map={texture} transparent />
        </mesh>
    );
});
