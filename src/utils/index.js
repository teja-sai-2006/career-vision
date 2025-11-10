const PAGE_ROUTES = {
  Dashboard: "/",
};

export function createPageUrl(pageName) {
  if (PAGE_ROUTES[pageName]) {
    return PAGE_ROUTES[pageName];
  }

  const kebab = pageName
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/\s+/g, "-")
    .toLowerCase();

  return `/${kebab}`;
}
