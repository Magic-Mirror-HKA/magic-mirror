import React from "react";
import PageContentWrapperComponent from "@/components/shared/PageContentWrapperComponent";
import { ImageListComponent } from "@/components/ImageListComponent";

const ImageListPage: React.FC = () => {
    return (
        <PageContentWrapperComponent title={"Fotos"} showBackButton>
            <ImageListComponent />
        </PageContentWrapperComponent>
    );
};

export default ImageListPage;
