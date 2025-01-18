export type Label = "Home" | "To-Do" | "Weather" | "Profile";

export type Path = "/" | "/to-do" | "/weather" | "/profile";

export type Item = {
  label: Label;
  icon: JSX.Element;
  path: Path;
};
