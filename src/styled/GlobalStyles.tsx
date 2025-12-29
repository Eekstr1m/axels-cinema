import GlobalStyles from "@mui/material/GlobalStyles";

export const IndexGlobalStyles = () => (
  <GlobalStyles
    styles={{
      ":root": {
        fontFamily: "system-ui, Avenir, Helvetica, Arial, sans-serif",
      },
      "*": {
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      },
      body: {
        margin: 0,
        backgroundColor: "#f5f5f5",
      },
    }}
  />
);
