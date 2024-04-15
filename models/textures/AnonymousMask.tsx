import React, {forwardRef, Ref, useEffect} from "react";
import {useLoader} from "@react-three/fiber";
// @ts-ignore
import {TextureLoader} from "three/src/loaders/TextureLoader";
import {MeshType, PropsMaskModel} from "@/context/ApplicationContext";

const AnonymousMask = forwardRef((props: PropsMaskModel, ref: Ref<MeshType>) => {
    const texture = useLoader(TextureLoader, "/mask-image.png");

    useEffect(() => {
        props.setPosition("WHOLE-FACE");
    }, [ref]);

    return (
        <mesh ref={ref}>
            <planeGeometry args={[5.5, 4.5]} />
            <meshBasicMaterial map={texture} transparent />
        </mesh>
    );
});

export default AnonymousMask;