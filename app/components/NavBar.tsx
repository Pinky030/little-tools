import { Box, NavLink } from "@mantine/core";
import { GiCutDiamond } from "react-icons/gi";
import { SiCrystal } from "react-icons/si";


export default function NavBar() {
    return (
        <Box
            p={"md"}
        >
            <NavLink
                mb={"md"}
                style={{ borderRadius: "0.25rem" }}
                p="md"
                href="/nikki-calculator"
                active={true}
                label={"暖暖"}
                leftSection={<GiCutDiamond size="1rem" />}
                // onClick={() => setActive(index)}
                color="pink"
            />
            <NavLink
                style={{ borderRadius: "0.25rem" }}
                p="md"
                href="/fgo-saint-quartz-calculator"
                active={true}
                label={"聖晶石"}
                leftSection={<SiCrystal size="1rem" />}
                // onClick={() => setActive(index)}
            />
        </Box>
    );
}
