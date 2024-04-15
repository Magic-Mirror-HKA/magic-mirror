import React, {forwardRef, Ref, useEffect} from "react";
import {useLoader} from "@react-three/fiber";
// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader";
import {Mesh} from "three";
import {PropsMaskModel} from "@/context/ApplicationContext";

const TigerMask = forwardRef((props: PropsMaskModel, ref: Ref<Mesh>) => {
    const texture = useLoader(TextureLoader, "/tiger-image.png");

    useEffect(() => {
        props.setPosition("WHOLE-FACE");
    }, [ref]);

    return (
        <mesh ref={ref}>
            <planeGeometry args={[5.5, 4]} />
            <meshBasicMaterial
                map={texture}
                transparent
            />
        </mesh>
    );
});

export default TigerMask;