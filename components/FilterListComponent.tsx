import React from "react";
import Avatar from "@mui/joy/Avatar";
import { Box, Typography } from "@mui/joy";
import { FilterItem } from "@/context/ApplicationContext";
import styled from "styled-components";
import { v4 as uuid } from "uuid";

type PropsFilterList = {
    filterItems: FilterItem<string>[];
    selectedFilterItem: FilterItem<string> | undefined;
};
export const FilterListComponent: React.FC<PropsFilterList> = (
    props: PropsFilterList,
) => {
    const { filterItems, selectedFilterItem } = props;

    return (
        <FilterListContainer>
            {filterItems.map((f) => (
                <div
                    key={uuid()}
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
                                    ? "2px solid var(--color-primary)"
                                    : "2px solid var(--color-white)",
                            borderRadius: "30%",
                            boxShadow: "0 0 4px var(--color-white)",
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
    gap: var(--space-9);
    //flex-wrap: wrap;
    //justify-content: center;
    justify-items: center;
    position: absolute;
    top: 70%;
    left: 50%;
    transform: translateY(-30%) translateX(-50%);
    //right: 15%;
    //transform: translateX(95%);
    //width: 85%;
    max-width: 98%;
    //max-height: 90%;
    padding: var(--space-2) var(--space-8);
    overflow-x: auto;
    overflow-y: hidden;
    z-index: 5;

    /* Scroll bar styles */

    &::-webkit-scrollbar {
        width: 10px; /* Adjust width as needed */
        height: 10px; /* Adjust height as needed */
    }

    &::-webkit-scrollbar-track {
        background: var(--color-white);
        //background-color: #e0e0e0; /* Light gray background */
        border-radius: 5px; /* Rounded corners */
    }

    &::-webkit-scrollbar-thumb {
        background: var(--color-primary);
        border-radius: 5px; /* Rounded corners */
    }
`;
