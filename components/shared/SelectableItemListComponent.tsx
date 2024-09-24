import React from "react";
import { SelectablePageItem } from "@/context/ApplicationContext";
import { Box, styled } from "@mui/joy";
import SelectableItemComponent from "@/components/shared/SelectableItemComponent";

type Props = {
    items: SelectablePageItem[];
};

const SelectableItemListComponent: React.FC<Props> = (props: Props) => {
    const { items } = props;
    return (
        <SelectablePageItemListContainer>
            {items.map((item) => (
                <SelectableItemComponent
                    key={item.label?.toString()}
                    item={item}
                />
            ))}
        </SelectablePageItemListContainer>
    );
};

const SelectablePageItemListContainer = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "var(--space-20)",
    alignItems: "start",
    "@media screen and (max-width: 1250px)": {
        gap: "var(--space-10)",
        gridTemplateColumns: "repeat(3, 1fr)",
    },
    "@media screen and (max-width: 900px)": {
        gap: "var(--space-10)",
        gridTemplateColumns: "repeat(2, 1fr)",
    },
}));

export default SelectableItemListComponent;
