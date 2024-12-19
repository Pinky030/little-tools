import { Box, Button, NavLink } from "@mantine/core";
import { GiCutDiamond } from "react-icons/gi";
import { SiCrystal } from "react-icons/si";
import { toolComponents, useToolstargetStore } from "~/store/toolsTarget";

export default function NavBar() {
  const { updateComponent } = useToolstargetStore((state) => state);

  const update = (target: toolComponents) => updateComponent(target);

  return (
    <Box p={"md"}>
      <Button
        onClick={() => update(toolComponents.nikki)}
        style={{ display: "inline-flex"}}
        size="md"
        leftSection={<GiCutDiamond size="1rem" />}
        fullWidth
        variant="light"
        color="pink"
      >
        暖暖
      </Button>
      <Button
      mt={"lg"}
        onClick={() => update(toolComponents.fgo)}
        style={{ display: "inline-flex" }}
        size="md"
        leftSection={<SiCrystal size="1rem" />}
        fullWidth
        variant="light"
      >
        Fgo
      </Button>
      {/* <NavLink
                mb={"md"}
                style={{ borderRadius: "0.25rem" }}
                p="md"
                href="/little-tools/nikki-calculator"
                active={true}
                label={"暖暖"}
                leftSection={<GiCutDiamond size="1rem" />}
                // onClick={() => setActive(index)}
                color="pink"
            /> */}
      {/* <NavLink
                style={{ borderRadius: "0.25rem" }}
                p="md"
                href="/little-tools/fgo-saint-quartz-calculator"
                active={true}
                label={"聖晶石"}
                leftSection={<SiCrystal size="1rem" />}
                // onClick={() => setActive(index)}
            /> */}
    </Box>
  );
}
