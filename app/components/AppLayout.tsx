import { AppShell } from "@mantine/core";
import NavBar from "./NavBar";
import { useDisclosure } from "@mantine/hooks";
import styles from "../style/Background.module.css";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

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
          "--dot-color": "#fcedf2e6",
        }}
        className={styles.background}
      >
        {children}
      </AppShell.Main>
    </AppShell>
  );
}
