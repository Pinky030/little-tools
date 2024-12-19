import { AppShell } from "@mantine/core";
import NavBar from "./NavBar";
import styles from "../style/Background.module.css";
import { toolComponents, useToolstargetStore } from "~/store/toolsTarget";

// const getColor = (pathname: string) => {
//   if (pathname === "/") return "#fadfa18a";
//   if (pathname.includes("nikki")) return "#fcedf2e6";
//   if (pathname.includes("fgo")) return "#d3f3ff";
// };

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const { currentComponent } = useToolstargetStore((state) => state);

  const getColor = (current: toolComponents) => {
    if (current === toolComponents.home) return "#fadfa18a";
    if (current === toolComponents.nikki) return "#fcedf2e6";
    if (current === toolComponents.fgo) return "#d3f3ff";
  };

  return (
    <AppShell
      navbar={{
        width: 300,
        breakpoint: "sm",
        // collapsed: { mobile: !opened },
      }}
      padding="lg"
    >
      <AppShell.Navbar>
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main
        style={{
          "--dot-color": getColor(currentComponent),
        }}
        className={styles.background}
      >
        {children}
        {/* {pathname.includes("nikki") && <NikkiCalculator />} */}
      </AppShell.Main>
    </AppShell>
  );
}
