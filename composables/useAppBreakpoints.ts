import { breakpointsTailwind } from "@vueuse/core";

const tablet = "sm";
const desktop = "lg";

export const useAppBreakpoints = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind);

  return {
    tabletWidth: breakpointsTailwind[tablet],
    desktopWidth: breakpointsTailwind[desktop],
    isMaxSmartphone: breakpoints.isSmaller(tablet),
    isMinTablet: breakpoints.greater(tablet),
    isMinDesktop: breakpoints.greater(desktop),
  };
};
