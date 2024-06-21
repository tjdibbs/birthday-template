import { Icon } from "@iconify/react";
import { Dropdown, Button } from "antd";
import { ItemType } from "antd/es/menu/hooks/useItems";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

type Mode = "dark" | "light";

function ThemeController() {
  const [open, setOpen] = React.useState(false);
  const [mode, setMode] = React.useState<Mode>();

  React.useLayoutEffect(() => {
    // On page load or when changing themes, best to add inline in `head` to avoid FOUC
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setMode("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  function handleTheme(this: Mode | undefined) {
    setOpen(false);

    document.documentElement.classList.replace(
      this == "light" ? "dark" : "light",
      this ?? ""
    );

    setTimeout(() => {
      setMode(this);
    }, 300);
  }

  return (
    <div className="theme-controller absolute top-5 right-5">
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ scale: 0 }}
          exit={{ scale: 0 }}
          animate={{ scale: 1 }}
        >
          <Dropdown
            open={open}
            onOpenChange={() => setOpen(!open)}
            placement="topRight"
            overlayClassName="z-[9999]"
            className="z-[99999]"
            menu={{
              items: Items(handleTheme, mode),
            }}
          >
            <Button
              icon={
                <Icon
                  icon={Icons[mode as Mode]}
                  className="text-white"
                  height={24}
                />
              }
              size="large"
              onClick={() => setOpen(true)}
              className="!bg-primary/10 shadow-xl grid place-items-center h-auto shadow-secondary/30 bg-white/20"
            />
          </Dropdown>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

const Items: (
  handleTheme: (item: ItemType) => void,
  mode: Mode | undefined
) => ItemType[] = (handleTheme, mode) => [
  // {
  //   label: "System Default",
  //   key: nanoid(),
  //   onClick: handleTheme.bind("default"),
  //   icon: <Icon icon="mdi:theme-light-dark" height={24} />,
  //   className: mode === "default" ? "bg-secondary/30" : "",
  // },
  {
    label: "Light Mode",
    key: 1,
    onClick: handleTheme.bind("light"),
    className: mode === "light" ? "bg-secondary/30" : "",
    icon: <Icon icon="material-symbols:light-mode" height={24} />,
  },
  {
    label: "Dark Mode",
    key: 2,
    onClick: handleTheme.bind("dark"),
    className: mode === "dark" ? "bg-secondary/30" : "",
    icon: <Icon icon="ic:baseline-dark-mode" height={24} />,
  },
];

const Icons = {
  // default: "mdi:theme-light-dark",
  dark: "ic:baseline-dark-mode",
  light: "material-symbols:light-mode",
};

export default ThemeController;
