import { BackgroundFilterName, FilterItem, useAppContext } from "@/context/ApplicationContext";
import { v4 as uuid } from "uuid";

type Input = {
    setImage: (image: HTMLImageElement | undefined) => void;
}
export const useCustomBackground = (props: Input): FilterItem<string>[] => {

    const { setImage } = props;
    const appContext = useAppContext();

    const handleClickFilterItem = (
      itemName: BackgroundFilterName,
      imgSrc: string,
    ) => {
        // TODO: CHANGE BACKGROUND IMAGE HIER
        const newImg = new Image();
        newImg.src = imgSrc;
        setImage(newImg);
        appContext.setSelectedFilterItem(
          filterItems.find((f) => f.name === itemName),
        );
    };

    const filterItems: FilterItem<BackgroundFilterName>[] = [
        {
            id: uuid(),
            name: "Schloss 1",
            src: "/backgrounds/castels/castel_1.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 1",
            onClick: () =>
              handleClickFilterItem("Schloss 1", "/backgrounds/castels/castel_1.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 2",
            src: "/backgrounds/castels/castel_2.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 2",
            onClick: () =>
              handleClickFilterItem("Schloss 2", "/backgrounds/castels/castel_2.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 3",
            src: "/backgrounds/castels/castel_3.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 3",
            onClick: () =>
              handleClickFilterItem("Schloss 3", "/backgrounds/castels/castel_3.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 4",
            src: "/backgrounds/castels/castel_4.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 4",
            onClick: () =>
              handleClickFilterItem("Schloss 4", "/backgrounds/castels/castel_4.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 5",
            src: "/backgrounds/castels/castel_5.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 5",
            onClick: () =>
              handleClickFilterItem("Schloss 5", "/backgrounds/castels/castel_5.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 6",
            src: "/backgrounds/castels/castel_6.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 6",
            onClick: () =>
              handleClickFilterItem("Schloss 6", "/backgrounds/castels/castel_6.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 7",
            src: "/backgrounds/castels/castel_7.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 7",
            onClick: () =>
              handleClickFilterItem("Schloss 7", "/backgrounds/castels/castel_7.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 8",
            src: "/backgrounds/castels/castel_8.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 8",
            onClick: () =>
              handleClickFilterItem("Schloss 8", "/backgrounds/castels/castel_8.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 9",
            src: "/backgrounds/castels/castel_9.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 9",
            onClick: () =>
              handleClickFilterItem("Schloss 9", "/backgrounds/castels/castel_9.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 10",
            src: "/backgrounds/castels/castel_10.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 10",
            onClick: () =>
              handleClickFilterItem("Schloss 10", "/backgrounds/castels/castel_10.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 11",
            src: "/backgrounds/castels/castel_11.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 11",
            onClick: () =>
              handleClickFilterItem("Schloss 11", "/backgrounds/castels/castel_11.jpg"),
        },
        {
            id: uuid(),
            name: "Schloss 12",
            src: "/backgrounds/castels/castel_12.jpg",
            isActive: appContext.selectedFilterItem?.name === "Schloss 12",
            onClick: () =>
              handleClickFilterItem("Schloss 12", "/backgrounds/castels/castel_12.jpg"),
        },
    ];

    return filterItems;
}