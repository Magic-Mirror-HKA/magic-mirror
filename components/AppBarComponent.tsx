import React from "react";
import { Box, styled, Typography } from "@mui/joy";
//import Avatar from "@mui/joy/Avatar";

const AppBarComponent: React.FC = () => {
    return (
        <AppBarContainer>
            <AppName>Magic Mirror</AppName>
            <AvatarContainer>
                {/*<UserName>Admin</UserName>*/}
                {/*<AvatarComponent variant="solid" size="md" />*/}
            </AvatarContainer>
        </AppBarContainer>
    );
};

const AppBarContainer = styled(Box)(() => ({
    display: "grid",
    gridTemplateColumns: "1fr max-content",
    alignItems: "center",
    width: "100%",
    borderRadius: "10px",
    //padding: "0 var(--space-1)",
    "@media screen and (max-width: 900px)": {
        padding: "0 var(--space-1)",
    },
    marginTop: -20,
}));

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const AppName = styled(Typography)(({ theme }) => ({
    fontSize: "var(--font-2xLarge)",
    fontWeight: "600",
    color: theme.vars.palette.primary["500"],
    textAlign: {
        sm: "left",
        md: "center",
        lg: "center",
    },
}));

const AvatarContainer = styled(Box)(() => ({
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    // backgroundColor: "rgba(0,0,0, 10%)",
    // borderRadius: "10px",
    // padding: "var(--space-1) var(--space-3)",
    // boxShadow: "0 0 4px grey",
}));

// const UserName = styled(Box)(({ theme }) => ({
//     fontWeight: "600",
//     //fontSize: "var(--font-small)",
//     color: theme.vars.palette.primary["500"],
// }));
//
// const AvatarComponent = styled(Avatar)(({ theme }) => ({
//     color: theme.vars.palette.primary["500"],
//     backgroundColor: "var(--color-white)",
//     border: `2px solid ${theme.vars.palette.primary["500"]}`,
// }));

export default AppBarComponent;
