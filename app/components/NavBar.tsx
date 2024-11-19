import { Box, NavLink } from "@mantine/core";
import { GiCutDiamond } from "react-icons/gi";


export default function NavBar() {
    return (
        <Box
            p={"md"}
        >
            <NavLink
                style={{borderRadius:"0.25rem"}}
                p="md"
                href="/nikki-calculator"
                active={true}
                label={"暖暖"}
                leftSection={<GiCutDiamond size="1rem"  />}
                // onClick={() => setActive(index)}
                color="pink"
            />
        </Box>
    );
}
