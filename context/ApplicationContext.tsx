// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-unused-vars, @typescript-eslint/ban-ts-comment */
"use client";
import React, {
    ComponentType,
    createContext,
    FC,
    PropsWithChildren,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";
import * as THREE from "three";

// @ts-expect-error
import { GLTF, GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { SvgIconOwnProps } from "@mui/material";
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
    | "Totenkopf"
    | "Tiger"
    | "Wolke";

export type BackgroundFilterName =
    | "Eingang"
    | "HKA BIB"
    | "Gebaeude B"
    | "HKA R Gebaeude";

type BaseAttributeFilterItem = {
    id: string;
    src: string;
    isActive: boolean;
    threeDModel?:
        | ComponentType<{ webcamInstance?: HTMLVideoElement | undefined }>
        | undefined;
    onClick?: () => void;
};

export type FilterItem =
    | (BaseAttributeFilterItem & {
          name: AnimationFilterName;
      })
    | (BaseAttributeFilterItem & {
          name: BackgroundFilterName;
      });

export type CameraToolbarButton = {
    icon: ComponentType<SvgIconOwnProps>;
    isLarge?: boolean;
    disabled?: boolean;
    onClick: () => void;
};

export const CAMERA_FRAME_MAX_WIDTH = 700;
export const CAMERA_FRAME_MAX_HEIGHT = 400;

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
    filterItems: FilterItem[];
    selectedFilterItem: FilterItem;
    setFilterItems: (items: FilterItem[]) => void;
    setSelectedFilterItem: (item?: FilterItem | undefined) => void;
    clearFilterItems: () => void;

    // Images captured from Camera component
    images: string[];
    addImage: (image: string) => void;
    removeImage: (image: string) => void;
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
    const [filterItems, setFilterItems] = useState<FilterItem[]>([]);
    const [selectedFilterItem, setSelectedFilterItem] = useState<
        FilterItem | undefined
    >(undefined);
    const [webcamInstance, setWebcamInstance] = useState<Webcam | undefined>(
        undefined,
    );

    // Images captured from Camera component
    const [images, setImages] = useState<string[]>([]);

    const clearFilterItems = () => {
        setFilterItems([]);
    };

    const addImage = (image: string) => {
        setImages((prevState) => [...prevState, image]);
    };

    const removeImage = (image: string) => {
        setImages((prevState) => prevState.filter((i) => i !== image));
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
                selectedFilterItem: selectedFilterItem!,
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
