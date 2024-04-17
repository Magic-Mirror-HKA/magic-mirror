// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars, @typescript-eslint/ban-ts-comment */
"use client";
import React, {
    ComponentType,
    createContext,
    FC,
    ForwardRefExoticComponent,
    PropsWithChildren,
    ReactNode,
    RefAttributes,
    useContext,
    useEffect,
    useState,
} from "react";
import * as THREE from "three";
import {BufferGeometry, Mesh, NormalBufferAttributes} from "three";

// @ts-expect-error
import {GLTF, GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {SvgIconOwnProps} from "@mui/material";
import Webcam from "react-webcam";

export type SelectablePageItem = {
    label: ReactNode;
    icon: any;
    onClick: () => void;
};

export type ContainerSize = {
    width: number;
    height: number;
};

export type AnimationFilterName =
    | "Matrix"
    | "Engel & Teufel"
    | "Anonym"
    | "Tiger"
    | "Wolke"
    | "Brille"
    | "Hut";

export type BackgroundFilterName =
    | "Strand"
    | "Formeln"
    | "Schloss 1"
    | "Schloss 2"
    | "Schloss 3"
    | "Schloss 4"
    | "Schloss 5"
    | "Schloss 6"
    | "Schloss 7"
    | "Schloss 8";

export type ThreeModelType =
    | ComponentType<{ webcamInstance?: HTMLVideoElement | undefined }>
    | ForwardRefExoticComponent<PropsMaskModel & RefAttributes<MeshType>>
    ;

export type FilterItem<T extends string> = {
    id: string;
    src: string;
    name: T;
    isActive: boolean;
    threeModel?: ThreeModelType | undefined;
    onClick?: () => void;
};

export type CameraToolbarButton = {
    icon: ComponentType<SvgIconOwnProps>;
    isLarge?: boolean;
    disabled?: boolean;
    onClick: () => void;
};

export type ImageTyp = {
    id: string;
    source: string;
};

export const CAMERA_FRAME_MAX_WIDTH = 700;
export const CAMERA_FRAME_MAX_HEIGHT = 400;

export type MeshType = Mesh<BufferGeometry<NormalBufferAttributes>>;

export type MaskPosition = "HEAD" | "BOTH-EYES" | "NOSE" | "MOUTH" | "CHIN" | "WHOLE-FACE";

export type PropsMaskModel = {
    setPosition: (position: MaskPosition) => void;
}

export const decomposeMatrix = (
    matrix1d: number[],
): {
    translation: THREE.Vector3;
    rotation: THREE.Quaternion;
    scale: THREE.Vector3;
} => {
    const matrix4x4 = new THREE.Matrix4().fromArray(matrix1d);

    const translation = new THREE.Vector3();
    const rotation = new THREE.Quaternion();
    const scale = new THREE.Vector3();

    matrix4x4.decompose(translation, rotation, scale);

    return {
        translation: translation,
        rotation: rotation,
        scale: scale,
    };
};

export const loadGltf = async (url: string): Promise<GLTF> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    const loader = new GLTFLoader();
    return await new Promise((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-call
        loader.load(
            url,
            (gltf: GLTF) => resolve(gltf),
            () => {},
            (error: unknown) => reject(error),
        );
    });
};

type Output = {
    // Camera
    webcamInstance: Webcam | undefined;
    setWebcamInstance: (webcamInstance: Webcam) => void;

    // Filter
    filterItems: FilterItem<string>[];
    selectedFilterItem: FilterItem<string> | undefined;
    setFilterItems: (items: FilterItem<string>[]) => void;
    setSelectedFilterItem: (item?: FilterItem<string> | undefined) => void;
    clearFilterItems: () => void;

    // Images captured from Camera component
    images: ImageTyp[];
    addImage: (image: ImageTyp) => void;
    removeImage: (id: string) => void;
    clearImages: () => void;
};

// @ts-ignore
const AppContext = createContext<Output>({});

// TODO. Clear the filter items inside this hook.
export const useAppContext = () => {
    const context = useContext<Output>(AppContext);

    useEffect(() => {
        return () => {
            // Clear Filter list on unmount
            context.clearFilterItems();

            // Clear image list on unmount
            // context.clearImages();
        };
    }, []);

    return context;
};

type PropsAppContextProvider = PropsWithChildren;
export const ApplicationContextProvider: FC<PropsAppContextProvider> = (
    props: PropsAppContextProvider,
) => {
    const { children } = props;

    // Filter
    const [filterItems, setFilterItems] = useState<FilterItem<string>[]>([]);
    const [selectedFilterItem, setSelectedFilterItem] = useState<
        FilterItem<string> | undefined
    >(undefined);
    const [webcamInstance, setWebcamInstance] = useState<Webcam | undefined>(
        undefined,
    );

    // Images captured from Camera component
    const [images, setImages] = useState<ImageTyp[]>([]);

    const clearFilterItems = () => {
        setFilterItems([]);
    };

    const addImage = (image: ImageTyp) => {
        setImages((prevState) => [...prevState, image]);
    };

    const removeImage = (id: string) => {
        setImages((prevState) => prevState.filter((i) => i.id !== id));
    };

    const clearImages = () => {
        setImages([]);
    };

    return (
        <AppContext.Provider
            value={{
                webcamInstance: webcamInstance,
                setWebcamInstance,
                filterItems,
                selectedFilterItem: selectedFilterItem,
                setFilterItems,
                setSelectedFilterItem: setSelectedFilterItem,
                clearFilterItems,
                images,
                addImage,
                removeImage,
                clearImages,
            }}
        >
            {children}
        </AppContext.Provider>
    );
};
