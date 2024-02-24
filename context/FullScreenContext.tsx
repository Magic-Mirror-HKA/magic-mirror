"use client";
// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, {
    createContext,
    PropsWithChildren,
    useContext,
    useEffect,
    useState,
} from "react";

type ContextOutput = {
    isFullScreen: boolean;
    goFullScreen: () => void;
    exitFullScreen: () => void;
};

// @ts-expect-error
const FullScreenContext = createContext<ContextOutput>({});

export const useFullScreenContext = () => {
    const context = useContext<ContextOutput>(FullScreenContext);

    useEffect(() => {
        return () => context.exitFullScreen();
    }, []);

    return context;
};

type Props = PropsWithChildren;

export const FullScreenContextProvider: React.FC<Props> = (props: Props) => {
    const { children } = props;
    const [isFullScreen, setIsFullScreen] = useState<boolean>(false);

    const goFullScreen = () => {
        setIsFullScreen(true);
    };

    const exitFullScreen = () => {
        setIsFullScreen(false);
    };

    return (
        <FullScreenContext.Provider
            value={{
                isFullScreen,
                goFullScreen,
                exitFullScreen,
            }}
        >
            {children}
        </FullScreenContext.Provider>
    );
};
