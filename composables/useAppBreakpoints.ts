import { breakpointsTailwind } from "@vueuse/core";

const tablet = "md";
const desktop = "lg";

export const useAppBreakpoints = () => {
  const breakpoints = useBreakpoints(breakpointsTailwind);

  return {
    tabletWidth: breakpointsTailwind[tablet],
    desktopWidth: breakpointsTailwind[desktop],
    isMaxSmartphone: breakpoints.smaller(tablet),
    isMinTablet: breakpoints.greaterOrEqual(tablet),
    isMinDesktop: breakpoints.greater(desktop),
  };
};
