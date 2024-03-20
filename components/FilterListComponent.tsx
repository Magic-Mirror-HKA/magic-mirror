import React from "react";
import Avatar from "@mui/joy/Avatar";
import { Box, Typography } from "@mui/joy";
import { FilterItem } from "@/context/ApplicationContext";
import styled from "styled-components";

type PropsFilterList = {
    filterItems: FilterItem[];
    selectedFilterItem: FilterItem | undefined;
};
export const FilterListComponent: React.FC<PropsFilterList> = (
    props: PropsFilterList,
) => {
    const { filterItems, selectedFilterItem } = props;

    return (
        <FilterListContainer>
            {filterItems.map((f, index) => (
                <div
                    key={index}
                    style={{
                        display: "grid",
                        gap: 0.25,
                        justifyContent: "center",
                        justifyItems: "center",
                        width: "100px",
                        // "&:hover": {
                        //     cursor: "pointer",
                        // },
                    }}
                    onClick={f.onClick}
                >
                    <Avatar
                        src={f.src}
                        size="lg"
                        sx={{
                            border:
                                f.name === selectedFilterItem?.name
                                    ? "1px solid var(--color-primary)"
                                    : "1px solid var(--color-white)",
                            borderRadius: "30%",
                            boxShadow: "0 0 6px var(--color-white)",
                            mt: 0.2,
                            mb: 0.2,
                        }}
                    />
                    <Typography
                        sx={{
                            color: "var(--color-white)",
                            backgroundColor:
                                f.name === selectedFilterItem?.name
                                    ? "var(--color-primary)"
                                    : "unset",
                            p: "var(--space-1)",
                            borderRadius: "var(--space-1)",
                        }}
                        textAlign="center"
                        noWrap
                    >
                        {f.name}
                    </Typography>
                </div>
            ))}
        </FilterListContainer>
    );
};

const FilterListContainer = styled(Box)`
    display: flex;
    gap: var(--space-5);
    //flex-wrap: wrap;
    justify-content: center;
    justify-items: center;
    position: absolute;
    top: 70%;
    transform: translateY(-30%);
    //right: 15%;
    //transform: translateX(95%);
    max-width: 85%;
    //max-height: 90%;
    overflow-x: auto;
    overflow-y: hidden;
    z-index: 5;
`;
